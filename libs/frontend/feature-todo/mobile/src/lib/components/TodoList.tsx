import React from 'react';
import { View } from 'react-native';
import { Text } from '@frontend/shared/mobile-ui/Text';
import { TodoItem } from './TodoItem';
import { TodoResponseDto } from '@frontend/codegen/generated';

interface TodoListProps {
  todos: TodoResponseDto[];
  emptyMessage: string;
  onTodosChange: (todos: TodoResponseDto[]) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  todos,
  emptyMessage,
  onTodosChange,
}) => {
  return (
    <View className="space-y-3">
      {todos.length === 0 ? (
        <View className="bg-white/40 rounded-xl p-8 items-center border border-gray-100">
          <Text className="text-gray-500 text-lg">{emptyMessage} ✨</Text>
        </View>
      ) : (
        todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onTodosChange={onTodosChange} />
        ))
      )}
    </View>
  );
};
