import { Test, TestingModule } from '@nestjs/testing'
import { AlertsBySeverityService } from './alerts-by-severity.service'
import { DashboardRepository } from '../../database/repository/dashboard.repository'
import { DashboardTokens } from '../../constants/tokens'
import { AlertsBySeverityOutput } from '../../domain/outputs/alerts-by-severity.output'

describe('AlertsBySeverityService', () => {
  let sut: AlertsBySeverityService
  let repository: DashboardRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertsBySeverityService,
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

    sut = module.get<AlertsBySeverityService>(AlertsBySeverityService)
    repository = module.get<DashboardRepository>(
      DashboardTokens.DashboardRepository,
    )
  })

  it('should return alerts by severity from repository', async () => {
    const alertsMock = {
      high: 8,
      medium: 15,
      low: 20,
    } as unknown as AlertsBySeverityOutput
    vi.spyOn(repository, 'getAlertsBySeverity').mockResolvedValueOnce(
      alertsMock,
    )

    const result = await sut.getAlertsBySeverity()

    expect(result).toEqual(alertsMock)
    expect(repository.getAlertsBySeverity).toHaveBeenCalledTimes(1)
  })
})
