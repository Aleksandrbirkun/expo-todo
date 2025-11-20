import { ApiProperty } from '@nestjs/swagger';

export class LoginResponseDto {
  @ApiProperty({
    description: 'JWT access token',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'
  })
  access_token: string;
}

export class RegisterResponseDto {
  @ApiProperty({
    description: 'User ID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'User role',
    example: 'user'
  })
  role: string;
}

export class LogoutResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Logout successful'
  })
  message: string;
}