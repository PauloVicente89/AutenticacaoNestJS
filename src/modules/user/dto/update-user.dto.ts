import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Type } from 'class-transformer';
import { IsEmail, IsOptional } from 'class-validator';

export class UpdateUserDto
  implements
    Omit<
      User,
      | 'id'
      | 'created_at'
      | 'updated_at'
      | 'cellphone'
      | 'name'
      | 'cellphone'
      | 'email'
      | 'active'
      | 'role'
      | 'password'
      | 'hash_password'
      | 'deleted_at'
    >
{
  @Type(() => Date)
  @IsOptional()
  deleted_at?: Date | null;

  @ApiProperty({ example: 'e3a8a816-f8a4-11ed-b67e-0242ac120002' })
  @IsOptional()
  id?: string;

  @ApiProperty({ example: '77999436073' })
  @IsOptional()
  cellphone?: string;

  @ApiProperty({ example: 'João da Silva Ribeiro' })
  @IsOptional()
  name?: string;

  @ApiProperty({ example: 'joao_silva@hotmail.com' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({
    example: '2b$10$qWOTyr88bQjw5jhLKXSeFHhrJmHBW0Mlzd5RPRmSlJT4o6Ee',
  })
  @IsOptional()
  hash_password: string | null;

  @ApiProperty({
    example: '$2b$10$qWOTyr88bQjw5jhLK.XS.eFHhrJm./HBW0Mlz/d5RPRmSlJT4o6Ee',
  })
  @IsOptional()
  password?: string;

  @ApiProperty({ example: 1 })
  @IsOptional()
  active?: number;

  @ApiProperty({ example: 1 })
  @IsOptional()
  role?: number;

  @ApiProperty({ example: '1' })
  @IsOptional()
  updated_at?: Date;

  @ApiProperty({ example: '1' })
  @IsOptional()
  created_at?: Date;
}
