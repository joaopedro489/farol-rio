import {
  Child,
  ChildEducation,
  ChildHealth,
  ChildSocialAssistance,
} from '../entities/child.entity'

type ChildOutputConstructor = {
  id: string
  name: string
  birthday: Date
  neighborhood: string
  responsible: string
  isReviewed: boolean
  reviewedByEmail: string | null
  health: ChildHealth | null
  education: ChildEducation | null
  socialAssistance: ChildSocialAssistance | null
}

export class ChildOutput {
  id: string
  name: string
  birthday: Date
  neighborhood: string
  responsible: string
  isReviewed: boolean
  reviewedByEmail: string | null
  health: ChildHealth | null
  education: ChildEducation | null
  socialAssistance: ChildSocialAssistance | null

  constructor(params: ChildOutputConstructor) {
    this.id = params.id
    this.name = params.name
    this.birthday = params.birthday
    this.neighborhood = params.neighborhood
    this.responsible = params.responsible
    this.isReviewed = params.isReviewed
    this.reviewedByEmail = params.reviewedByEmail
    this.health = params.health
    this.education = params.education
    this.socialAssistance = params.socialAssistance
  }

  static fromEntity(child: Child): ChildOutput {
    return new ChildOutput({
      id: child.id,
      name: child.name,
      birthday: child.birthday,
      neighborhood: child.neighborhood,
      responsible: child.responsible,
      isReviewed: child.reviewed,
      reviewedByEmail: child.reviewedBy?.email ?? null,
      health: child.health,
      education: child.education,
      socialAssistance: child.socialAssistance,
    })
  }
}
