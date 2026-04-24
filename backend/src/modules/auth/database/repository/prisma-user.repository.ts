import { Inject, Injectable } from '@nestjs/common'
import { UserRepository } from './user.repository'
import { PrismaService } from '@/shared/database/prisma.service'
import { UserContextModel } from '../models/user-context.model'
import { UserModel } from '../models/user.model'

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUserContextById(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    })
    if (!user) return null

    return UserContextModel.toOutput(user)
  }

  async findUserByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    })
    if (!user) return null

    return UserModel.toOutput(user)
  }
}
