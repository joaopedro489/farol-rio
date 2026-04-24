import { Test, TestingModule } from '@nestjs/testing'
import { SummaryService } from './summary.service'
import { DashboardRepository } from '../../database/repository/dashboard.repository'
import { DashboardTokens } from '../../constants/tokens'
import { SummaryOutput } from '../../domain/outputs/summary.output'

describe('SummaryService', () => {
  let sut: SummaryService
  let repository: DashboardRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SummaryService,
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

    sut = module.get<SummaryService>(SummaryService)
    repository = module.get<DashboardRepository>(
      DashboardTokens.DashboardRepository,
    )
  })

  it('should return summary from repository', async () => {
    const summaryMock = {
      total: 100,
      reviewed: 40,
      pending: 60,
    } as unknown as SummaryOutput
    vi.spyOn(repository, 'getSummary').mockResolvedValueOnce(summaryMock)

    const result = await sut.getSummary()

    expect(result).toEqual(summaryMock)
    expect(repository.getSummary).toHaveBeenCalledTimes(1)
  })
})
