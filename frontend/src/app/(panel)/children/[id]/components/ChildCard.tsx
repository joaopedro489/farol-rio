import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AlertEnum, AlertEnumLabels } from '@/domain/enums/alert.enum'
import { AlertTriangle, LucideIcon } from 'lucide-react'
import { ChildCardBody } from './ChildCardBody'

type ChildCardProps = {
  label: string
  isNull: boolean
  body: {
    label: string
    value: string
    isAlert: boolean
  }[]
  activeAlerts: AlertEnum[]
  Icon: LucideIcon
}

export const ChildCard = ({ label, body, activeAlerts, Icon, isNull }: ChildCardProps) => {
  if (isNull) {
    return (
      <Card className='p-5 flex flex-col items-center justify-center gap-2 h-40 bg-muted'>
        <Icon size={24} className='text-muted-foreground' />
        <p className='text-base font-semibold text-foreground'>{label}</p>
        <Badge variant='outline' className='bg-transparent'>
          Sem dados
        </Badge>
        <p className='text-xs text-muted-foreground'>Sem registros dessa área</p>
      </Card>
    )
  }

  const alertCount = activeAlerts.length

  return (
    <Card className='p-5 space-y-4'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='flex items-center justify-center w-8 h-8 rounded-md bg-muted text-muted-foreground'>
            <Icon size={16} />
          </div>
          <p className='text-base font-semibold text-foreground'>{label}</p>
        </div>
        {alertCount > 0 && (
          <Badge
            variant='outline'
            className='gap-1 text-attention border-attention/30 bg-attention-soft'
          >
            <AlertTriangle size={11} />
            {alertCount} alerta{alertCount > 1 ? 's' : ''}
          </Badge>
        )}
      </div>

      <Separator />

      <div>
        {body.map((item, index) => (
          <ChildCardBody key={index} {...item} />
        ))}
      </div>

      {alertCount > 0 && (
        <div className='bg-attention-soft text-attention rounded-md p-3'>
          <p className='text-sm font-semibold'>Alertas ativos</p>
          <ul className='text-sm mt-1 space-y-0.5'>
            {activeAlerts.map((alert, index) => (
              <li key={index}>{AlertEnumLabels[alert]}</li>
            ))}
          </ul>
        </div>
      )}
    </Card>
  )
}
