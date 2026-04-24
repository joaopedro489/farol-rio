import { Inject, Injectable } from '@nestjs/common'

import { DashboardTokens } from '../../constants/tokens'
import { DashboardRepository } from '../../database/repository/dashboard.repository'
import { SummaryOutput } from '../../domain/outputs/summary.output'

@Injectable()
export class SummaryService {
  constructor(
    @Inject(DashboardTokens.DashboardRepository)
    private readonly dashboardRepository: DashboardRepository,
  ) {}

  getSummary(): Promise<SummaryOutput> {
    return this.dashboardRepository.getSummary()
  }
}
