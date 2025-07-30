import { NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

export async function GET() {
  try {
    console.log('Testing database connection...')
    
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ 
        error: 'DATABASE_URL not configured',
        status: 'failed'
      })
    }
    
    const sql = neon(process.env.DATABASE_URL)
    
    // Test if the table exists
    const result = await sql`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_name = 'leaderboard_entries'
      )
    `
    
    const tableExists = result[0]?.exists
    
    return NextResponse.json({
      status: 'success',
      databaseUrl: process.env.DATABASE_URL ? 'configured' : 'missing',
      tableExists: tableExists,
      message: tableExists ? 'Database and table are ready' : 'Table does not exist'
    })
  } catch (error) {
    console.error('Database test failed:', error)
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      databaseUrl: process.env.DATABASE_URL ? 'configured' : 'missing'
    })
  }
} 