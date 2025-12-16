import { IsDefined, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePartDto {
  @IsDefined()
  @IsNumber()
  cat_id: number;

  @IsNumber()
  supplier_id: number;

  @IsNotEmpty()
  @IsString()
  code: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsDefined()
  @IsNumber()
  price: number;
}
