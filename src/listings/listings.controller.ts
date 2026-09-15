import { Controller, Get, Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Body } from '@nestjs/common';
import { Put } from '@nestjs/common';
import { Delete } from '@nestjs/common';
import { ListingsService } from './listings.service.js';
import { CreateListingDto } from './create-listing.dto.js';
import { UpdateListingDto } from './update-listing.dto.js';




@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) { }

  @Get()
  findAll() {
    return this.listingsService.findAll();
  }
  @Post()
  create(@Body() createListingDto: CreateListingDto) {
    return this.listingsService.create(createListingDto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateListingDto: UpdateListingDto) {
    return this.listingsService.update(+id, updateListingDto);
  }
  @Delete(':id')
async remove(@Param('id') id: string) {
  return this.listingsService.remove(+id);
}
}



