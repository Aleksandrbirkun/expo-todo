import { ApiProperty } from '@nestjs/swagger';

export class AppDataResponseDto {
  @ApiProperty({
    description: 'Application message',
    example: 'Hello API'
  })
  message: string;
}