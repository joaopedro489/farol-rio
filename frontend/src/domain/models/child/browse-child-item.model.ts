import { calculateAgeLabel } from '@/utils/calculate-age'

export interface BrowseChildItemConstructor {
  id: string
  name: string
  birthday: Date
  neighborhood: string
  isHealthWithAlert: boolean | null
  isEducationWithAlert: boolean | null
  isAssistanceWithAlert: boolean | null
  status: boolean
}

export class BrowseChildItem {
  id: string
  name: string
  birthday: Date
  neighborhood: string
  isHealthWithAlert: boolean | null
  isEducationWithAlert: boolean | null
  isAssistanceWithAlert: boolean | null
  status: boolean

  constructor({
    id,
    name,
    birthday,
    neighborhood,
    isHealthWithAlert,
    isEducationWithAlert,
    isAssistanceWithAlert,
    status
  }: {
    id: string
    name: string
    birthday: Date
    neighborhood: string
    isHealthWithAlert: boolean | null
    isEducationWithAlert: boolean | null
    isAssistanceWithAlert: boolean | null
    status: boolean
  }) {
    this.id = id
    this.name = name
    this.birthday = birthday
    this.neighborhood = neighborhood
    this.isHealthWithAlert = isHealthWithAlert
    this.isEducationWithAlert = isEducationWithAlert
    this.isAssistanceWithAlert = isAssistanceWithAlert
    this.status = status
  }

  get age(): string {
    return calculateAgeLabel(this.birthday)
  }
}
