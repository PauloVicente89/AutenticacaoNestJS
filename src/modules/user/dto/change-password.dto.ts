import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ required: true, example: 'suaAntigaSenha' })
  @IsNotEmpty()
  old_password: string;

  @ApiProperty({ required: true, example: '123naoÉsenha' })
  @IsNotEmpty()
  @MinLength(6)
  new_password: string;

  @ApiProperty()
  @IsOptional()
  hash_password: string | null;
}
