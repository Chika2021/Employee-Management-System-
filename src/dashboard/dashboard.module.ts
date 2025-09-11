import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { Client } from '../client/entities/client.entity';
import { Project } from '../project/entities/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Project])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
