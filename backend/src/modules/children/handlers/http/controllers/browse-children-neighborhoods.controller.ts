import { Controller, Get, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard'

import { BrowseChildrenNeighborhoodsService } from '../../../services/browse-children-neighborhoods/browse-children-neighborhoods.service'
import { ChildrenSettingsRoutes } from '../../../settings/routes'

@Controller(ChildrenSettingsRoutes.NEIGHBORHOODS)
@UseGuards(JwtAuthGuard)
export class BrowseChildrenNeighborhoodsController {
  constructor(private readonly service: BrowseChildrenNeighborhoodsService) {}

  @Get()
  handle() {
    return this.service.browse()
  }
}
