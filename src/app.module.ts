import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/model/user.model';
import { ClientModule } from './client/client.module';
import { ProjectModule } from './project/project.module';
import { Client } from './client/entities/client.entity';
import { Project } from './project/entities/project.entity';


@Module({

  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'employee_db',
  entities: [User, Client, Project],
      synchronize: true,
    }),
    UsersModule,
    ClientModule,
    ProjectModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
