import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';

export class FilterUserDto {
  @ApiProperty({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  page?: number;

  @ApiProperty({ example: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  per_page?: number;

  @ApiProperty({ example: 'John' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'john@test.com' })
  @IsOptional()
  email?: string;

  @ApiProperty({ example: '77999436073' })
  @IsOptional()
  cellphone?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  active?: number;
}
