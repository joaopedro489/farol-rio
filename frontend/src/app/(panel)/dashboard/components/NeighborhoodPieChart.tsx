'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { AlertsByNeighborhood } from '@/domain/models/dashboard/alerts-by-neighborhood.model'
import { Pie, PieChart } from 'recharts'

type NeighborhoodPieChartProps = {
  data: AlertsByNeighborhood[]
}

const sliceColor = (i: number) => `var(--chart-${(i % 5) + 1})`

export const NeighborhoodPieChart = ({ data }: NeighborhoodPieChartProps) => {
  const total = data.reduce((acc, item) => acc + item.value, 0)

  const colored = data.map((item, i) => ({ ...item, fill: sliceColor(i) }))

  const config: ChartConfig = colored.reduce<ChartConfig>((acc, item) => {
    acc[item.label] = { label: item.label, color: item.fill }
    return acc
  }, {})

  return (
    <Card>
      <CardHeader className='flex items-start justify-between'>
        <div>
          <CardTitle>Concentração por bairro</CardTitle>
          <CardDescription>{data.length} bairros atendidos</CardDescription>
        </div>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className='flex flex-col md:flex-row gap-6 md:items-center'>
          <ChartContainer config={config} className='h-50 w-full md:w-50 md:shrink-0'>
            <PieChart>
              <Pie
                data={colored}
                dataKey='value'
                nameKey='label'
                innerRadius={0}
                outerRadius={80}
              />
            </PieChart>
          </ChartContainer>
          <ul className='flex-1 flex flex-col gap-2'>
            {colored.map((item) => {
              const percent = total > 0 ? Math.round((item.value / total) * 100) : 0
              return (
                <li key={item.label} className='flex items-center gap-2 text-sm'>
                  <span className='h-2 w-2 rounded-sm shrink-0' style={{ background: item.fill }} />
                  <span className='flex-1 truncate'>{item.label}</span>
                  <span className='font-medium tabular-nums'>{item.value}</span>
                  <span className='text-muted-foreground w-10 text-right tabular-nums'>
                    {percent}%
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
