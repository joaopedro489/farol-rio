import { Inject, Injectable } from '@nestjs/common'

import { ChildrenTokens } from '../../constants/tokens'
import { ChildRepository } from '../../database/repository/child.repository'

@Injectable()
export class BrowseChildrenNeighborhoodsService {
  constructor(
    @Inject(ChildrenTokens.ChildRepository)
    private readonly childRepository: ChildRepository,
  ) {}

  async browse(): Promise<string[]> {
    return this.childRepository.listNeighborhoods()
  }
}
