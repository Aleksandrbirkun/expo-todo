import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTodoDto {
  @ApiPropertyOptional({ description: 'The title of the todo', example: 'Buy groceries' })
  title?: string;

  @ApiPropertyOptional({ description: 'Description of the todo', example: 'Buy milk, eggs, and bread' })
  description?: string;

  @ApiPropertyOptional({ description: 'Whether the todo is completed' })
  completed?: boolean;
}