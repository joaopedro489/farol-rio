import { UserContext } from 'src/shared/context'

export type UserContextModelConstructor = {
  id: number

  email: string
}

export class UserContextModel {
  static toOutput(prisma: UserContextModelConstructor): UserContext {
    return new UserContext({
      id: prisma.id,
      email: prisma.email,
    })
  }
}
