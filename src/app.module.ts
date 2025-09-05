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
      // host: process.env.DB_HOST || 'localhost',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT) || 3306,
      username: process.env.DB_USER || 'root',
      password: process.env.DB_PASS || '',
      database: process.env.DB_NAME || 'employee_db',
      // entities: [User, Client, Project],
      autoLoadEntities: true,   // no need to list entities manually
        synchronize: true,
        retryAttempts: 10,        // keep retrying
        retryDelay: 5000, 
        ssl: { rejectUnauthorized: false }, 
    }),
    UsersModule,
    ClientModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
