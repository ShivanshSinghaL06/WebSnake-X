import { Card, CardContent } from '@/components/ui/card'
import { Trophy, Star } from 'lucide-react'

interface ScoreDisplayProps {
  currentScore: number
  highScore: number
}

export default function ScoreDisplay({ currentScore, highScore }: ScoreDisplayProps) {
  return (
    <div className="flex gap-4">
      <Card>
        <CardContent className="flex items-center gap-2 p-3">
          <Star className="h-5 w-5 text-yellow-500" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Score</p>
            <p className="text-xl font-bold">{currentScore}</p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="flex items-center gap-2 p-3">
          <Trophy className="h-5 w-5 text-amber-500" />
          <div>
            <p className="text-sm font-medium text-muted-foreground">Best</p>
            <p className="text-xl font-bold">{highScore}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}