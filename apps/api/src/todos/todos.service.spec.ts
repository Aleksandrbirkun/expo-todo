import { Test, TestingModule } from '@nestjs/testing';
import { TodosService } from './todos.service';
import { TodosRepository } from './todos.repository';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { Todo } from '@prisma/client';

describe('TodosService', () => {
  let service: TodosService;
  let repository: TodosRepository;

  const mockUserId = 'user-123';

  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    userId: mockUserId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTodosRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findByUserId: jest.fn(),
    findByUserIdAndId: jest.fn(),
    update: jest.fn(),
    updateByUserIdAndId: jest.fn(),
    delete: jest.fn(),
    deleteByUserIdAndId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodosService,
        {
          provide: TodosRepository,
          useValue: mockTodosRepository,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
    repository = module.get<TodosRepository>(TodosRepository);

    // Clear all mocks between tests
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'New Description',
        completed: false,
      };

      mockTodosRepository.create.mockResolvedValue(mockTodo);

      const result = await service.create(createTodoDto, mockUserId);

      expect(result).toEqual(mockTodo);
      expect(repository.create).toHaveBeenCalledWith({
        ...createTodoDto,
        userId: mockUserId,
        completed: false,
      });
      expect(repository.create).toHaveBeenCalledTimes(1);
    });

    it('should create a todo with minimal data', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'Minimal Todo',
      };

      const minimalTodo = {
        ...mockTodo,
        title: 'Minimal Todo',
        description: null,
      };

      mockTodosRepository.create.mockResolvedValue(minimalTodo);

      const result = await service.create(createTodoDto, mockUserId);

      expect(result).toEqual(minimalTodo);
      expect(repository.create).toHaveBeenCalledWith({
        ...createTodoDto,
        userId: mockUserId,
        completed: false,
      });
    });

    it('should handle creation errors', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
      };

      mockTodosRepository.create.mockRejectedValue(new Error('Database error'));

      await expect(service.create(createTodoDto, mockUserId)).rejects.toThrow('Failed to create todo: Database error');
      expect(repository.create).toHaveBeenCalledWith({
        ...createTodoDto,
        userId: mockUserId,
        completed: false,
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of todos for user', async () => {
      const todos = [
        mockTodo,
        { ...mockTodo, id: '2', title: 'Another Todo' },
        { ...mockTodo, id: '3', title: 'Third Todo', completed: true },
      ];

      mockTodosRepository.findByUserId.mockResolvedValue(todos);

      const result = await service.findAll(mockUserId);

      expect(result).toEqual(todos);
      expect(result).toHaveLength(3);
      expect(repository.findByUserId).toHaveBeenCalledWith(mockUserId);
      expect(repository.findByUserId).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no todos exist', async () => {
      mockTodosRepository.findByUserId.mockResolvedValue([]);

      const result = await service.findAll(mockUserId);

      expect(result).toEqual([]);
      expect(result).toHaveLength(0);
      expect(repository.findByUserId).toHaveBeenCalledWith(mockUserId);
      expect(repository.findByUserId).toHaveBeenCalledTimes(1);
    });

    it('should handle database errors', async () => {
      mockTodosRepository.findByUserId.mockRejectedValue(new Error('Connection failed'));

      await expect(service.findAll(mockUserId)).rejects.toThrow('Failed to fetch todos: Connection failed');
      expect(repository.findByUserId).toHaveBeenCalledWith(mockUserId);
      expect(repository.findByUserId).toHaveBeenCalledTimes(1);
    });
  });

  describe('findAllForAdmin', () => {
    it('should return all todos for admin', async () => {
      const todos = [
        mockTodo,
        { ...mockTodo, id: '2', title: 'Another Todo', userId: 'user-456' },
        { ...mockTodo, id: '3', title: 'Third Todo', userId: 'user-789' },
      ];

      mockTodosRepository.findAll.mockResolvedValue(todos);

      const result = await service.findAllForAdmin();

      expect(result).toEqual(todos);
      expect(repository.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single todo for user', async () => {
      mockTodosRepository.findByUserIdAndId.mockResolvedValue(mockTodo);

      const result = await service.findOne('1', mockUserId, false);

      expect(result).toEqual(mockTodo);
      expect(repository.findByUserIdAndId).toHaveBeenCalledWith('1', mockUserId);
      expect(repository.findByUserIdAndId).toHaveBeenCalledTimes(1);
    });

    it('should return a single todo for admin', async () => {
      mockTodosRepository.findOne.mockResolvedValue(mockTodo);

      const result = await service.findOne('1', mockUserId, true);

      expect(result).toEqual(mockTodo);
      expect(repository.findOne).toHaveBeenCalledWith('1');
      expect(repository.findOne).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when todo does not exist', async () => {
      mockTodosRepository.findByUserIdAndId.mockResolvedValue(null);

      await expect(service.findOne('999', mockUserId, false)).rejects.toThrow(NotFoundException);
      await expect(service.findOne('999', mockUserId, false)).rejects.toThrow('Todo not found');
      expect(repository.findByUserIdAndId).toHaveBeenCalledWith('999', mockUserId);
    });

    it('should throw ForbiddenException when user tries to access another users todo', async () => {
      const otherUserTodo = { ...mockTodo, userId: 'other-user-id' };
      mockTodosRepository.findByUserIdAndId.mockResolvedValue(otherUserTodo);

      await expect(service.findOne('1', mockUserId, false)).rejects.toThrow(ForbiddenException);
      expect(repository.findByUserIdAndId).toHaveBeenCalledWith('1', mockUserId);
    });
  });

  describe('update', () => {
    it('should update a todo for user', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
        completed: true,
      };

      const updatedTodo = { ...mockTodo, ...updateTodoDto };

      mockTodosRepository.updateByUserIdAndId.mockResolvedValue(updatedTodo);

      const result = await service.update('1', updateTodoDto, mockUserId, false);

      expect(result).toEqual(updatedTodo);
      expect(repository.updateByUserIdAndId).toHaveBeenCalledWith('1', mockUserId, updateTodoDto);
      expect(repository.updateByUserIdAndId).toHaveBeenCalledTimes(1);
    });

    it('should update a todo for admin', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
      };

      const updatedTodo = { ...mockTodo, ...updateTodoDto };

      mockTodosRepository.update.mockResolvedValue(updatedTodo);

      const result = await service.update('1', updateTodoDto, mockUserId, true);

      expect(result).toEqual(updatedTodo);
      expect(repository.update).toHaveBeenCalledWith('1', updateTodoDto);
      expect(repository.update).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when todo does not exist', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
      };

      mockTodosRepository.updateByUserIdAndId.mockResolvedValue(null);

      await expect(service.update('999', updateTodoDto, mockUserId, false)).rejects.toThrow(NotFoundException);
      await expect(service.update('999', updateTodoDto, mockUserId, false)).rejects.toThrow('Todo not found or access denied');
      expect(repository.updateByUserIdAndId).toHaveBeenCalledWith('999', mockUserId, updateTodoDto);
    });

    it('should throw NotFoundException when user tries to update another users todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
      };

      // When a user tries to update another user's todo, the repository returns null
      mockTodosRepository.updateByUserIdAndId.mockResolvedValue(null);

      await expect(service.update('1', updateTodoDto, mockUserId, false)).rejects.toThrow(NotFoundException);
      await expect(service.update('1', updateTodoDto, mockUserId, false)).rejects.toThrow('Todo not found or access denied');
      expect(repository.updateByUserIdAndId).toHaveBeenCalledWith('1', mockUserId, updateTodoDto);
    });
  });

  describe('remove', () => {
    it('should remove a todo for user', async () => {
      mockTodosRepository.deleteByUserIdAndId.mockResolvedValue(mockTodo);

      const result = await service.remove('1', mockUserId, false);

      expect(result).toEqual({ message: 'Todo deleted successfully' });
      expect(repository.deleteByUserIdAndId).toHaveBeenCalledWith('1', mockUserId);
      expect(repository.deleteByUserIdAndId).toHaveBeenCalledTimes(1);
    });

    it('should remove a todo for admin', async () => {
      mockTodosRepository.delete.mockResolvedValue(mockTodo);

      const result = await service.remove('1', mockUserId, true);

      expect(result).toEqual({ message: 'Todo deleted successfully' });
      expect(repository.delete).toHaveBeenCalledWith('1');
      expect(repository.delete).toHaveBeenCalledTimes(1);
    });

    it('should throw NotFoundException when todo does not exist', async () => {
      mockTodosRepository.deleteByUserIdAndId.mockResolvedValue(null);

      await expect(service.remove('999', mockUserId, false)).rejects.toThrow(NotFoundException);
      await expect(service.remove('999', mockUserId, false)).rejects.toThrow('Todo not found or access denied');
      expect(repository.deleteByUserIdAndId).toHaveBeenCalledWith('999', mockUserId);
    });

    it('should throw NotFoundException when user tries to delete another users todo', async () => {
      // When a user tries to delete another user's todo, the repository returns null
      mockTodosRepository.deleteByUserIdAndId.mockResolvedValue(null);

      await expect(service.remove('1', mockUserId, false)).rejects.toThrow(NotFoundException);
      await expect(service.remove('1', mockUserId, false)).rejects.toThrow('Todo not found or access denied');
      expect(repository.deleteByUserIdAndId).toHaveBeenCalledWith('1', mockUserId);
    });
  });
});