import { Body, Controller, Inject, Post } from '@nestjs/common'

import { LoginPayload } from '../payload/login.payload'
import { AuthSettingsRoutes } from '@/modules/auth/settings/routes'
import { LoginService } from '@/modules/auth/services/login.service'

@Controller(AuthSettingsRoutes.LOGIN)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  handle(@Body() payload: LoginPayload) {
    return this.loginService.login(payload)
  }
}
