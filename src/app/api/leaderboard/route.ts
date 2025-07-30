import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    console.log('GET /api/leaderboard - Starting request')
    
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set')
      return NextResponse.json({ error: 'Database URL not configured' }, { status: 500 })
    }
    
    const sql = neon(process.env.DATABASE_URL)
    console.log('Database connection established')
    
    const entries = await sql`
      SELECT id, "playerName", score, timestamp, "createdAt", "updatedAt"
      FROM leaderboard_entries 
      ORDER BY score DESC 
      LIMIT 10
    `
    
    console.log('Fetched entries:', entries.length)
    return NextResponse.json(entries)
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error)
    return NextResponse.json({ 
      error: 'Failed to fetch leaderboard',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    console.log('POST /api/leaderboard - Starting request')
    
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not set')
      return NextResponse.json({ error: 'Database URL not configured' }, { status: 500 })
    }
    
    const { playerName, score } = await request.json()
    console.log('Received data:', { playerName, score })
    
    if (!playerName || typeof score !== 'number') {
      console.error('Invalid data received:', { playerName, score })
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
    }
    
    const sql = neon(process.env.DATABASE_URL)
    console.log('Database connection established')
    
    const [entry] = await sql`
      INSERT INTO leaderboard_entries (id, "playerName", score, timestamp, "createdAt", "updatedAt")
      VALUES (gen_random_uuid(), ${playerName}, ${score}, NOW(), NOW(), NOW())
      RETURNING id, "playerName", score, timestamp, "createdAt", "updatedAt"
    `
    
    console.log('Entry created successfully:', entry)
    return NextResponse.json(entry)
  } catch (error) {
    console.error('Failed to create leaderboard entry:', error)
    return NextResponse.json({ 
      error: 'Failed to create entry',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}