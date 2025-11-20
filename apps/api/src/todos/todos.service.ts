import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { TodosRepository } from './todos.repository';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(private readonly todosRepository: TodosRepository) {}

  async create(createTodoDto: CreateTodoDto, userId: string) {
    try {
      const todo = await this.todosRepository.create({
        ...createTodoDto,
        userId,
        completed: createTodoDto.completed || false,
      });

      return todo;
    } catch (error) {
      throw new Error(`Failed to create todo: ${error.message}`);
    }
  }

  async findAll(userId: string) {
    try {
      return await this.todosRepository.findByUserId(userId);
    } catch (error) {
      throw new Error(`Failed to fetch todos: ${error.message}`);
    }
  }

  async findAllForAdmin() {
    try {
      // For now, we'll return all todos without joining profiles
      // Since Prisma schema doesn't have a Profile model yet
      // You can add Profile model later and create a relation
      return await this.todosRepository.findAll();
    } catch (error) {
      throw new Error(`Failed to fetch all todos: ${error.message}`);
    }
  }

  async findOne(id: string, userId: string, isAdmin = false) {
    let todo;

    if (isAdmin) {
      todo = await this.todosRepository.findOne(id);
    } else {
      todo = await this.todosRepository.findByUserIdAndId(id, userId);
    }

    if (!todo) {
      throw new NotFoundException('Todo not found');
    }

    if (!isAdmin && todo.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return todo;
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, userId: string, isAdmin = false) {
    let updatedTodo;

    if (isAdmin) {
      updatedTodo = await this.todosRepository.update(id, updateTodoDto);
    } else {
      updatedTodo = await this.todosRepository.updateByUserIdAndId(id, userId, updateTodoDto);
    }

    if (!updatedTodo) {
      throw new NotFoundException('Todo not found or access denied');
    }

    return updatedTodo;
  }

  async remove(id: string, userId: string, isAdmin = false) {
    let deletedTodo;

    if (isAdmin) {
      deletedTodo = await this.todosRepository.delete(id);
    } else {
      deletedTodo = await this.todosRepository.deleteByUserIdAndId(id, userId);
    }

    if (!deletedTodo) {
      throw new NotFoundException('Todo not found or access denied');
    }

    return { message: 'Todo deleted successfully' };
  }
}