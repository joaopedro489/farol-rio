import { Controller, Param, Patch, UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from '@/shared/guards/jwt-auth.guard'

import { ChildrenSettingsRoutes } from '../../../settings/routes'
import { ReviewChildService } from '@/modules/children/services/review-child/review-child.service'

@Controller(ChildrenSettingsRoutes.REVIEW)
@UseGuards(JwtAuthGuard)
export class ReviewChildController {
  constructor(private readonly reviewChildService: ReviewChildService) {}

  @Patch()
  handle(@Param('id') id: string) {
    return this.reviewChildService.review({ id })
  }
}
