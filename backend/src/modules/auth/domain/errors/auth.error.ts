import { ForbiddenException, NotFoundException } from '@nestjs/common'

export class WrongPasswordError extends ForbiddenException {
  constructor() {
    super('Senha incorreta. Por favor, tente novamente.')
  }
}

export class UserNotFoundError extends NotFoundException {
  constructor() {
    super('Usuário não encontrado. Por favor, verifique suas credenciais.')
  }
}
