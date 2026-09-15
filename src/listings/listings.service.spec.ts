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

  it('create should save and return a new listing',async()=>{
    // Fake Input data 
    const fakeDto = { title: 'Test Phone', description: 'Test Description', price: 5000, imageUrl:'./x.jpg' };
   
    // what repository.create() would build in memory (usually just the same data, maybe with a fake id added)
    const fakeBuiltListing = { ...fakeDto };
  

    // 3. what repository.save() would return after "saving" (often the same object, now with an id)
    const fakeSavedListing = { id: 1, ...fakeDto };

    //setup Mock repo
    const mockRepository = {
    create: vi.fn().mockReturnValue(fakeBuiltListing),
    save: vi.fn().mockResolvedValue(fakeSavedListing),
};
    const module= await Test.createTestingModule({
      providers: [
        ListingsService,
        {
          provide: getRepositoryToken(Listing),
          useValue: mockRepository,
        }
      ]
    }).compile();
    const service= module.get(ListingsService);

    const result= await service.create(fakeBuiltListing);
        
    expect(result).toEqual(fakeSavedListing);
        expect(mockRepository.create).toHaveBeenCalledWith(fakeBuiltListing);

    
  })
});
