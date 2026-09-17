import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ListingsModule } from './listings/listings.module.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';

// The root Module — every feature Module gets registered here.
@Module({
  imports: [
    // Sets up the actual database connection.
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jennifergunjan',
      password: '',
      database: 'reuse_db',
      // Automatically finds and registers every @Entity() we create.
      autoLoadEntities: true,
      // Auto-creates/updates database tables to match our Entities.
      // Convenient for learning — turn this OFF before real deployment,
      // since it can unexpectedly alter/drop data in production.
      synchronize: true,
    }),
    ListingsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
