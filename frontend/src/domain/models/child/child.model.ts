import { AlertEnum } from '@/domain/enums/alert.enum'
import { calculateAgeLabel } from '@/utils/calculate-age'

export type ChildHealth = {
  vaccinesUpToDate: boolean
  lastMedicalAppointment: Date
  alerts: AlertEnum[]
}

export type ChildEducation = {
  school: string
  frequency: number
  alerts: AlertEnum[]
}

export type ChildSocialAssistance = {
  cad: boolean
  benefit: boolean
  alerts: AlertEnum[]
}

export interface ChildModelConstructor {
  id: string
  name: string
  birthday: Date
  neighborhood: string
  responsible: string
  isReviewed: boolean
  reviewedByEmail: string | null
  reviewedAt: Date | null
  health: ChildHealth | null
  education: ChildEducation | null
  socialAssistance: ChildSocialAssistance | null
}

export class ChildModel {
  public readonly id: string
  public readonly name: string
  public readonly birthday: Date
  public readonly neighborhood: string
  public readonly responsible: string
  public readonly isReviewed: boolean
  public readonly reviewedByEmail: string | null
  public readonly reviewedAt: Date | null
  public readonly health: ChildHealth | null
  public readonly education: ChildEducation | null
  public readonly socialAssistance: ChildSocialAssistance | null

  constructor(props: ChildModelConstructor) {
    this.id = props?.id
    this.name = props?.name
    this.birthday = props?.birthday
    this.neighborhood = props?.neighborhood
    this.responsible = props?.responsible
    this.isReviewed = props?.isReviewed
    this.reviewedByEmail = props?.reviewedByEmail
    this.reviewedAt = props?.reviewedAt ? new Date(props?.reviewedAt) : null
    this.health = props?.health
    this.education = props?.education
    this.socialAssistance = props?.socialAssistance
  }

  get age(): string {
    return calculateAgeLabel(this.birthday)
  }

  get initials(): string {
    const names = this.name.split(' ')
    const initials = names.map((name) => name.charAt(0)).join('')
    return initials.toUpperCase().substring(0, 2)
  }
}
