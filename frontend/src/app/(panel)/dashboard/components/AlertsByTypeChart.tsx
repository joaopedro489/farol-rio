import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AlertsByType } from '@/domain/models/dashboard/alerts-by-type.model'

type AlertsByTypeChartProps = {
  data: AlertsByType | undefined
}

export const AlertsByTypeChart = ({ data }: AlertsByTypeChartProps) => {
  const items = [
    { label: 'Saúde', value: data?.health ?? 0 },
    { label: 'Educação', value: data?.education ?? 0 },
    { label: 'Assistência', value: data?.social_assistance ?? 0 }
  ]

  const max = Math.max(...items.map((i) => i.value), 1)

  return (
    <Card>
      <CardHeader className='flex flex-row items-start justify-between'>
        <div>
          <CardTitle>Alertas por área</CardTitle>
          <CardDescription>Contagem de alertas ativos</CardDescription>
        </div>
        <span className='text-xs text-muted-foreground'>crianças com ≥1 alerta</span>
      </CardHeader>
      <Separator />
      <CardContent>
        <ul className='flex flex-col gap-3'>
          {items.map((item) => (
            <li key={item.label} className='flex items-center gap-3'>
              <span className='w-6 text-right text-sm font-semibold tabular-nums'>{item.value}</span>
              <span className='w-24 text-sm text-muted-foreground'>{item.label}</span>
              <div className='flex-1 h-2 bg-muted rounded-full overflow-hidden'>
                <div
                  className='h-full rounded-full'
                  style={{
                    width: `${(item.value / max) * 100}%`,
                    background: 'var(--chart-1)'
                  }}
                />
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
