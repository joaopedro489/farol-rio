import { Test, TestingModule } from '@nestjs/testing'

import { ChildrenTokens } from '../../constants/tokens'
import { ChildRepository } from '../../database/repository/child.repository'
import { BrowseChildrenOutput } from '../../domain/outputs/browse-children.output'
import { ReviewStatusEnum } from '../../domain/types/enum/review-status.enum'
import { AlertTypeEnum } from '../../domain/types/enum/alert-type.enum'

import { BrowseChildrenService } from './browse-children.service'

describe('BrowseChildrenService', () => {
  let sut: BrowseChildrenService
  let childRepository: ChildRepository

  const browseOutputMock = new BrowseChildrenOutput({
    items: [],
    total: 0,
    offset: 0,
    limit: 10,
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BrowseChildrenService,
        {
          provide: ChildrenTokens.ChildRepository,
          useValue: {
            browse: vi.fn(),
          },
        },
      ],
    }).compile()

    sut = module.get<BrowseChildrenService>(BrowseChildrenService)
    childRepository = module.get<ChildRepository>(
      ChildrenTokens.ChildRepository,
    )
  })

  it('should pass provided params to repository', async () => {
    vi.spyOn(childRepository, 'browse').mockResolvedValueOnce(browseOutputMock)

    await sut.browse({
      offset: 20,
      limit: 5,
      name: 'João',
      neighborhood: ['Centro', 'Norte'],
      type: [AlertTypeEnum.HEALTH],
      statusReview: ReviewStatusEnum.REVIEWED,
    })

    expect(childRepository.browse).toHaveBeenCalledWith({
      offset: 20,
      limit: 5,
      name: 'João',
      neighborhood: ['Centro', 'Norte'],
      type: [AlertTypeEnum.HEALTH],
      statusReview: ReviewStatusEnum.REVIEWED,
    })
  })
})
