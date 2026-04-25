import { AlertEnum } from '@/domain/enums/alert.enum'

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
  reviewedDate: Date | null
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
  public readonly reviewedDate: Date | null
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
    this.reviewedDate = props?.reviewedDate
    this.health = props?.health
    this.education = props?.education
    this.socialAssistance = props?.socialAssistance
  }

  get age(): string {
    const today = new Date()
    const birthDate = new Date(this.birthday)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return `${age} anos e ${monthDifference} meses`
  }

  get initials(): string {
    const names = this.name.split(' ')
    const initials = names.map((name) => name.charAt(0)).join('')
    return initials.toUpperCase().substring(0, 2)
  }
}
