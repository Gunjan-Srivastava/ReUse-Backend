import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// DTO for updating an existing listing.
// Every field here is optional to SEND (client might only want to change
// one field, e.g. just the price) — but if a field IS sent, it must still
// pass its other rules (can't be sent as blank/invalid). That's why every
// field pairs @IsOptional() with its normal validation decorators.
export class UpdateListingDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;

  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  imageUrl?: string;

  @IsOptional()
  @IsString()
  category?: string;
}
