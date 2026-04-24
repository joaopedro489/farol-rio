import { Test, TestingModule } from '@nestjs/testing'

import { DashboardTokens } from '../../constants/tokens'
import { DashboardRepository } from '../../database/repository/dashboard.repository'
import { AlertsByNeighborhoodOutput } from '../../domain/outputs/alerts-by-neighborhood.output'

import { AlertsByNeighborhoodService } from './alerts-by-neighborhood.service'

describe('AlertsByNeighborhoodService', () => {
  let sut: AlertsByNeighborhoodService
  let repository: DashboardRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertsByNeighborhoodService,
        {
          provide: DashboardTokens.DashboardRepository,
          useValue: {
            getSummary: vi.fn(),
            getAlertsByType: vi.fn(),
            getAlertsBySeverity: vi.fn(),
            getAlertsByNeighborhood: vi.fn(),
          },
        },
      ],
    }).compile()

    sut = module.get<AlertsByNeighborhoodService>(AlertsByNeighborhoodService)
    repository = module.get<DashboardRepository>(
      DashboardTokens.DashboardRepository,
    )
  })

  it('should return alerts by neighborhood from repository', async () => {
    const alertsMock = [
      { neighborhood: 'Centro', count: 12 },
      { neighborhood: 'Norte', count: 7 },
    ] as unknown as AlertsByNeighborhoodOutput[]
    vi.spyOn(repository, 'getAlertsByNeighborhood').mockResolvedValueOnce(
      alertsMock,
    )

    const result = await sut.getAlertsByNeighborhood()

    expect(result).toEqual(alertsMock)
    expect(repository.getAlertsByNeighborhood).toHaveBeenCalledTimes(1)
  })
})
