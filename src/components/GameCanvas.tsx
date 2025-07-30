'use client'

import { useEffect, useRef, useCallback, useState } from 'react'

interface Position {
  x: number
  y: number
}

interface FoodItem {
  position: Position
  type: 'apple' | 'banana' | 'cherry' | 'grape' | 'orange' | 'strawberry'
}

interface GameCanvasProps {
  gameState: 'idle' | 'playing' | 'paused' | 'gameOver'
  onGameStart: () => void
  onGamePause: () => void
  onGameResume: () => void
  onGameOver: () => void
  onGameRestart: () => void
  onScoreUpdate: (score: number) => void
  soundEnabled: boolean
}

const DEFAULT_GRID_SIZE = 20
const DEFAULT_CELL_SIZE = 20
const INITIAL_SPEED = 150

// Responsive grid size for mobile
const getResponsiveGridSize = () => {
  if (typeof window === 'undefined') return DEFAULT_GRID_SIZE
  const width = window.innerWidth
  if (width < 640) return 15 // Smaller grid for mobile
  return DEFAULT_GRID_SIZE
}

const getResponsiveCellSize = () => {
  if (typeof window === 'undefined') return DEFAULT_CELL_SIZE
  const width = window.innerWidth
  if (width < 640) return 20 // Smaller cells for mobile
  return DEFAULT_CELL_SIZE
}

