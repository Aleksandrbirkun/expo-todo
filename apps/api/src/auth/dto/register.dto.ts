import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'User email', example: 'user@example.com' })
  email: string;

  @ApiProperty({ description: 'User password', example: 'SecurePassword123!' })
  password: string;

  @ApiPropertyOptional({ description: 'Whether to register as admin', default: false })
  isAdmin?: boolean;
}