import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ListingsService } from './listings.service.js';
import { CreateListingDto } from './create-listing.dto.js';
import { UpdateListingDto } from './update-listing.dto.js';
//import { NotFoundException } from '@nestjs/common';

// @Controller('listings') means every route here starts with /listings
@Controller('listings')
export class ListingsController {
  // NestJS automatically hands us a ready-made ListingsService instance
  // (Dependency Injection) — we never create it ourselves.
  constructor(private listingsService: ListingsService) {}

  // GET /listings — fetch every listing
  @Get()
  findAll() {
    return this.listingsService.findAll();
  }
  // GET /Listings - fetch one row
  @Get(':id')
  findOne(@Param('id') id: string){
    return this.listingsService.findOne(+id)
  }

  // POST /listings — create a new listing
  // @Body() pulls the incoming JSON, validated against CreateListingDto
  @Post()
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }

  // PUT /listings/:id — update one existing listing
  // @Param('id') pulls the id straight out of the URL (always arrives as
  // text, hence the "+id" conversion to a number below)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(+id, updateListingDto);
  }

  // DELETE /listings/:id — remove one listing
  // No DTO needed here — deleting only requires knowing WHICH id, no body data
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.listingsService.remove(+id);
  }
}
