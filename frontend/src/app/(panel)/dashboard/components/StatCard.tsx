import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'

type StatCardProps = {
  label: string
  value: number
  size?: 'default' | 'sm'
  indicatorColor?: string
}

export const StatCard = ({ label, value, size = 'default', indicatorColor }: StatCardProps) => {
  return (
    <Card size={size} className='relative'>
      <CardHeader>
        <p
          className={cn(
            'uppercase tracking-wide text-muted-foreground',
            size === 'sm' ? 'text-[10px]' : 'text-xs'
          )}
        >
          {label}
        </p>
      </CardHeader>
      <CardContent>
        <p className={cn('font-semibold', size === 'sm' ? 'text-xl' : 'text-3xl')}>{value}</p>
      </CardContent>
      {indicatorColor && (
        <span
          className='absolute top-3 right-3 h-2 w-2 rounded-full'
          style={{ background: indicatorColor }}
        />
      )}
    </Card>
  )
}
