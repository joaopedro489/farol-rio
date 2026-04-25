import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { AlertsBySeverity } from '@/domain/models/dashboard/alerts-by-severity.model'

type AlertsBySeverityChartProps = {
  data: AlertsBySeverity | undefined
}

export const AlertsBySeverityChart = ({ data }: AlertsBySeverityChartProps) => {
  const items = [
    { label: 'Sem alertas', value: data?.none ?? 0, color: 'var(--c-ok)' },
    { label: '1 área', value: data?.one ?? 0, color: 'var(--c-attention)' },
    { label: '2 áreas', value: data?.two ?? 0, color: 'var(--c-attention)' },
    { label: '3 áreas', value: data?.three ?? 0, color: 'var(--destructive)' }
  ]

  const max = Math.max(...items.map((i) => i.value), 1)

  return (
    <Card>
      <CardHeader className='flex flex-row items-start justify-between'>
        <div>
          <CardTitle>Nível de alerta</CardTitle>
          <CardDescription>Saúde · Educação · Assistência cruzadas</CardDescription>
        </div>
        <span className='text-xs text-muted-foreground'>áreas em alerta por criança</span>
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
                    background: item.color
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
