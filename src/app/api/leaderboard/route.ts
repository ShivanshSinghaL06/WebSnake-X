import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  try {
    const leaderboard = await db.leaderboardEntry.findMany({
      orderBy: [
        { score: 'desc' },
        { timestamp: 'asc' }
      ],
      take: 10 // Get top 10 scores
    })

    return NextResponse.json(leaderboard)
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const { playerName, score } = await request.json()

    if (!playerName || typeof score !== 'number') {
      return NextResponse.json(
        { error: 'Invalid input' },
        { status: 400 }
      )
    }

    const newEntry = await db.leaderboardEntry.create({
      data: {
        playerName: playerName.trim(),
        score
      }
    })

    return NextResponse.json(newEntry, { status: 201 })
  } catch (error) {
    console.error('Error creating leaderboard entry:', error)
    return NextResponse.json(
      { error: 'Failed to create leaderboard entry' },
      { status: 500 }
    )
  }
}