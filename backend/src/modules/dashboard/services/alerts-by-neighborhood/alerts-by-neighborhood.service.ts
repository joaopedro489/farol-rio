import { Inject, Injectable } from '@nestjs/common'

import { DashboardTokens } from '../../constants/tokens'
import { DashboardRepository } from '../../database/repository/dashboard.repository'
import { AlertsByNeighborhoodOutput } from '../../domain/outputs/alerts-by-neighborhood.output'

@Injectable()
export class AlertsByNeighborhoodService {
  constructor(
    @Inject(DashboardTokens.DashboardRepository)
    private readonly dashboardRepository: DashboardRepository,
  ) {}

  getAlertsByNeighborhood(): Promise<AlertsByNeighborhoodOutput[]> {
    return this.dashboardRepository.getAlertsByNeighborhood()
  }
}
