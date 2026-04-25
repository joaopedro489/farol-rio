import { Badge } from '@/components/ui/badge'
import { AlertTriangle, CheckCircle } from 'lucide-react'

export const AlertBadge = ({ value }: { value: boolean | null }) => {
  if (value === null || value === undefined) {
    return <span className='text-muted-foreground text-sm'>—</span>
  }
  if (value) {
    return (
      <Badge
        variant='outline'
        className='gap-1 text-attention border-attention/30 bg-attention-soft'
      >
        <AlertTriangle size={11} />
        alerta
      </Badge>
    )
  }
  return (
    <Badge variant='outline' className='gap-1 text-ok border-ok/30 bg-ok-soft'>
      <CheckCircle size={11} />
      ok
    </Badge>
  )
}
