'use client'

import { useFetchAlertsByNeighborhood } from '@/hooks/api/dashboard/useFetchAlertsByNeighborhood'
import { useFetchAlertsBySeverity } from '@/hooks/api/dashboard/useFetchAlertsBySeverity'
import { useFetchAlertsByType } from '@/hooks/api/dashboard/useFetchAlertsByType'
import { useFetchSummary } from '@/hooks/api/dashboard/useFetchSummary'
import { AlertsBySeverityChart } from './AlertsBySeverityChart'
import { AlertsByTypeChart } from './AlertsByTypeChart'
import { NeighborhoodPieChart } from './NeighborhoodPieChart'
import { SummarySection } from './SummarySection'

export const DashboardContent = () => {
  const { summary } = useFetchSummary()
  const { alertsByType } = useFetchAlertsByType()
  const { alertsBySeverity } = useFetchAlertsBySeverity()
  const { alertsByNeighborhood } = useFetchAlertsByNeighborhood()

  return (
    <div className='flex flex-col gap-6 p-6'>
      <header>
        <h1 className='text-2xl font-semibold'>Painel</h1>
        <p className='text-sm text-muted-foreground mt-0.5'>
          Resumo consolidado — saúde, educação e assistência social.
        </p>
      </header>

      <SummarySection summary={summary} />

      <div className='flex flex-col md:flex-row gap-4'>
        <div className='flex-1'>
          <AlertsByTypeChart data={alertsByType} />
        </div>
        <div className='flex-1'>
          <AlertsBySeverityChart data={alertsBySeverity} />
        </div>
      </div>

      <NeighborhoodPieChart data={alertsByNeighborhood ?? []} />
    </div>
  )
}
