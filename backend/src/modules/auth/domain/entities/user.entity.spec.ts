import { User } from './user.entity'

describe('User', () => {
  let sut: User

  beforeEach(() => {
    sut = new User({ id: 1, email: 'Test@Example.COM' })
  })

  it('should be created and lowercase email', () => {
    expect(sut.id).toBe(1)
    expect(sut.email).toBe('test@example.com')
  })

  it('should return false when validating password without hash and salt', async () => {
    const result = await sut.validatePassword('anypassword')

    expect(result).toBe(false)
  })

  it('should set password and populate hash and salt', async () => {
    await sut.setPassword('mySecurePass123')

    expect(sut.hash).toBeTruthy()
    expect(sut.salt).toBeTruthy()
  })

  it('should validate correct password after setPassword', async () => {
    await sut.setPassword('correctPassword')

    const result = await sut.validatePassword('correctPassword')

    expect(result).toBe(true)
  })

  it('should return false for wrong password', async () => {
    await sut.setPassword('correctPassword')

    const result = await sut.validatePassword('wrongPassword')

    expect(result).toBe(false)
  })
})
