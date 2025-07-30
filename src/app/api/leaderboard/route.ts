import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    const sql = neon(process.env.DATABASE_URL!)
    
    const entries = await sql`
      SELECT id, "playerName", score, timestamp, "createdAt", "updatedAt"
      FROM leaderboard_entries 
      ORDER BY score DESC 
      LIMIT 10
    `
    
    return NextResponse.json(entries)
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error)
    return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { playerName, score } = await request.json()
    
    if (!playerName || typeof score !== 'number') {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }
    
    const sql = neon(process.env.DATABASE_URL!)
    
    const [entry] = await sql`
      INSERT INTO leaderboard_entries (id, "playerName", score, timestamp, "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${playerName}, ${score}, NOW(), NOW(), NOW())
      RETURNING id, "playerName", score, timestamp, "createdAt", "updatedAt"
    `
    
    return NextResponse.json(entry)
  } catch (error) {
    console.error('Failed to create leaderboard entry:', error)
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 })
  }
}