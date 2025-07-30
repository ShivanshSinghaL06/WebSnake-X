import { Button } from '@/components/ui/button'
import { Play, Pause, RotateCcw } from 'lucide-react'

interface ControlButtonsProps {
  gameState: 'idle' | 'playing' | 'paused' | 'gameOver'
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onRestart: () => void
}

export default function ControlButtons({
  gameState,
  onStart,
  onPause,
  onResume,
  onRestart
}: ControlButtonsProps) {
  return (
    <div className="flex gap-2">
      {gameState === 'idle' || gameState === 'gameOver' ? (
        <Button onClick={onStart} size="icon">
          <Play className="h-4 w-4" />
        </Button>
      ) : gameState === 'playing' ? (
        <Button onClick={onPause} size="icon">
          <Pause className="h-4 w-4" />
        </Button>
      ) : (
        <Button onClick={onResume} size="icon">
          <Play className="h-4 w-4" />
        </Button>
      )}
      
      <Button onClick={onRestart} variant="outline" size="icon">
        <RotateCcw className="h-4 w-4" />
      </Button>
    </div>
  )
}