import { ApiProperty } from '@nestjs/swagger';

export class TodoResponseDto {
  @ApiProperty({
    description: 'Todo ID',
    example: '550e8400-e29b-41d4-a716-446655440000'
  })
  id: string;

  @ApiProperty({
    description: 'The title of the todo',
    example: 'Buy groceries'
  })
  title: string;

  @ApiProperty({
    description: 'Description of the todo',
    example: 'Buy milk, eggs, and bread',
    required: false
  })
  description?: string;

  @ApiProperty({
    description: 'Whether the todo is completed',
    example: false
  })
  completed: boolean;

  @ApiProperty({
    description: 'User ID who owns this todo',
    example: '550e8400-e29b-41d4-a716-446655440001'
  })
  user_id: string;

  @ApiProperty({
    description: 'When the todo was created',
    example: '2024-01-01T00:00:00.000Z'
  })
  created_at: string;

  @ApiProperty({
    description: 'When the todo was last updated',
    example: '2024-01-01T00:00:00.000Z'
  })
  updated_at: string;
}

export class TodoWithProfileResponseDto extends TodoResponseDto {
  @ApiProperty({
    description: 'Profile information of the todo owner',
    type: 'object',
    properties: {
      email: {
        type: 'string',
        example: 'user@example.com'
      }
    }
  })
  profiles: {
    email: string;
  };
}

export class DeleteTodoResponseDto {
  @ApiProperty({
    description: 'Success message',
    example: 'Todo deleted successfully'
  })
  message: string;
}