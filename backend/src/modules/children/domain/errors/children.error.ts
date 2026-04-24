import { ConflictException, NotFoundException } from '@nestjs/common'

export class ChildNotFoundError extends NotFoundException {
  constructor() {
    super('Criança não encontrada.')
  }
}

export class ChildAlreadyReviewedError extends ConflictException {
  constructor() {
    super('Criança já foi revisada.')
  }
}
