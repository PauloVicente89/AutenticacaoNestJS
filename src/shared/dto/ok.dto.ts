import { ApiProperty } from '@nestjs/swagger';

export class OKResponse {
  @ApiProperty({
    example: 'Successfuly',
  })
  message: string;

  @ApiProperty({ example: 200 })
  statusCode: number;
}
