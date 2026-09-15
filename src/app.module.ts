import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ListingsModule } from './listings/listings.module.js';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'jennifergunjan',
      password: '',
      database: 'reuse_db',
      autoLoadEntities: true,
      synchronize: true,

    }),
    ListingsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
  

})
export class AppModule {}
