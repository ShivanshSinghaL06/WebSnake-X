'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ArrowLeft, Trophy, Medal, Award } from 'lucide-react'
import LeaderboardTable from '@/components/LeaderboardTable'
import ScoreSubmitForm from '@/components/ScoreSubmitForm'
import { ThemeToggle } from '@/components/ThemeToggle'

interface LeaderboardEntry {
  id: string
  playerName: string
  score: number
  timestamp: string
}

export default function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [showSubmitForm, setShowSubmitForm] = useState(false)
  const [lastScore, setLastScore] = useState(0)

  useEffect(() => {
    // Get last score from localStorage
    const savedLastScore = localStorage.getItem('snakeLastScore')
    if (savedLastScore) {
      setLastScore(parseInt(savedLastScore, 10))
    }
    
    fetchLeaderboard()
  }, [])

  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('/api/leaderboard')
      if (response.ok) {
        const data = await response.json()
        setLeaderboard(data)
      }
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleScoreSubmit = async (playerName: string, score: number) => {
    try {
      console.log('Submitting score:', { playerName, score })
      
      const response = await fetch('/api/leaderboard', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ playerName, score }),
      })

      console.log('Response status:', response.status)

      if (response.ok) {
        const result = await response.json()
        console.log('Score submitted successfully:', result)
        setShowSubmitForm(false)
        setLastScore(0)
        localStorage.removeItem('snakeLastScore')
        await fetchLeaderboard()
        // Show success message
        alert('Score submitted successfully! 🎉')
      } else {
        const errorText = await response.text()
        console.error('Failed to submit score. Status:', response.status, 'Error:', errorText)
        alert('Failed to submit score. Please try again.')
      }
    } catch (error) {
      console.error('Failed to submit score:', error)
      alert('Failed to submit score. Please check your connection and try again.')
    }
  }

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
      case 2:
        return <Medal className="h-5 w-5 text-gray-400 dark:text-gray-300" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600 dark:text-amber-400" />
      default:
        return <span className="text-sm font-bold text-muted-foreground">#{rank}</span>
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 bg-background">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Game
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">🏆 Leaderboard</h1>
              <p className="text-muted-foreground">Top Snake Game Players</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            {lastScore > 0 && !showSubmitForm && (
              <Button onClick={() => setShowSubmitForm(true)}>
                Submit Score ({lastScore})
              </Button>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Score Submit Form */}
        {showSubmitForm && (
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Score</CardTitle>
            </CardHeader>
            <CardContent>
              <ScoreSubmitForm
                initialScore={lastScore}
                onSubmit={handleScoreSubmit}
                onCancel={() => setShowSubmitForm(false)}
              />
            </CardContent>
          </Card>
        )}

        {/* Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5" />
              High Scores
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No scores yet. Be the first to play!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {leaderboard.map((entry, index) => (
                  <div
                    key={entry.id}
                    className={`flex items-center justify-between p-4 rounded-lg border ${
                      index === 0 ? 'bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-800' :
                      index === 1 ? 'bg-gray-50 dark:bg-gray-950/20 border-gray-200 dark:border-gray-800' :
                      index === 2 ? 'bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800' :
                      'bg-background border-border'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-8 h-8">
                        {getRankIcon(index + 1)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{entry.playerName}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(entry.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant={index === 0 ? 'default' : 'secondary'}>
                      {entry.score}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}