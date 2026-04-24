import { Inject, Injectable } from '@nestjs/common'

import { ChildrenTokens } from '../../constants/tokens'
import { ChildRepository } from '../../database/repository/child.repository'
import { ChildNotFoundError } from '../../domain/errors/children.error'
import { ChildOutput } from '../../domain/outputs/child.output'

type Params = {
  id: string
}

@Injectable()
export class ReadChildService {
  constructor(
    @Inject(ChildrenTokens.ChildRepository)
    private readonly childRepository: ChildRepository,
  ) {}

  async read({ id }: Params): Promise<ChildOutput> {
    const child = await this.childRepository.findById(id)
    if (!child) throw new ChildNotFoundError()

    return ChildOutput.fromEntity(child)
  }
}
