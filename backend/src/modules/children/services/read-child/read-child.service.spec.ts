import { Test, TestingModule } from '@nestjs/testing'

import { ChildrenTokens } from '../../constants/tokens'
import { ChildRepository } from '../../database/repository/child.repository'
import { Child } from '../../domain/entities/child.entity'
import { ChildNotFoundError } from '../../domain/errors/children.error'
import { ChildOutput } from '../../domain/outputs/child.output'

import { ReadChildService } from './read-child.service'

describe('ReadChildService', () => {
  let sut: ReadChildService
  let childRepository: ChildRepository

  const childMock = new Child({
    id: 'child-uuid-1',
    name: 'João Silva',
    birthday: new Date('2015-06-15'),
    neighborhood: 'Centro',
    responsible: 'Maria Silva',
    health: null,
    education: null,
    socialAssistance: null,
    reviewed: false,
    reviewedBy: null,
    reviewedAt: null,
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReadChildService,
        {
          provide: ChildrenTokens.ChildRepository,
          useValue: {
            findById: vi.fn(),
          },
        },
      ],
    }).compile()

    sut = module.get<ReadChildService>(ReadChildService)
    childRepository = module.get<ChildRepository>(
      ChildrenTokens.ChildRepository,
    )
  })

  it('should return ChildOutput for a found child', async () => {
    vi.spyOn(childRepository, 'findById').mockResolvedValueOnce(childMock)

    const result = await sut.read({ id: 'child-uuid-1' })

    expect(result).toBeInstanceOf(ChildOutput)
    expect(result.id).toBe('child-uuid-1')
    expect(result.name).toBe('João Silva')
    expect(result.neighborhood).toBe('Centro')
    expect(result.isReviewed).toBe(false)
    expect(result.reviewedByEmail).toBeNull()
    expect(childRepository.findById).toHaveBeenCalledWith('child-uuid-1')
  })

  it('should throw ChildNotFoundError when child does not exist', async () => {
    vi.spyOn(childRepository, 'findById').mockResolvedValueOnce(null)

    const result = sut.read({ id: 'nonexistent-id' })

    await expect(result).rejects.toThrow(ChildNotFoundError)
  })
})
