type ChildrenOutputConstructor = {
  id: string
  name: string
  birthday: Date
  neighborhood: string
  isHealthWithAlert: boolean
  isEducationWithAlert: boolean
  isAssistanceWithAlert: boolean
  status: boolean
}

export class ChildrenOutput {
  id: string
  name: string
  birthday: Date
  neighborhood: string
  isHealthWithAlert: boolean
  isEducationWithAlert: boolean
  isAssistanceWithAlert: boolean
  status: boolean

  constructor(params: ChildrenOutputConstructor) {
    this.id = params.id
    this.name = params.name
    this.birthday = params.birthday
    this.neighborhood = params.neighborhood
    this.isHealthWithAlert = params.isHealthWithAlert
    this.isEducationWithAlert = params.isEducationWithAlert
    this.isAssistanceWithAlert = params.isAssistanceWithAlert
    this.status = params.status
  }
}
