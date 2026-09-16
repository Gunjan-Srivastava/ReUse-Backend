import { describe, it, expect, vi } from 'vitest';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ListingsService } from './listings.service.js';
import { Listing } from './listing.entity.js';

describe('ListingsService', () => {
  it('findAll should return whatever the repository returns', async () => {
    const fakeListings = [
      { id: 1, title: 'Test Phone', price: 5000 },
    ];

    const mockRepository = {
      find: vi.fn().mockResolvedValue(fakeListings),
    };

    const module = await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: getRepositoryToken(Listing),
          useValue: mockRepository,
        },
      ],
    }).compile();

    const service = module.get(ListingsService);

    const result = await service.findAll();

    expect(result).toEqual(fakeListings);
    expect(mockRepository.find).toHaveBeenCalled();
  });

  it('create should save and return a new listing', async () => {
    const fakeDto = { title: 'Test Phone', description: 'Test Description', price: 5000, imageUrl: './x.jpg' };
    const fakeBuiltListing = { ...fakeDto };
    const fakeSavedListing = { id: 1, ...fakeDto };

    const mockRepository = {
      create: vi.fn().mockReturnValue(fakeBuiltListing),
      save: vi.fn().mockResolvedValue(fakeSavedListing),
    };
    const module = await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: getRepositoryToken(Listing),
          useValue: mockRepository,
        },
      ],
    }).compile();
    const service = module.get(ListingsService);

    const result = await service.create(fakeBuiltListing);

    expect(result).toEqual(fakeSavedListing);
    expect(mockRepository.create).toHaveBeenCalledWith(fakeBuiltListing);
  });

  it('update should update the listing and return the fresh version', async () => {
    // The fake data the client sends — only the field(s) being changed.
    const fakeUpdateDto = { price: 5000 };

    // The full, already-updated listing the database would hand back.
    const fakeUpdatedListing = {
      id: 1,
      title: 'iPhone 14',
      description: 'Barely used',
      price: 5000,
      imageUrl: 'x.jpg',
      status: 'Available',
    };

    // Two fake functions, matching the two real Repository calls inside
    // ListingsService.update(). Both are async, so both use mockResolvedValue.
    const mockRepository = {
      update: vi.fn().mockResolvedValue({}),
      findOneBy: vi.fn().mockResolvedValue(fakeUpdatedListing),
    };

    const module = await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: getRepositoryToken(Listing),
          useValue: mockRepository,
        },
      ],
    }).compile();
    const service = module.get(ListingsService);

    // Call the Service exactly like the Controller does: update(id, dto).
    const result = await service.update(1, fakeUpdateDto);

    // The Service must return the fresh, fully-updated listing.
    expect(result).toEqual(fakeUpdatedListing);

    // update() must have been called with the correct id AND the correct DTO.
    expect(mockRepository.update).toHaveBeenCalledWith(1, fakeUpdateDto);

    // findOneBy() must have been called looking up the same id.
    expect(mockRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
  });

  it('remove should delete the listing', async() => {

    const fakeDeleteResult = 
      { raw: [], affected:1 };

    
    const mockRepository = {
      delete: vi.fn().mockResolvedValue(fakeDeleteResult),
    };

    const module = await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: getRepositoryToken(Listing),
          useValue: mockRepository,
        },
      ],
    }).compile();

    const service = module.get(ListingsService);

    const result = await service.remove(1);

    expect(result).toEqual(fakeDeleteResult);

    expect(mockRepository.delete).toHaveBeenCalledWith(1);
  });
});