import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { LoginController } from './handlers/http/controllers/login.controller'
import { JwtStrategy } from './handlers/http/strategies/jwt-strategy'
import { AuthTokens } from './constants/tokens'
import { LoginService } from './services/login.service'
import { JwtNestHandler } from './adapters/jwt-handlers'
import { PrismaUserRepository } from './database/repository/prisma-user.repository'

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: Number(process.env.JWT_EXPIRES_IN) },
      }),
    }),
  ],
  controllers: [LoginController],
  providers: [
    JwtStrategy,
    LoginService,
    {
      provide: AuthTokens.UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: AuthTokens.JwtHandler,
      useClass: JwtNestHandler,
    },
  ],
})
export class AuthModule {}
