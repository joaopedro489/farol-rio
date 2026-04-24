import { User } from '../../domain/entities/user.entity'

export type UserContextModelConstructor = {
  id: number
  email: string
  hash?: string
  salt?: string
}

export class UserModel {
  static toOutput(user: UserContextModelConstructor): User {
    return new User({
      id: user.id,
      email: user.email,
      hash: user.hash,
      salt: user.salt,
    })
  }
}
