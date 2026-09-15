import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

// DTO = Data Transfer Object.
// This is the "checklist" of what a client is allowed to send when
// creating a new listing. Enforced automatically by the global
// ValidationPipe set up in main.ts.
export class CreateListingDto {
  // Required: must be present, and must be text.
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  // Required: must be present, and must be a real number (not text).
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsString()
  imageUrl: string;

  // Optional: the client doesn't have to send this field at all.
  // The "?" marks it optional at the TypeScript level too.
  @IsOptional()
  @IsString()
  category?: string;
}
