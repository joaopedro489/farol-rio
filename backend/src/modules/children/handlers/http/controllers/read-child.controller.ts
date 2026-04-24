import { Controller, Get, Param, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard'

import { ReadChildService } from '../../../services/read-child/read-child.service'
import { ChildrenSettingsRoutes } from '../../../settings/routes'

@Controller(ChildrenSettingsRoutes.READ)
@UseGuards(JwtAuthGuard)
export class ReadChildController {
  constructor(private readonly readChildService: ReadChildService) {}

  @Get()
  handle(@Param('id') id: string) {
    return this.readChildService.read({ id })
  }
}
