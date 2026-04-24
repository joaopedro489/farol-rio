import { Test, TestingModule } from '@nestjs/testing'

import { SharedTokens } from 'src/shared/constants/tokens'
import { Context } from 'src/shared/context/services/context.interface'
import { UserContext } from 'src/shared/context/types/user-context.type'

import { ReviewChildService } from './review-child.service'
import { ChildRepository } from '../../database/repository/child.repository'
import { ChildrenTokens } from '../../constants/tokens'
import { Child } from '../../domain/entities/child.entity'
import {
  ChildAlreadyReviewedError,
  ChildNotFoundError,
} from '../../domain/errors/children.error'

describe('ReviewChildService', () => {
  let sut: ReviewChildService
  let childRepository: ChildRepository
  let context: Context

  const loggedUser = new UserContext({ id: 7, email: 'agent@farol.com' })

  const makeChild = (reviewed = false) =>
    new Child({
      id: 'child-uuid-1',
      name: 'João Silva',
      birthday: new Date('2015-06-15'),
      neighborhood: 'Centro',
      responsible: 'Maria Silva',
      health: null,
      education: null,
      socialAssistance: null,
      reviewed,
      reviewedBy: reviewed ? { id: 1, email: 'prev@test.com' } : null,
      reviewedAt: reviewed ? new Date() : null,
    })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewChildService,
        {
          provide: ChildrenTokens.ChildRepository,
          useValue: {
            findById: vi.fn(),
            edit: vi.fn(),
          },
        },
        {
          provide: SharedTokens.Context,
          useValue: {
            get: vi.fn(),
          },
        },
      ],
    }).compile()

    sut = module.get<ReviewChildService>(ReviewChildService)
    childRepository = module.get<ChildRepository>(
      ChildrenTokens.ChildRepository,
    )
    context = module.get<Context>(SharedTokens.Context)
  })

  it('should review child and return true', async () => {
    const child = makeChild(false)
    vi.spyOn(context, 'get').mockReturnValue(loggedUser)
    vi.spyOn(childRepository, 'findById').mockResolvedValueOnce(child)
    vi.spyOn(childRepository, 'edit').mockResolvedValueOnce(undefined)

    const result = await sut.review({ id: 'child-uuid-1' })

    expect(result).toBe(true)
    expect(child.reviewed).toBe(true)
    expect(child.reviewedBy).toEqual({ id: 7, email: 'agent@farol.com' })
    expect(childRepository.edit).toHaveBeenCalledWith(child)
  })

  it('should throw ChildNotFoundError when child does not exist', async () => {
    vi.spyOn(context, 'get').mockReturnValue(loggedUser)
    vi.spyOn(childRepository, 'findById').mockResolvedValueOnce(null)

    const result = sut.review({ id: 'nonexistent-id' })

    await expect(result).rejects.toThrow(ChildNotFoundError)
    expect(childRepository.edit).not.toHaveBeenCalled()
  })

  it('should throw ChildAlreadyReviewedError when child is already reviewed', async () => {
    const alreadyReviewed = makeChild(true)
    vi.spyOn(context, 'get').mockReturnValue(loggedUser)
    vi.spyOn(childRepository, 'findById').mockResolvedValueOnce(alreadyReviewed)

    const result = sut.review({ id: 'child-uuid-1' })

    await expect(result).rejects.toThrow(ChildAlreadyReviewedError)
    expect(childRepository.edit).not.toHaveBeenCalled()
  })
})