export default function GameCanvas({
  gameState,
  onGameStart,
  onGamePause,
  onGameResume,
  onGameOver,
  onGameRestart,
  onScoreUpdate,
  soundEnabled
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | undefined>(undefined)
  const lastUpdateTimeRef = useRef<number>(0)
  
  const [currentGridSize, setCurrentGridSize] = useState(DEFAULT_GRID_SIZE)
  const [currentCellSize, setCurrentCellSize] = useState(DEFAULT_CELL_SIZE)
  const [snake, setSnake] = useState<Position[]>([{ x: 10, y: 10 }])
  const [food, setFood] = useState<FoodItem>({ position: { x: 15, y: 15 }, type: 'apple' })
  const [direction, setDirection] = useState<'up' | 'down' | 'left' | 'right'>('right')
  const [score, setScore] = useState(0)
  const [currentGameSpeed, setCurrentGameSpeed] = useState(INITIAL_SPEED)
  const [isRestarting, setIsRestarting] = useState(false)

  // Food types array
  const foodTypes: FoodItem['type'][] = ['apple', 'banana', 'cherry', 'grape', 'orange', 'strawberry']
  
  // Generate random food position and type
  const generateFood = useCallback((gridSize: number, currentSnake: Position[]): FoodItem => {
    const newPosition = {
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize)
    }
    
    // Make sure food doesn't spawn on snake
    const isOnSnake = currentSnake.some(segment => segment.x === newPosition.x && segment.y === newPosition.y)
    if (isOnSnake) {
      return generateFood(gridSize, currentSnake)
    }
    
    const randomType = foodTypes[Math.floor(Math.random() * foodTypes.length)]
    
    return {
      position: newPosition,
      type: randomType
    }
  }, [])

  // Initialize game
  const initGame = useCallback(() => {
    // Stop any running animation frame first
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = undefined
    }
    
    const newGridSize = getResponsiveGridSize()
    const newCellSize = getResponsiveCellSize()
    setCurrentGridSize(newGridSize)
    setCurrentCellSize(newCellSize)
    setSnake([{ x: Math.floor(newGridSize / 2), y: Math.floor(newGridSize / 2) }])
    setDirection('right')
    setScore(0)
    setCurrentGameSpeed(INITIAL_SPEED)
    setFood(generateFood(newGridSize, [{ x: Math.floor(newGridSize / 2), y: Math.floor(newGridSize / 2) }]))
  }, [generateFood])

  // Handle score updates
  useEffect(() => {
    onScoreUpdate(score)
  }, [score, onScoreUpdate])

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (gameState === 'idle' && e.key === ' ') {
        initGame()
        onGameStart()
        return
      }

      if (e.key === ' ') {
        if (gameState === 'playing') {
          onGamePause()
        } else if (gameState === 'paused') {
          onGameResume()
        } else if (gameState === 'gameOver' && !isRestarting) {
          setIsRestarting(true)
          initGame()
          onGameRestart()
          // Reset restarting state after a short delay
          setTimeout(() => setIsRestarting(false), 100)
        }
        return
      }

      if (gameState !== 'playing') return

      switch (e.key) {
        case 'ArrowUp':
          if (direction !== 'down') setDirection('up')
          break
        case 'ArrowDown':
          if (direction !== 'up') setDirection('down')
          break
        case 'ArrowLeft':
          if (direction !== 'right') setDirection('left')
          break
        case 'ArrowRight':
          if (direction !== 'left') setDirection('right')
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [gameState, direction, isRestarting, onGameStart, onGamePause, onGameResume, onGameRestart, initGame])

  // Game loop
  const gameLoop = useCallback((timestamp: number) => {
    // Always check game state first and stop if not playing
    if (gameState !== 'playing') {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = undefined
      }
      return
    }

    if (!lastUpdateTimeRef.current || timestamp - lastUpdateTimeRef.current >= currentGameSpeed) {
      lastUpdateTimeRef.current = timestamp

      setSnake(prevSnake => {
        const head = { ...prevSnake[0] }
        
        // Move head based on direction
        switch (direction) {
          case 'up':
            head.y -= 1
            break
          case 'down':
            head.y += 1
            break
          case 'left':
            head.x -= 1
            break
          case 'right':
            head.x += 1
            break
        }

        // Check wall collision
        if (head.x < 0 || head.x >= currentGridSize || head.y < 0 || head.y >= currentGridSize) {
          // Play crash sound
          if (soundEnabled) {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE')
            audio.play().catch(() => {})
          }
          
          // Save score to localStorage for leaderboard submission
          localStorage.setItem('snakeLastScore', score.toString())
          
          // Stop the game loop immediately and call game over
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = undefined
          }
          
          // Use setTimeout to ensure state updates are processed
          setTimeout(() => {
            onGameOver()
          }, 0)
          
          return prevSnake
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
          // Play crash sound
          if (soundEnabled) {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE')
            audio.play().catch(() => {})
          }
          
          // Save score to localStorage for leaderboard submission
          localStorage.setItem('snakeLastScore', score.toString())
          
          // Stop the game loop immediately and call game over
          if (animationRef.current) {
            cancelAnimationFrame(animationRef.current)
            animationRef.current = undefined
          }
          
          // Use setTimeout to ensure state updates are processed
          setTimeout(() => {
            onGameOver()
          }, 0)
          
          return prevSnake
        }

        const newSnake = [head, ...prevSnake]
        
        // Check food collision
        if (head.x === food.position.x && head.y === food.position.y) {
          // Play eat sound
          if (soundEnabled) {
            const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZURE')
            audio.play().catch(() => {})
          }
          
          const newScore = score + 1
          setScore(newScore)
          setFood(generateFood(currentGridSize, newSnake))
          
          // Increase speed slightly
          setCurrentGameSpeed(prev => Math.max(prev - 2, 50))
        } else {
          // Remove tail if no food eaten
          newSnake.pop()
        }

        return newSnake
      })
    }

    // Only continue the loop if we're still playing
    if (gameState === 'playing') {
      animationRef.current = requestAnimationFrame(gameLoop)
    }
  }, [gameState, direction, food, score, soundEnabled, onGameOver, onScoreUpdate, generateFood, currentGameSpeed, currentGridSize])

  // Start/stop game loop based on game state
  useEffect(() => {
    // Always cancel any existing animation frame first
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
      animationRef.current = undefined
    }

    if (gameState === 'playing') {
      // Small delay to ensure state is fully updated
      setTimeout(() => {
        if (gameState === 'playing' && !animationRef.current) {
          animationRef.current = requestAnimationFrame(gameLoop)
        }
      }, 0)
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
        animationRef.current = undefined
      }
    }
  }, [gameState, gameLoop])

  // Initialize game when starting
  useEffect(() => {
    if (gameState === 'idle') {
      initGame()
    }
  }, [gameState, initGame])



  // Draw game
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw grid
    ctx.strokeStyle = '#e5e7eb'
    ctx.lineWidth = 1
    for (let i = 0; i <= currentGridSize; i++) {
      ctx.beginPath()
      ctx.moveTo(i * currentCellSize, 0)
      ctx.lineTo(i * currentCellSize, currentGridSize * currentCellSize)
      ctx.stroke()
      
      ctx.beginPath()
      ctx.moveTo(0, i * currentCellSize)
      ctx.lineTo(currentGridSize * currentCellSize, i * currentCellSize)
      ctx.stroke()
    }

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#16a34a' : '#22c55e' // Head is darker
      ctx.fillRect(segment.x * currentCellSize, segment.y * currentCellSize, currentCellSize - 2, currentCellSize - 2)
      
      // Add some styling to snake segments
      ctx.strokeStyle = '#15803d'
      ctx.lineWidth = 1
      ctx.strokeRect(segment.x * currentCellSize, segment.y * currentCellSize, currentCellSize - 2, currentCellSize - 2)
    })

    // Draw food
    const foodEmojis = {
      apple: '🍎',
      banana: '🍌',
      cherry: '🍒',
      grape: '🍇',
      orange: '🍊',
      strawberry: '🍓'
    }
    
    const emoji = foodEmojis[food.type]
    const fontSize = Math.min(currentCellSize - 4, 20)
    
    ctx.font = `${fontSize}px Arial`
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'
    ctx.fillText(
      emoji,
      food.position.x * currentCellSize + currentCellSize / 2,
      food.position.y * currentCellSize + currentCellSize / 2
    )

    // Draw game over overlay
    if (gameState === 'gameOver') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = 'white'
      ctx.font = 'bold 24px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Game Over!', canvas.width / 2, canvas.height / 2 - 20)
      ctx.font = '16px Arial'
      ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 10)
      ctx.fillText('Press Space to restart', canvas.width / 2, canvas.height / 2 + 40)
    }

    // Draw pause overlay
    if (gameState === 'paused') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = 'white'
      ctx.font = 'bold 24px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Paused', canvas.width / 2, canvas.height / 2)
      ctx.font = '16px Arial'
      ctx.fillText('Press Space to continue', canvas.width / 2, canvas.height / 2 + 30)
    }

    // Draw start message
    if (gameState === 'idle') {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      ctx.fillStyle = 'white'
      ctx.font = 'bold 24px Arial'
      ctx.textAlign = 'center'
      ctx.fillText('Press Space to Start', canvas.width / 2, canvas.height / 2)
    }
  }, [snake, food, gameState, score, currentGridSize, currentCellSize])

  return (
    <div className="flex justify-center">
      <canvas
        ref={canvasRef}
        width={currentGridSize * currentCellSize}
        height={currentGridSize * currentCellSize}
        className="border border-border rounded-lg bg-background"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  )
}