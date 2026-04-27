import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PrismaModule } from './shared/database/prisma.module'
import { ContextModule } from './shared/context/context.module'
import { AuthModule } from './modules/auth/auth.module'
import { DashboardModule } from './modules/dashboard/dashboard.module'
import { ChildrenModule } from './modules/children/children.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    ContextModule,
    AuthModule,
    DashboardModule,
    ChildrenModule,
  ],
  providers: [],
})
export class AppModule {}
