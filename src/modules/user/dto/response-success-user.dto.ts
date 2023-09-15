import { ApiProperty } from '@nestjs/swagger';

export class ResponseSuccessUserDto {
  @ApiProperty({
    example: [
      {
        id: '78b0657b-bea3-48e4-9fa4-676d8f96d885',
        name: 'Juliana Barbosa da Siva',
        email: 'juliana.barbosa@gmail.com',
        cellphone: '77925368963',
        active: 1,
        role: 0,
      },
    ],
  })
  data: {
    id: number;
    name: string;
    email: string;
    active: number;
    role: number;
  };
}
