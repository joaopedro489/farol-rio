import { Controller, Get, Query, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard'

import { BrowseChildrenService } from '../../../services/browse-children/browse-children.service'
import { ChildrenSettingsRoutes } from '../../../settings/routes'
import { BrowseChildrenQuery } from '../queries/browse-children.query'

@Controller(ChildrenSettingsRoutes.BROWSE)
@UseGuards(JwtAuthGuard)
export class BrowseChildrenController {
  constructor(private readonly browseChildrenService: BrowseChildrenService) {}

  @Get()
  handle(@Query() query: BrowseChildrenQuery) {
    return this.browseChildrenService.browse(query)
  }
}
