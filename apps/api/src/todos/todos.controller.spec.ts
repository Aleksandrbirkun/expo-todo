import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from '@prisma/client';

describe('TodosController', () => {
  let controller: TodosController;
  let service: TodosService;

  const mockUserId = 'user-123';
  const mockRequest = {
    user: {
      userId: mockUserId,
      email: 'test@example.com'
    }
  };

  const mockTodo: Todo = {
    id: '1',
    title: 'Test Todo',
    description: 'Test Description',
    completed: false,
    userId: mockUserId,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTodosService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: mockTodosService,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
    service = module.get<TodosService>(TodosService);

    // Clear all mocks between tests
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        description: 'New Description',
        completed: false,
      };

      mockTodosService.create.mockResolvedValue(mockTodo);

      const result = await controller.create(createTodoDto, mockRequest);

      expect(result).toEqual(mockTodo);
      expect(service.create).toHaveBeenCalledWith(createTodoDto, mockUserId);
      expect(service.create).toHaveBeenCalledTimes(1);
    });

    it('should create a todo without description', async () => {
      const createTodoDto: CreateTodoDto = {
        title: 'New Todo',
        completed: false,
      };

      const todoWithoutDescription = { ...mockTodo, description: null };
      mockTodosService.create.mockResolvedValue(todoWithoutDescription);

      const result = await controller.create(createTodoDto, mockRequest);

      expect(result).toEqual(todoWithoutDescription);
      expect(service.create).toHaveBeenCalledWith(createTodoDto, mockUserId);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const todos = [mockTodo, { ...mockTodo, id: '2', title: 'Another Todo' }];
      mockTodosService.findAll.mockResolvedValue(todos);

      const result = await controller.findAll(mockRequest);

      expect(result).toEqual(todos);
      expect(service.findAll).toHaveBeenCalledWith(mockUserId);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when no todos exist', async () => {
      mockTodosService.findAll.mockResolvedValue([]);

      const result = await controller.findAll(mockRequest);

      expect(result).toEqual([]);
      expect(service.findAll).toHaveBeenCalledWith(mockUserId);
      expect(service.findAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a single todo', async () => {
      mockTodosService.findOne.mockResolvedValue(mockTodo);

      const result = await controller.findOne('1', mockRequest);

      expect(result).toEqual(mockTodo);
      expect(service.findOne).toHaveBeenCalledWith('1', mockUserId, false);
      expect(service.findOne).toHaveBeenCalledTimes(1);
    });

    it('should handle todo not found', async () => {
      mockTodosService.findOne.mockResolvedValue(null);

      const result = await controller.findOne('999', mockRequest);

      expect(result).toBeNull();
      expect(service.findOne).toHaveBeenCalledWith('999', mockUserId, false);
    });
  });

  describe('update', () => {
    it('should update a todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
        completed: true,
      };

      const updatedTodo = { ...mockTodo, ...updateTodoDto };
      mockTodosService.update.mockResolvedValue(updatedTodo);

      const result = await controller.update('1', updateTodoDto, mockRequest);

      expect(result).toEqual(updatedTodo);
      expect(service.update).toHaveBeenCalledWith('1', updateTodoDto, mockUserId, false);
      expect(service.update).toHaveBeenCalledTimes(1);
    });

    it('should update only completed status', async () => {
      const updateTodoDto: UpdateTodoDto = {
        completed: true,
      };

      const updatedTodo = { ...mockTodo, completed: true };
      mockTodosService.update.mockResolvedValue(updatedTodo);

      const result = await controller.update('1', updateTodoDto, mockRequest);

      expect(result).toEqual(updatedTodo);
      expect(service.update).toHaveBeenCalledWith('1', updateTodoDto, mockUserId, false);
    });

    it('should handle updating non-existent todo', async () => {
      const updateTodoDto: UpdateTodoDto = {
        title: 'Updated Todo',
      };

      mockTodosService.update.mockResolvedValue(null);

      const result = await controller.update('999', updateTodoDto, mockRequest);

      expect(result).toBeNull();
      expect(service.update).toHaveBeenCalledWith('999', updateTodoDto, mockUserId, false);
    });
  });

  describe('remove', () => {
    it('should remove a todo', async () => {
      const expectedResult = { message: 'Todo deleted successfully' };
      mockTodosService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove('1', mockRequest);

      expect(result).toEqual(expectedResult);
      expect(service.remove).toHaveBeenCalledWith('1', mockUserId, false);
      expect(service.remove).toHaveBeenCalledTimes(1);
    });

    it('should handle removing non-existent todo', async () => {
      mockTodosService.remove.mockRejectedValue(new Error('Todo not found'));

      await expect(controller.remove('999', mockRequest)).rejects.toThrow('Todo not found');
      expect(service.remove).toHaveBeenCalledWith('999', mockUserId, false);
    });
  });
});