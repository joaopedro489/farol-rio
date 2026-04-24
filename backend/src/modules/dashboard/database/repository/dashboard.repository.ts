import { AlertsByNeighborhoodOutput } from '../../domain/outputs/alerts-by-neighborhood.output'
import { AlertsBySeverityOutput } from '../../domain/outputs/alerts-by-severity.output'
import { AlertsByTypeOutput } from '../../domain/outputs/alerts-by-type.output'
import { SummaryOutput } from '../../domain/outputs/summary.output'

export interface DashboardRepository {
  getSummary(): Promise<SummaryOutput>
  getAlertsByType(): Promise<AlertsByTypeOutput>
  getAlertsBySeverity(): Promise<AlertsBySeverityOutput>
  getAlertsByNeighborhood(): Promise<AlertsByNeighborhoodOutput[]>
}
