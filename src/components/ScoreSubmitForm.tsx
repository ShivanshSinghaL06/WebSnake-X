'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface ScoreSubmitFormProps {
  initialScore: number
  onSubmit: (playerName: string, score: number) => void
  onCancel: () => void
}

export default function ScoreSubmitForm({ initialScore, onSubmit, onCancel }: ScoreSubmitFormProps) {
  const [playerName, setPlayerName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!playerName.trim()) return

    setIsSubmitting(true)
    try {
      await onSubmit(playerName.trim(), initialScore)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="playerName">Player Name</Label>
        <Input
          id="playerName"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Enter your name"
          maxLength={20}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Score</Label>
        <div className="text-2xl font-bold text-primary">{initialScore}</div>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={!playerName.trim() || isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Score'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}