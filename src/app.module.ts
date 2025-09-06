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
    // TypeOrmModule.forRoot({
    //   type: 'postgres',
    //   // host: process.env.DB_HOST || 'localhost',
    //   host: process.env.DB_HOST,
    //   port: Number(process.env.DB_PORT) || 5432,
    //   username: process.env.DB_USER || 'postgres',
    //   password: process.env.DB_PASS || 'chika',
    //   database: process.env.DATABASE_URL || 'rwork',
    //   // entities: [User, Client, Project],
    //   autoLoadEntities: true,   // no need to list entities manually
    //     synchronize: true,
    //     retryAttempts: 10,        // keep retrying
    //     retryDelay: 5000, 
    //     ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    // }),

    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,  // Use the full connection string
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 10,
      retryDelay: 5000,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    }),

    UsersModule,
    ClientModule,
    ProjectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
