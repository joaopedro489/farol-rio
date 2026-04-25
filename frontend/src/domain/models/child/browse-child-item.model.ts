export interface BrowseChildItemConstructor {
  id: string
  name: string
  birthday: Date
  neighborhood: string
  isHealthWithAlert: boolean
  isEducationWithAlert: boolean
  isAssistanceWithAlert: boolean
  status: boolean
}

export class BrowseChildItem {
  id: string
  name: string
  birthday: Date
  neighborhood: string
  isHealthWithAlert: boolean
  isEducationWithAlert: boolean
  isAssistanceWithAlert: boolean
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
    isHealthWithAlert: boolean
    isEducationWithAlert: boolean
    isAssistanceWithAlert: boolean
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
    const today = new Date()
    const birthDate = new Date(this.birthday)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDifference = today.getMonth() - birthDate.getMonth()

    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }

    return `${age} anos e ${monthDifference} meses`
  }
}
