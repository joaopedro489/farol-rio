import { Prisma } from 'src/generated/prisma/client'
import {
  Child,
  ChildEducation,
  ChildHealth,
  ChildSocialAssistance,
} from '../../domain/entities/child.entity'
import { BrowseChildrenOutput } from '../../domain/outputs/browse-children.output'
import { ChildrenOutput } from '../../domain/outputs/children.output'

type ChildModelConstructor = {
  id: string
  name: string
  birthday: Date
  neighborhood: string
  responsible: string
  health: Prisma.JsonValue
  education: Prisma.JsonValue
  social_assistance: Prisma.JsonValue
  reviewed: boolean
  reviewed_at: Date | null
  reviewed_by: { id: number; email: string } | null
}

export class ChildModel {
  static toEntity(prisma: ChildModelConstructor): Child {
    return new Child({
      id: prisma.id,
      name: prisma.name,
      birthday: prisma.birthday,
      neighborhood: prisma.neighborhood,
      responsible: prisma.responsible,
      health: prisma.health as ChildHealth | null,
      education: prisma.education as ChildEducation | null,
      socialAssistance:
        prisma.social_assistance as ChildSocialAssistance | null,
      reviewed: prisma.reviewed,
      reviewedBy: prisma.reviewed_by
        ? { id: prisma.reviewed_by.id, email: prisma.reviewed_by.email }
        : null,
      reviewedAt: prisma.reviewed_at,
    })
  }

  static toArray(prisma: ChildModelConstructor[]): Child[] {
    return prisma.map((item) => ChildModel.toEntity(item))
  }

  static toChildrenOutput({
    children,
    total,
    offset,
    limit,
  }: {
    children: Child[]
    total: number
    offset: number
    limit: number
  }): BrowseChildrenOutput {
    const items = children.map(
      (child) =>
        new ChildrenOutput({
          id: child.id,
          name: child.name,
          birthday: child.birthday,
          neighborhood: child.neighborhood,
          isHealthWithAlert: (child.health?.alerts.length ?? 0) > 0,
          isEducationWithAlert: (child.education?.alerts.length ?? 0) > 0,
          isAssistanceWithAlert:
            (child.socialAssistance?.alerts.length ?? 0) > 0,
          status: child.reviewed,
        }),
    )

    return new BrowseChildrenOutput({ items, total, offset, limit })
  }
}
