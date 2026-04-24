import { Test, TestingModule } from '@nestjs/testing'

import { AuthTokens } from '../constants/tokens'
import { UserRepository } from '../database/repository/user.repository'
import { JwtHandler } from '../adapters/jwt-handlers'
import { User } from '../domain/entities/user.entity'
import {
  UserNotFoundError,
  WrongPasswordError,
} from '../domain/errors/auth.error'

import { LoginService } from './login.service'

describe('LoginService', () => {
  let sut: LoginService
  let userRepository: UserRepository
  let jwtHandler: JwtHandler

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LoginService,
        {
          provide: AuthTokens.UserRepository,
          useValue: {
            findUserByEmail: vi.fn(),
            findUserContextById: vi.fn(),
          },
        },
        {
          provide: AuthTokens.JwtHandler,
          useValue: {
            generateToken: vi.fn(),
            decode: vi.fn(),
            verifyToken: vi.fn(),
          },
        },
      ],
    }).compile()

    sut = module.get<LoginService>(LoginService)
    userRepository = module.get<UserRepository>(AuthTokens.UserRepository)
    jwtHandler = module.get<JwtHandler>(AuthTokens.JwtHandler)
  })

  it('should throw UserNotFoundError when user does not exist', async () => {
    vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(null)

    const result = sut.login({ email: 'unknown@test.com', password: 'pass' })

    await expect(result).rejects.toThrow(UserNotFoundError)
    expect(jwtHandler.generateToken).not.toHaveBeenCalled()
  })

  it('should throw WrongPasswordError when password is invalid', async () => {
    const userMock = {
      id: 1,
      email: 'user@test.com',
      validatePassword: vi.fn().mockResolvedValueOnce(false),
    }
    vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(
      userMock as unknown as User,
    )

    const result = sut.login({ email: 'user@test.com', password: 'wrong' })

    await expect(result).rejects.toThrow(WrongPasswordError)
    expect(userMock.validatePassword).toHaveBeenCalledWith('wrong')
    expect(jwtHandler.generateToken).not.toHaveBeenCalled()
  })

  it('should return token on successful login', async () => {
    const userMock = {
      id: 42,
      email: 'user@test.com',
      validatePassword: vi.fn().mockResolvedValueOnce(true),
    }
    vi.spyOn(userRepository, 'findUserByEmail').mockResolvedValueOnce(
      userMock as unknown as User,
    )
    vi.spyOn(jwtHandler, 'generateToken').mockReturnValueOnce('jwt-token')

    const result = await sut.login({
      email: 'user@test.com',
      password: 'correct',
    })

    expect(result).toEqual({ token: 'jwt-token' })
    expect(jwtHandler.generateToken).toHaveBeenCalledWith(42, 'user@test.com')
  })
})
