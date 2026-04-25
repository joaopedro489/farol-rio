import { Badge } from '@/components/ui/badge'
import { CheckCircle } from 'lucide-react'

export const StatusBadge = ({ status }: { status: boolean }) => {
  {
    if (status) {
      return (
        <Badge variant='outline' className='gap-1 text-ok border-ok/30 bg-ok-soft'>
          <CheckCircle size={11} />
          revisado
        </Badge>
      )
    }
    return (
      <Badge variant='outline' className='text-muted-foreground'>
        pendente
      </Badge>
    )
  }
}
