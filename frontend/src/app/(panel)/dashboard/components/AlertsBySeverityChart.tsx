'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { AlertsBySeverity } from '@/domain/models/dashboard/alerts-by-severity.model'
import { Bar, BarChart, LabelList, XAxis, YAxis } from 'recharts'

type AlertsBySeverityChartProps = {
  data: AlertsBySeverity | undefined
}

const config: ChartConfig = {
  value: { label: 'Crianças' }
}

export const AlertsBySeverityChart = ({ data }: AlertsBySeverityChartProps) => {
  const items = [
    { label: 'Sem alertas', value: data?.none ?? 0, fill: 'var(--c-ok)' },
    { label: '1 área', value: data?.one ?? 0, fill: 'var(--c-attention)' },
    { label: '2 áreas', value: data?.two ?? 0, fill: 'var(--c-attention)' },
    { label: '3 áreas', value: data?.three ?? 0, fill: 'var(--destructive)' }
  ]

  return (
    <Card>
      <CardHeader className='flex items-start justify-between'>
        <div>
          <CardTitle>Nível de alerta</CardTitle>
          <CardDescription>Saúde - Educação - Assistência cruzadas</CardDescription>
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
            <Bar dataKey='value' radius={[0, 6, 6, 0]} barSize={16}>
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
