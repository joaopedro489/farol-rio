type UserContextConstructor = { id: number; email: string }

export class UserContext {
  private _id: number
  private _email: string

  constructor({ id, email }: UserContextConstructor) {
    this._id = id
    this._email = email
  }

  get id(): number {
    return this._id
  }

  get email(): string {
    return this._email
  }
}
