import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Client } from './entities/client.entity';
import { ProjectModule } from '../project/project.module';
import { ProjectService } from '../project/project.service';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/model/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([Client, Project, User]), ProjectModule],
  controllers: [ClientController],
  providers: [ClientService, ProjectService],
})
export class ClientModule {}
