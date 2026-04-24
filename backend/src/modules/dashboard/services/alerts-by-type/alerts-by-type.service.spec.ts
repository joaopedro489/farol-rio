import { Test, TestingModule } from '@nestjs/testing'
import { DashboardRepository } from '../../database/repository/dashboard.repository'
import { AlertsByTypeService } from './alerts-by-type.service'
import { DashboardTokens } from '../../constants/tokens'
import { AlertsByTypeOutput } from '../../domain/outputs/alerts-by-type.output'

describe('AlertsByTypeService', () => {
  let sut: AlertsByTypeService
  let repository: DashboardRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AlertsByTypeService,
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

    sut = module.get<AlertsByTypeService>(AlertsByTypeService)
    repository = module.get<DashboardRepository>(
      DashboardTokens.DashboardRepository,
    )
  })

  it('should return alerts by type from repository', async () => {
    const alertsMock = {
      health: 10,
      education: 5,
      socialAssistance: 3,
    } as unknown as AlertsByTypeOutput
    vi.spyOn(repository, 'getAlertsByType').mockResolvedValueOnce(alertsMock)

    const result = await sut.getAlertsByType()

    expect(result).toEqual(alertsMock)
    expect(repository.getAlertsByType).toHaveBeenCalledTimes(1)
  })
})
