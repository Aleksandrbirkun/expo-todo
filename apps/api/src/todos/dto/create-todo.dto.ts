import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTodoDto {
  @ApiProperty({ description: 'The title of the todo', example: 'Buy groceries' })
  title: string;

  @ApiPropertyOptional({ description: 'Optional description of the todo', example: 'Buy milk, eggs, and bread' })
  description?: string;

  @ApiPropertyOptional({ description: 'Whether the todo is completed', default: false })
  completed?: boolean;
}