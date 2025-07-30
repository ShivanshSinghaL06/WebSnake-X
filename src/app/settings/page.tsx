'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { ArrowLeft, Settings, Volume2, VolumeX, Palette, Zap } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

interface GameSettings {
  soundEnabled: boolean
  gameSpeed: 'easy' | 'medium' | 'hard'
  gridSize: 'small' | 'normal' | 'large'
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<GameSettings>({
    soundEnabled: true,
    gameSpeed: 'medium',
    gridSize: 'normal'
  })
  const [hasChanges, setHasChanges] = useState(false)

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('snakeGameSettings')
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings))
    }
  }, [])

  const handleSettingChange = (key: keyof GameSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
    setHasChanges(true)
  }

  const saveSettings = () => {
    localStorage.setItem('snakeGameSettings', JSON.stringify(settings))
    setHasChanges(false)
  }

  const resetSettings = () => {
    const defaultSettings: GameSettings = {
      soundEnabled: true,
      gameSpeed: 'medium',
      gridSize: 'normal'
    }
    setSettings(defaultSettings)
    setHasChanges(true)
  }

  const getSpeedValue = (speed: string) => {
    switch (speed) {
      case 'easy': return 200
      case 'medium': return 150
      case 'hard': return 100
      default: return 150
    }
  }

  const getGridSizeValue = (size: string) => {
    switch (size) {
      case 'small': return 15
      case 'normal': return 20
      case 'large': return 25
      default: return 20
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4 bg-background">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.location.href = '/'}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Game
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-primary">⚙️ Settings</h1>
              <p className="text-muted-foreground">Customize your game experience</p>
            </div>
          </div>
          
          <ThemeToggle />
        </div>

        {/* Settings Cards */}
        <div className="space-y-6">
          {/* Sound Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {settings.soundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
                Sound Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="sound-enabled">Sound Effects</Label>
                <Switch
                  id="sound-enabled"
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => handleSettingChange('soundEnabled', checked)}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Enable or disable sound effects for eating food and game over events.
              </p>
            </CardContent>
          </Card>

          {/* Game Speed */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Game Speed
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="game-speed">Speed Level</Label>
                <Select
                  value={settings.gameSpeed}
                  onValueChange={(value) => handleSettingChange('gameSpeed', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Badge variant={settings.gameSpeed === 'easy' ? 'default' : 'secondary'}>
                  Easy: {getSpeedValue('easy')}ms
                </Badge>
                <Badge variant={settings.gameSpeed === 'medium' ? 'default' : 'secondary'}>
                  Medium: {getSpeedValue('medium')}ms
                </Badge>
                <Badge variant={settings.gameSpeed === 'hard' ? 'default' : 'secondary'}>
                  Hard: {getSpeedValue('hard')}ms
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Adjust the game speed. Lower values make the snake move faster.
              </p>
            </CardContent>
          </Card>

          {/* Grid Size */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5" />
                Grid Size
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="grid-size">Grid Size</Label>
                <Select
                  value={settings.gridSize}
                  onValueChange={(value) => handleSettingChange('gridSize', value)}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Badge variant={settings.gridSize === 'small' ? 'default' : 'secondary'}>
                  Small: {getGridSizeValue('small')}x{getGridSizeValue('small')}
                </Badge>
                <Badge variant={settings.gridSize === 'normal' ? 'default' : 'secondary'}>
                  Normal: {getGridSizeValue('normal')}x{getGridSizeValue('normal')}
                </Badge>
                <Badge variant={settings.gridSize === 'large' ? 'default' : 'secondary'}>
                  Large: {getGridSizeValue('large')}x{getGridSizeValue('large')}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                Change the grid size. Smaller grids are easier for mobile devices.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <Button onClick={resetSettings} variant="outline">
            Reset to Defaults
          </Button>
          <Button onClick={saveSettings} disabled={!hasChanges}>
            {hasChanges ? 'Save Changes' : 'Settings Saved'}
          </Button>
        </div>

        {/* Info */}
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-sm text-muted-foreground">
              <p>Settings are automatically saved to your browser's local storage.</p>
              <p>Changes will take effect when you start a new game.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}