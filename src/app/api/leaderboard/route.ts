import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

// Create a new Prisma client instance for each request in production
const prisma = new PrismaClient()

export async function GET() {
  try {
    const entries = await prisma.leaderboardEntry.findMany({
      orderBy: {
        score: 'desc'
      },
      take: 10
    })
    
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
    
    const entry = await prisma.leaderboardEntry.create({
      data: {
        playerName,
        score
      }
    })
    
    return NextResponse.json(entry)
  } catch (error) {
    console.error('Failed to create leaderboard entry:', error)
    return NextResponse.json({ error: 'Failed to create entry' }, { status: 500 })
  }
}