import { Inject, Injectable, UnauthorizedException } from '@nestjs/common'

import { SharedTokens } from 'src/shared/constants/tokens'
import { Context } from 'src/shared/context/services/context.interface'
import { ContextKey } from 'src/shared/context/types/enum/context-key.enum'
import { UserContext } from 'src/shared/context/types/user-context.type'
import { ChildrenTokens } from '../../constants/tokens'
import { ChildRepository } from '../../database/repository/child.repository'
import {
  ChildAlreadyReviewedError,
  ChildNotFoundError,
} from '../../domain/errors/children.error'

type Params = {
  id: string
}

@Injectable()
export class ReviewChildService {
  constructor(
    @Inject(ChildrenTokens.ChildRepository)
    private readonly childRepository: ChildRepository,

    @Inject(SharedTokens.Context)
    private readonly context: Context,
  ) {}

  async review({ id }: Params): Promise<boolean> {
    const loggedUser = this.context.get<UserContext>(ContextKey.USER)

    const child = await this.childRepository.findById(id)
    if (!child) throw new ChildNotFoundError()

    const isReviewed = child.markAsReviewed({
      id: loggedUser.id,
      email: loggedUser.email,
    })
    if (!isReviewed) throw new ChildAlreadyReviewedError()
    await this.childRepository.edit(child)

    return true
  }
}
