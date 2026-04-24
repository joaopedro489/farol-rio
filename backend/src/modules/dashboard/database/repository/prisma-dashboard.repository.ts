import { Injectable } from '@nestjs/common'

import { Prisma } from '@/generated/prisma/client'
import { PrismaService } from '@/shared/database/prisma.service'

import { AlertsByNeighborhoodOutput } from '../../domain/outputs/alerts-by-neighborhood.output'
import { AlertsBySeverityOutput } from '../../domain/outputs/alerts-by-severity.output'
import { AlertsByTypeOutput } from '../../domain/outputs/alerts-by-type.output'
import { SummaryOutput } from '../../domain/outputs/summary.output'
import { AlertsByNeighborhoodModel } from '../models/alerts-by-neighborhood.model'
import { AlertsBySeverityModel } from '../models/alerts-by-severity.model'
import { AlertsByTypeModel } from '../models/alerts-by-type.model'
import { SummaryModel } from '../models/summary.model'

import { DashboardRepository } from './dashboard.repository'

@Injectable()
export class PrismaDashboardRepository implements DashboardRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getSummary(): Promise<SummaryOutput> {
    const [total, reviewed] = await Promise.all([
      this.prisma.child.count(),
      this.prisma.child.count({ where: { reviewed: true } }),
    ])

    return SummaryModel.toOutput({ total, reviewed })
  }

  async getAlertsByType(): Promise<AlertsByTypeOutput> {
    const [health, education, socialAssistance] = await Promise.all([
      this.prisma.child.count({
        where: { health: { not: Prisma.DbNull } },
      }),
      this.prisma.child.count({
        where: { education: { not: Prisma.DbNull } },
      }),
      this.prisma.child.count({
        where: { social_assistance: { not: Prisma.DbNull } },
      }),
    ])

    return AlertsByTypeModel.toOutput({ health, education, socialAssistance })
  }

  async getAlertsBySeverity(): Promise<AlertsBySeverityOutput> {
    const children = await this.prisma.child.findMany({
      select: {
        health: true,
        education: true,
        social_assistance: true,
      },
    })

    return AlertsBySeverityModel.toOutput(children)
  }

  async getAlertsByNeighborhood(): Promise<AlertsByNeighborhoodOutput[]> {
    const rows = await this.prisma.child.groupBy({
      by: ['neighborhood'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    })

    return AlertsByNeighborhoodModel.toOutput(rows)
  }
}
