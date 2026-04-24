import { Injectable } from '@nestjs/common'

import { Prisma } from '@/generated/prisma/client'
import { PrismaService } from '@/shared/database/prisma.service'

import { Child } from '../../domain/entities/child.entity'
import { AlertTypeEnum } from '../../domain/types/enum/alert-type.enum'
import { ReviewStatusEnum } from '../../domain/types/enum/review-status.enum'
import { ChildModel } from '../models/child.model'

import { BrowseChildrenParams, ChildRepository } from './child.repository'
import { BrowseChildrenOutput } from '../../domain/outputs/browse-children.output'

@Injectable()
export class PrismaChildRepository implements ChildRepository {
  constructor(private readonly prisma: PrismaService) {}

  async browse(params: BrowseChildrenParams): Promise<BrowseChildrenOutput> {
    const where = this.buildWhere(params)

    const [rows, total] = await Promise.all([
      this.prisma.child.findMany({
        where,
        include: { reviewed_by: true },
        orderBy: { created_at: 'desc' },
        skip: params.offset,
        take: params.limit,
      }),
      this.prisma.child.count({ where }),
    ])

    const children = ChildModel.toArray(rows)

    return ChildModel.toChildrenOutput({
      children,
      total,
      offset: params.offset,
      limit: params.limit,
    })
  }

  async findById(id: string): Promise<Child | null> {
    const row = await this.prisma.child.findUnique({
      where: { id },
      include: { reviewed_by: true },
    })
    if (!row) return null
    return ChildModel.toEntity(row)
  }

  async edit(child: Child): Promise<void> {
    await this.prisma.child.update({
      where: { id: child.id },
      data: {
        reviewed: child.reviewed,
        reviewed_by_user_id: child.reviewedBy?.id ?? null,
        reviewed_at: child.reviewedAt,
      },
    })
  }

  private buildWhere(params: BrowseChildrenParams): Prisma.ChildWhereInput {
    const where: Prisma.ChildWhereInput = {}

    if (params.name) {
      where.name = { contains: params.name, mode: 'insensitive' }
    }

    if (params.neighborhood?.length) {
      where.neighborhood = { in: params.neighborhood }
    }

    if (params.statusReview === ReviewStatusEnum.PENDING) {
      where.reviewed = false
    } else if (params.statusReview === ReviewStatusEnum.REVIEWED) {
      where.reviewed = true
    }

    if (params.type) {
      where.OR = params.type.map((t) => {
        if (t === AlertTypeEnum.HEALTH) {
          return { health: { not: Prisma.DbNull } }
        }
        if (t === AlertTypeEnum.EDUCATION) {
          return { education: { not: Prisma.DbNull } }
        }
        return { social_assistance: { not: Prisma.DbNull } }
      })
    }

    return where
  }
}
