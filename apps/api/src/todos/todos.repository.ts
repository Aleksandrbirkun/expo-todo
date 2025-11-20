import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Todo } from '@prisma/client';

@Injectable()
export class TodosRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return this.prisma.todo.create({
      data,
    });
  }

  async findAll(userId?: string): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      where: userId ? { userId } : undefined,
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string): Promise<Todo | null> {
    return this.prisma.todo.findUnique({
      where: { id },
    });
  }

  async update(id: string, data: Prisma.TodoUpdateInput): Promise<Todo> {
    return this.prisma.todo.update({
      where: { id },
      data,
    });
  }

  async updateByUserIdAndId(
    id: string,
    userId: string,
    data: Prisma.TodoUpdateInput
  ): Promise<Todo | null> {
    // First check if the todo exists and belongs to the user
    const existingTodo = await this.prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTodo) {
      return null;
    }

    return this.prisma.todo.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<Todo> {
    return this.prisma.todo.delete({
      where: { id },
    });
  }

  async deleteByUserIdAndId(id: string, userId: string): Promise<Todo | null> {
    // First check if the todo exists and belongs to the user
    const existingTodo = await this.prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!existingTodo) {
      return null;
    }

    return this.prisma.todo.delete({
      where: { id },
    });
  }

  async findByUserId(userId: string): Promise<Todo[]> {
    return this.prisma.todo.findMany({
      where: { userId },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findByUserIdAndId(id: string, userId: string): Promise<Todo | null> {
    return this.prisma.todo.findFirst({
      where: {
        id,
        userId,
      },
    });
  }
}