import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  MinLength,
} from 'class-validator';

export class CreateUserDto
  implements
    Omit<
      User,
      | 'id'
      | 'created_at'
      | 'updated_at'
      | 'hash_password'
      | 'deleted_at'
    >
{
  @Type(() => Date)
  @IsOptional()
  deleted_at?: Date | null;

  @ApiProperty({ required: true, example: '77999436073' })
  @IsNotEmpty({ message: 'Campo celular é obrigatório' })
  cellphone: string;

  @ApiProperty({ required: true, example: 'João da Silva Ribeiro' })
  @IsNotEmpty({ message: 'Campo nome é obrigatório' })
  name: string;

  @ApiProperty({ required: true, example: 'joao_silva@hotmail.com' })
  @IsEmail()
  @IsNotEmpty({ message: 'Campo email é obrigatório' })
  email: string;

  @ApiProperty({ required: true, example: '123naoÉsenha' })
  @IsNotEmpty({ message: 'Campo senha é obrigatório' })
  @MinLength(6)
  password: string;

  @ApiProperty({ required: true, example: 1 })
  @IsNotEmpty({ message: 'Campo Ativo é obrigatório' })
  @Type(() => Number)
  @IsInt({ message: 'Informe um valor válido para Ativo' })
  active: number;

  @ApiProperty({ required: true, example: '0 | 1 | 2' })
  @IsNotEmpty({ message: 'Campo perfil é obrigatório' })
  @Type(() => Number)
  @IsInt({ message: 'Informe um valor válido para Ativo' })
  role: number;

}
