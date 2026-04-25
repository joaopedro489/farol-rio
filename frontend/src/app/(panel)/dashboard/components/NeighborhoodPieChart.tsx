'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { Separator } from '@/components/ui/separator'
import { AlertsByNeighborhood } from '@/domain/models/dashboard/alerts-by-neighborhood.model'
import { Cell, Pie, PieChart } from 'recharts'

type NeighborhoodPieChartProps = {
  data: AlertsByNeighborhood[]
}

const sliceColor = (i: number) => `var(--chart-${(i % 5) + 1})`

export const NeighborhoodPieChart = ({ data }: NeighborhoodPieChartProps) => {
  const total = data.reduce((acc, item) => acc + item.value, 0)

  const config: ChartConfig = data.reduce<ChartConfig>((acc, item, i) => {
    acc[item.label] = { label: item.label, color: sliceColor(i) }
    return acc
  }, {})

  return (
    <Card>
      <CardHeader className='flex flex-row items-start justify-between'>
        <div>
          <CardTitle>Concentração por bairro</CardTitle>
          <CardDescription>{data.length} bairros atendidos</CardDescription>
        </div>
        <span className='text-xs text-muted-foreground'>top 5 + outros</span>
      </CardHeader>
      <Separator />
      <CardContent>
        <div className='flex flex-col md:flex-row gap-6 md:items-center'>
          <ChartContainer
            config={config}
            className='h-[200px] w-full md:w-[200px] md:shrink-0 aspect-square'
          >
            <PieChart>
              <Pie data={data} dataKey='value' nameKey='label' innerRadius={0} outerRadius={80}>
                {data.map((_, i) => (
                  <Cell key={i} fill={sliceColor(i)} />
                ))}
              </Pie>
            </PieChart>
          </ChartContainer>
          <ul className='flex-1 flex flex-col gap-2'>
            {data.map((item, i) => {
              const percent = total > 0 ? Math.round((item.value / total) * 100) : 0
              return (
                <li key={item.label} className='flex items-center gap-2 text-sm'>
                  <span
                    className='h-2 w-2 rounded-sm shrink-0'
                    style={{ background: sliceColor(i) }}
                  />
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
