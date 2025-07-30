'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Play, Pause, RotateCcw, Settings, Trophy, Code } from 'lucide-react'
import GameCanvas from '@/components/GameCanvas'
import ScoreDisplay from '@/components/ScoreDisplay'
import ControlButtons from '@/components/ControlButtons'
import SoundToggle from '@/components/SoundToggle'
import { ThemeToggle } from '@/components/ThemeToggle'
import MobileControls from '@/components/MobileControls'
import ClientOnly from '@/components/ClientOnly'

export default function Home() {
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'paused' | 'gameOver'>('idle')
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [gameSettings, setGameSettings] = useState({
    gameSpeed: 'medium' as 'easy' | 'medium' | 'hard',
    gridSize: 'normal' as 'small' | 'normal' | 'large'
  })

  // Load high score from localStorage on mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('snakeHighScore')
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10))
    }
    const savedSoundSetting = localStorage.getItem('snakeSoundEnabled')
    if (savedSoundSetting !== null) {
      setSoundEnabled(savedSoundSetting === 'true')
    }
    const savedGameSettings = localStorage.getItem('snakeGameSettings')
    if (savedGameSettings) {
      const parsed = JSON.parse(savedGameSettings)
      setGameSettings(parsed)
      setSoundEnabled(parsed.soundEnabled)
    }
  }, [])

  // Save high score to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('snakeHighScore', highScore.toString())
  }, [highScore])

  // Save sound setting to localStorage
  useEffect(() => {
    localStorage.setItem('snakeSoundEnabled', soundEnabled.toString())
  }, [soundEnabled])

  const handleGameStart = useCallback(() => {
    setGameState('playing')
  }, [])

  const handleGamePause = useCallback(() => {
    setGameState('paused')
  }, [])

  const handleGameResume = useCallback(() => {
    setGameState('playing')
  }, [])

  const handleGameOver = useCallback(() => {
    setGameState('gameOver')
    if (score > highScore) {
      setHighScore(score)
    }
  }, [score, highScore])

  const handleGameRestart = useCallback(() => {
    setScore(0)
    setGameState('playing')
  }, [])

  const handleScoreUpdate = useCallback((newScore: number) => {
    setScore(newScore)
  }, [])

  const handleSoundToggle = useCallback(() => {
    setSoundEnabled(prev => !prev)
  }, [])

  const handleMobileDirectionChange = useCallback((newDirection: 'up' | 'down' | 'left' | 'right') => {
    // This will be passed to the GameCanvas component
    // We'll need to lift this state up or use a ref
    const canvas = document.querySelector('canvas')
    if (canvas) {
      const event = new KeyboardEvent('keydown', {
        key: `Arrow${newDirection.charAt(0).toUpperCase() + newDirection.slice(1)}`
      })
      canvas.dispatchEvent(event)
    }
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 bg-background">
      <div className="w-full max-w-4xl space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl md:text-6xl font-bold text-primary">🐍 WebSnake X</h1>
          <p className="text-muted-foreground">A modern Snake Game built with Next.js</p>
        </div>

        {/* Game Stats */}
        <div className="flex justify-center items-center gap-4">
          <ScoreDisplay currentScore={score} highScore={highScore} />
          <Badge variant={gameState === 'playing' ? 'default' : 'secondary'}>
            {gameState === 'idle' && 'Ready to Play'}
            {gameState === 'playing' && 'Playing'}
            {gameState === 'paused' && 'Paused'}
            {gameState === 'gameOver' && 'Game Over'}
          </Badge>
        </div>

        {/* Game Canvas */}
        <Card className="w-full">
          <CardContent className="p-4">
            <GameCanvas
              gameState={gameState}
              onGameStart={handleGameStart}
              onGamePause={handleGamePause}
              onGameResume={handleGameResume}
              onGameOver={handleGameOver}
              onGameRestart={handleGameRestart}
              onScoreUpdate={handleScoreUpdate}
              soundEnabled={soundEnabled}
            />
          </CardContent>
        </Card>

        {/* Mobile Controls */}
        <ClientOnly>
          <div className="flex justify-center md:hidden">
            <MobileControls
              onDirectionChange={handleMobileDirectionChange}
              disabled={gameState !== 'playing'}
            />
          </div>
        </ClientOnly>

        {/* Control Buttons */}
        <ClientOnly>
          <div className="flex justify-center gap-4">
            <ControlButtons
              gameState={gameState}
              onStart={handleGameStart}
              onPause={handleGamePause}
              onResume={handleGameResume}
              onRestart={handleGameRestart}
            />
            <SoundToggle
              enabled={soundEnabled}
              onToggle={handleSoundToggle}
            />
            <ThemeToggle />
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.location.href = '/settings'}
            >
              <Settings className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.location.href = '/leaderboard'}
            >
              <Trophy className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => window.location.href = '/about'}
            >
              <Code className="h-4 w-4" />
            </Button>
          </div>
        </ClientOnly>

        {/* Game Instructions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">How to Play</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h3 className="font-semibold mb-2">Controls:</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Arrow Keys: Move snake</li>
                  <li>• Spacebar: Pause/Resume</li>
                  <li>• Click buttons: Control game</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Rules:</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>• Eat food to grow and score</li>
                  <li>• Avoid walls and yourself</li>
                  <li>• Try to beat your high score!</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Developer Info */}
        <ClientOnly>
          <Card className="border-dashed">
            <CardHeader>
              <CardTitle className="text-center text-lg">👨‍💻 Developer</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-4">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Shivansh Singhal</h3>
                  <p className="text-muted-foreground text-sm">Full Stack Developer & Game Enthusiast</p>
                </div>
                
                <div className="flex justify-center items-center gap-4 flex-wrap">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://github.com/ShivanshSinghaL06', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://www.linkedin.com/in/shivanshssinghal/', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                    LinkedIn
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('mailto:shivanshssinghal@gmail.com', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-.904.732-1.636 1.636-1.636h.682l10.682 8.045L23.318 3.82h.682c.904 0 1.636.732 1.636 1.636z"/>
                    </svg>
                    Email
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => window.open('https://shivanshssinghal-vert.vercel.app/', '_blank')}
                    className="flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-2 16l-4-4 1.414-1.414L10 14.172l7.586-7.586L19 8l-9 9z"/>
                    </svg>
                    Portfolio
                  </Button>
                </div>
                
                <div className="text-xs text-muted-foreground pt-2 border-t">
                  <p>Built with ❤️ using Next.js, TypeScript, and Tailwind CSS</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </ClientOnly>
      </div>
    </div>
  )
}