'use client'

import { Card, CardContent } from '@/components/ui/card'
import { ChartConfig, ChartContainer } from '@/components/ui/chart'
import { DashboardSummary } from '@/domain/models/dashboard/summary.model'
import { PolarAngleAxis, RadialBar, RadialBarChart } from 'recharts'

type SummaryDonutProps = {
  summary: DashboardSummary | undefined
}

const config: ChartConfig = {
  value: { label: 'Revisadas', color: 'var(--chart-1)' }
}

export const SummaryDonut = ({ summary }: SummaryDonutProps) => {
  const total = summary?.total ?? 0
  const reviewed = summary?.reviewed ?? 0
  const pending = summary?.pending ?? 0
  const percent = total > 0 ? Math.round((reviewed / total) * 100) : 0

  return (
    <Card>
      <CardContent className='flex items-center gap-4'>
        <div className='relative h-32 w-32 shrink-0'>
          <ChartContainer config={config} className='h-32 w-32'>
            <RadialBarChart
              data={[{ value: percent }]}
              innerRadius='75%'
              outerRadius='100%'
              startAngle={90}
              endAngle={-270}
            >
              <PolarAngleAxis type='number' domain={[0, 100]} tick={false} />
              <RadialBar dataKey='value' fill='var(--chart-1)' background cornerRadius={8} />
            </RadialBarChart>
          </ChartContainer>
          <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
            <p className='text-xl font-semibold'>{percent}%</p>
            <p className='text-xs text-muted-foreground'>
              {reviewed}/{total}
            </p>
          </div>
        </div>
        <div className='flex-1 flex flex-col gap-3 text-sm'>
          <div className='flex flex-col'>
            <span className='text-xs uppercase tracking-wide text-muted-foreground'>Pendentes</span>
            <span>
              <strong className='text-base'>{pending}</strong>
              <span className='text-muted-foreground'> de {total}</span>
            </span>
          </div>
          <div className='flex flex-col'>
            <span className='text-xs uppercase tracking-wide text-muted-foreground'>
              Já revisadas
            </span>
            <strong className='text-base'>{reviewed}</strong>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
