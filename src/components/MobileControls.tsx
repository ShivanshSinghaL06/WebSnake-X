import { Button } from '@/components/ui/button'
import { ArrowUp, ArrowDown, ArrowLeft, ArrowRight } from 'lucide-react'

interface MobileControlsProps {
  onDirectionChange: (direction: 'up' | 'down' | 'left' | 'right') => void
  disabled?: boolean
}

export default function MobileControls({ onDirectionChange, disabled = false }: MobileControlsProps) {
  return (
    <div className="grid grid-cols-3 gap-2 w-48 h-48 md:hidden">
      <div></div>
      <Button
        variant="outline"
        size="icon"
        className="h-16 w-16"
        onClick={() => onDirectionChange('up')}
        disabled={disabled}
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
      <div></div>
      
      <Button
        variant="outline"
        size="icon"
        className="h-16 w-16"
        onClick={() => onDirectionChange('left')}
        disabled={disabled}
      >
        <ArrowLeft className="h-6 w-6" />
      </Button>
      <div></div>
      <Button
        variant="outline"
        size="icon"
        className="h-16 w-16"
        onClick={() => onDirectionChange('right')}
        disabled={disabled}
      >
        <ArrowRight className="h-6 w-6" />
      </Button>
      
      <div></div>
      <Button
        variant="outline"
        size="icon"
        className="h-16 w-16"
        onClick={() => onDirectionChange('down')}
        disabled={disabled}
      >
        <ArrowDown className="h-6 w-6" />
      </Button>
      <div></div>
    </div>
  )
}