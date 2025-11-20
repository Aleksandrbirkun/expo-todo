import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoResponseDto, TodoWithProfileResponseDto, DeleteTodoResponseDto } from './dto/todo-response.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
@UseGuards(JwtAuthGuard)
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post()
  @ApiOperation({ 
    summary: 'Create a new todo',
    operationId: 'todosCreate'
  })
  @ApiResponse({ status: 201, description: 'Todo created successfully', type: TodoResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(@Body() createTodoDto: CreateTodoDto, @Request() req) {
    return this.todosService.create(createTodoDto, req.user.userId);
  }

  @Get()
  @ApiOperation({ 
    summary: 'Get all todos for the current user',
    operationId: 'todosFindAll'
  })
  @ApiResponse({ status: 200, description: 'Todos retrieved successfully', type: [TodoResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll(@Request() req) {
    return this.todosService.findAll(req.user.userId);
  }

  @Get('admin/all')
  @UseGuards(RolesGuard)
  @Roles('admin')
  @ApiOperation({ 
    summary: 'Get all todos (admin only)',
    operationId: 'todosFindAllForAdmin'
  })
  @ApiResponse({ status: 200, description: 'All todos retrieved successfully', type: [TodoWithProfileResponseDto] })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  findAllForAdmin() {
    return this.todosService.findAllForAdmin();
  }

  @Get(':id')
  @ApiOperation({ 
    summary: 'Get a specific todo by ID',
    operationId: 'todosFindOne'
  })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ status: 200, description: 'Todo retrieved successfully', type: TodoWithProfileResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  findOne(@Param('id') id: string, @Request() req) {
    const isAdmin = req.user.role === 'admin';
    return this.todosService.findOne(id, req.user.userId, isAdmin);
  }

  @Patch(':id')
  @ApiOperation({ 
    summary: 'Update a todo',
    operationId: 'todosUpdate'
  })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ status: 200, description: 'Todo updated successfully', type: TodoResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Request() req) {
    const isAdmin = req.user.role === 'admin';
    return this.todosService.update(id, updateTodoDto, req.user.userId, isAdmin);
  }

  @Delete(':id')
  @ApiOperation({ 
    summary: 'Delete a todo',
    operationId: 'todosRemove'
  })
  @ApiParam({ name: 'id', description: 'Todo ID' })
  @ApiResponse({ status: 200, description: 'Todo deleted successfully', type: DeleteTodoResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  remove(@Param('id') id: string, @Request() req) {
    const isAdmin = req.user.role === 'admin';
    return this.todosService.remove(id, req.user.userId, isAdmin);
  }
}