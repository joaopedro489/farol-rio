import { Inject, Injectable } from '@nestjs/common'

import { ChildrenTokens } from '../../constants/tokens'
import { ChildRepository } from '../../database/repository/child.repository'
import { BrowseChildrenOutput } from '../../domain/outputs/browse-children.output'
import { AlertTypeEnum } from '../../domain/types/enum/alert-type.enum'
import { ReviewStatusEnum } from '../../domain/types/enum/review-status.enum'

type Params = {
  offset?: number
  limit?: number
  name?: string
  neighborhood?: string[]
  type?: AlertTypeEnum[]
  statusReview?: ReviewStatusEnum
}

const DEFAULT_OFFSET = 0
const DEFAULT_LIMIT = 10

@Injectable()
export class BrowseChildrenService {
  constructor(
    @Inject(ChildrenTokens.ChildRepository)
    private readonly childRepository: ChildRepository,
  ) {}

  async browse(params: Params): Promise<BrowseChildrenOutput> {
    const offset = params.offset ?? DEFAULT_OFFSET
    const limit = params.limit ?? DEFAULT_LIMIT

    const children = await this.childRepository.browse({
      offset,
      limit,
      name: params.name,
      neighborhood: params.neighborhood,
      type: params.type,
      statusReview: params.statusReview,
    })

    return children
  }
}
