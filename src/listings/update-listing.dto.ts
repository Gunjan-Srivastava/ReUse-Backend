import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

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
