'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { AlertsByType } from '@/domain/models/dashboard/alerts-by-type.model'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'

type AlertsByTypeChartProps = {
  data: AlertsByType | undefined
}

const config: ChartConfig = {
  value: { label: 'Crianças', color: 'var(--chart-1)' }
}

export const AlertsByTypeChart = ({ data }: AlertsByTypeChartProps) => {
  const items = [
    { label: 'Saúde', value: data?.health ?? 0 },
    { label: 'Educação', value: data?.education ?? 0 },
    { label: 'Assistência', value: data?.social_assistance ?? 0 }
  ]

  return (
    <Card>
      <CardHeader className='flex items-start justify-between'>
        <div>
          <CardTitle>Alertas por área</CardTitle>
          <CardDescription>Contagem de alertas ativos</CardDescription>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <ChartContainer config={config} className='h-45 w-full'>
          <BarChart data={items} layout='vertical' margin={{ left: 16, right: 32 }}>
            <XAxis type='number' hide />
            <YAxis
              dataKey='label'
              type='category'
              tickLine={false}
              axisLine={false}
              width={90}
              tick={{ fill: 'var(--muted-foreground)', fontSize: 13 }}
            />
            <Bar dataKey='value' fill='var(--chart-1)' radius={[0, 6, 6, 0]} barSize={16}>
              <LabelList
                dataKey='value'
                position='right'
                className='fill-foreground font-semibold'
                fontSize={13}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
