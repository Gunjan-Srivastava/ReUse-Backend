import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './listing.entity.js';
import { CreateListingDto } from './create-listing.dto.js';
import { UpdateListingDto } from './update-listing.dto.js';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
  ) {}

  findAll() {
    return this.listingsRepository.find();
  }

  create(createListingDto: CreateListingDto) {
    const listing = this.listingsRepository.create(createListingDto);
    return this.listingsRepository.save(listing);
  }

  async update(id: number, updateListingDto: UpdateListingDto) {
    await this.listingsRepository.update(id, updateListingDto);
    return this.listingsRepository.findOneBy({ id });
  }

  remove(id: number) {
    return this.listingsRepository.delete(id);
  }
}
