import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Listing } from './listing.entity.js';
import { ListingsService } from './listings.service.js';
import { ListingsController } from './listings.controller.js';

// Module = groups everything belonging to the "Listings" feature together,
// and tells NestJS how these pieces are wired to each other.
@Module({
  // TypeOrmModule.forFeature([Listing]) gives this module access to a
  // Repository for the Listing entity (used inside ListingsService).
  imports: [TypeOrmModule.forFeature([Listing])],
  // The Service(s) this module provides — NestJS creates these and can
  // inject them wherever needed (Dependency Injection).
  providers: [ListingsService],
  // The Controller(s) that belong to this feature.
  controllers: [ListingsController],
})
export class ListingsModule {}
