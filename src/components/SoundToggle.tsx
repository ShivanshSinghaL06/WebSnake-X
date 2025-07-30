import { Button } from '@/components/ui/button'
import { Volume2, VolumeX } from 'lucide-react'

interface SoundToggleProps {
  enabled: boolean
  onToggle: () => void
}

export default function SoundToggle({ enabled, onToggle }: SoundToggleProps) {
  return (
    <Button onClick={onToggle} variant="outline" size="icon">
      {enabled ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
    </Button>
  )
}