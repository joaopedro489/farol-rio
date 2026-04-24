import * as bcrypt from 'bcrypt'

const SALT_ROUNDS = 10

type UserConstructor = {
  id?: number
  email: string
  hash?: string
  salt?: string
}

export class User {
  id: number
  email: string
  private _hash?: string
  private _salt?: string

  constructor(params: UserConstructor) {
    this.id = params.id || -1
    this.email = params.email.toLowerCase()
    this._hash = params.hash
    this._salt = params.salt
  }

  get hash() {
    return this._hash
  }

  get salt() {
    return this._salt
  }

  async validatePassword(password: string): Promise<boolean> {
    if (!this._hash || !this._salt) return false
    const hash = await bcrypt.hash(password, this._salt)
    return hash === this._hash
  }

  async setPassword(password: string) {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hash = await bcrypt.hash(password, salt)
    this._hash = hash
    this._salt = salt
  }
}
