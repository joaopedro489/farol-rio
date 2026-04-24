import { UserContext } from '@/shared/context'
import { User } from '../../domain/entities/user.entity'

export interface UserRepository {
  findUserContextById(userId: number): Promise<UserContext | null>
  findUserByEmail(email: string): Promise<User | null>
}
