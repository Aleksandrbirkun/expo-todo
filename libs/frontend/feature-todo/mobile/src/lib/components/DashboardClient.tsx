import { useState } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { Text } from '@frontend/shared/mobile-ui/Text';
import { AddTodoForm } from './AddTodoForm';
import { TodoList } from './TodoList';
import { TodoResponseDto } from '@frontend/codegen/generated';

interface DashboardClientProps {
  todos: TodoResponseDto[];
  onTodosChange: (todos: TodoResponseDto[]) => void;
}

type FilterType = 'all' | 'active' | 'completed';

export function DashboardClient({
  todos,
  onTodosChange,
}: DashboardClientProps) {
  const [filter, setFilter] = useState<FilterType>('all');

  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'active':
        return !todo.completed;
      case 'completed':
        return todo.completed;
      default:
        return true;
    }
  });

  const stats = {
    all: todos.length,
    active: todos.filter((t) => !t.completed).length,
    completed: todos.filter((t) => t.completed).length,
  };

  const filters: { key: FilterType; label: string; count: number }[] = [
    { key: 'all', label: 'All', count: stats.all },
    { key: 'active', label: 'Active', count: stats.active },
    { key: 'completed', label: 'Completed', count: stats.completed },
  ];

  const getEmptyMessage = () => {
    switch (filter) {
      case 'active':
        return 'No active todos.';
      case 'completed':
        return 'No completed todos.';
      default:
        return 'No todos yet. Add one above!';
    }
  };

  return (
    <View>
      {/* Add Todo Form */}
      <View className="mb-6">
        <AddTodoForm onTodoAdded={onTodosChange} />
      </View>

      {/* Filter Tabs */}
      {todos.length > 0 && (
        <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 4 }}
          >
            <View className="flex-row space-x-2">
              {filters.map(({ key, label, count }) => (
                <TouchableOpacity
                  key={key}
                  onPress={() => setFilter(key)}
                  className={`px-4 py-2 rounded-full border ${
                    filter === key
                      ? 'bg-blue-600 border-blue-600'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      filter === key ? 'text-white' : 'text-gray-700'
                    }`}
                  >
                    {label} ({count})
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>
      )}

      {/* Todo List */}
      <TodoList
        todos={filteredTodos}
        emptyMessage={getEmptyMessage()}
        onTodosChange={onTodosChange}
      />
    </View>
  );
}
