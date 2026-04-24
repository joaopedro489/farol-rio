import { AlertEnum } from '../types/enum/alert.enum'

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

export type ChildReviewedBy = {
  id: number
  email: string
}

type ChildConstructor = {
  id: string
  birthday: Date
  name: string
  neighborhood: string
  responsible: string
  health: ChildHealth | null
  education: ChildEducation | null
  socialAssistance: ChildSocialAssistance | null
  reviewed: boolean
  reviewedBy: ChildReviewedBy | null
  reviewedAt: Date | null
}

export class Child {
  public readonly id: string
  public readonly birthday: Date
  public readonly name: string
  public readonly neighborhood: string
  public readonly responsible: string
  public readonly health: ChildHealth | null
  public readonly education: ChildEducation | null
  public readonly socialAssistance: ChildSocialAssistance | null

  private _reviewed: boolean
  private _reviewedBy: ChildReviewedBy | null
  private _reviewedAt: Date | null

  constructor(params: ChildConstructor) {
    this.id = params.id
    this.birthday = params.birthday
    this.name = params.name
    this.neighborhood = params.neighborhood
    this.responsible = params.responsible
    this.health = params.health
    this.education = params.education
    this.socialAssistance = params.socialAssistance
    this._reviewed = params.reviewed
    this._reviewedBy = params.reviewedBy
    this._reviewedAt = params.reviewedAt
  }

  get reviewed(): boolean {
    return this._reviewed
  }

  get reviewedBy(): ChildReviewedBy | null {
    return this._reviewedBy
  }

  get reviewedAt(): Date | null {
    return this._reviewedAt
  }

  markAsReviewed(user: ChildReviewedBy): boolean {
    if (this._reviewed) return false

    this._reviewed = true
    this._reviewedBy = { id: user.id, email: user.email }
    this._reviewedAt = new Date()
    return true
  }
}
