import { Body, Controller, Inject, Post } from '@nestjs/common'

import { LoginPayload } from '../payload/login.payload'
import { AuthSettingsRoutes } from 'src/modules/auth/settings/routes'
import { LoginService } from 'src/modules/auth/services/login.service'

@Controller(AuthSettingsRoutes.LOGIN)
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  handle(@Body() payload: LoginPayload) {
    return this.loginService.login(payload)
  }
}
