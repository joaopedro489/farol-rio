import { DashboardSummary } from '@/domain/models/dashboard/summary.model'
import { StatCard } from './StatCard'
import { SummaryDonut } from './SummaryDonut'

type SummarySectionProps = {
  summary: DashboardSummary | undefined
}

export const SummarySection = ({ summary }: SummarySectionProps) => {
  return (
    <>
      <div className='hidden md:flex gap-4'>
        <div className='flex-1'>
          <StatCard
            label='Total acompanhado'
            value={summary?.total ?? 0}
            indicatorColor='var(--c-text-muted)'
          />
        </div>
        <div className='flex-1'>
          <StatCard
            label='Pendentes de revisão'
            value={summary?.pending ?? 0}
            indicatorColor='var(--c-attention)'
          />
        </div>
        <div className='flex-1'>
          <StatCard
            label='Já revisadas'
            value={summary?.reviewed ?? 0}
            indicatorColor='var(--c-ok)'
          />
        </div>
      </div>
      <div className='md:hidden'>
        <SummaryDonut summary={summary} />
      </div>
    </>
  )
}
