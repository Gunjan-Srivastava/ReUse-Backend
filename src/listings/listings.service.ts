import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Listing } from './listing.entity.js';
import { CreateListingDto } from './create-listing.dto.js';
import { UpdateListingDto } from './update-listing.dto.js';
//import { NotFoundException } from '@nestjs/common';

// @Injectable() marks this class as a Service NestJS can create once and
// hand out anywhere it's needed (Dependency Injection).
@Injectable()
export class ListingsService {
  constructor(
    // A Repository is TypeORM's ready-made toolbox of database methods
    // (find, create, save, update, delete) specifically for the Listing table.
    @InjectRepository(Listing)
    private listingsRepository: Repository<Listing>,
  ) {}

  // Get every row from the listing table.
  findAll() {
    return this.listingsRepository.find();
  
  }

  // Get a row from the Listing Table
  async findOne(id: number) {
      const listing =await this.listingsRepository.findOneBy({ id });
      if (listing==null){
        throw new NotFoundException(`Listing with id ${id} not found`);
      }else 
        return listing;
      
  }

  // Create a new listing.
  // .create() just builds the object in memory (not saved yet).
  // .save() actually writes it into the database.
  create(createListingDto: CreateListingDto) {
    const listing = this.listingsRepository.create(createListingDto);
    return this.listingsRepository.save(listing);
  }

  // Update an existing listing by id.
  // "async"/"await" because we must wait for the database write to
  // actually finish before fetching the fresh, updated row back —
  // otherwise we might read stale data.
  async update(id: number, updateListingDto: UpdateListingDto) {
    await this.listingsRepository.update(id, updateListingDto);
    return this.listingsRepository.findOneBy({ id });
  }

  // Delete a listing by id. Returns { affected: 1 } if something was
  // actually deleted, or { affected: 0 } if that id didn't exist.
  remove(id: number) {
    return this.listingsRepository.delete(id);
  }
}
