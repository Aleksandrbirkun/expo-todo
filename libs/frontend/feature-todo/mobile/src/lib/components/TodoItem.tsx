import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { updateTodo, toggleTodo, deleteTodo, getTodos } from '../actions/todos';
import { Button } from '@frontend/shared/mobile-ui/Button';
import { LucideIcon } from '@frontend/shared/mobile-ui/LucideIcon';
import { Check, Edit, Trash } from 'lucide-react-native';
import { TodoResponseDto } from '@frontend/codegen/generated';

interface TodoItemProps {
  todo: TodoResponseDto;
  onTodosChange: (todos: TodoResponseDto[]) => void;
}

export const TodoItem = ({ todo, onTodosChange }: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUpdatedTodos = async () => {
    const result = await getTodos();
    if (result.data) {
      onTodosChange(result.data);
    }
  };

  const handleToggle = async () => {
    setIsLoading(true);

    try {
      const result = await toggleTodo(todo.id, !todo.completed);

      if (result.error) {
        Alert.alert('Error', result.error);
      } else {
        await fetchUpdatedTodos();
      }
    } catch (error) {
      console.error('Error toggling todo:', error);
      Alert.alert('Error', 'Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          setIsLoading(true);

          try {
            const result = await deleteTodo(todo.id);

            if (result.error) {
              Alert.alert('Error', result.error);
            } else {
              await fetchUpdatedTodos();
              Alert.alert('Success', 'Todo deleted successfully');
            }
          } catch (error) {
            console.error('Error deleting todo:', error);
            Alert.alert('Error', 'Failed to delete todo');
          } finally {
            setIsLoading(false);
          }
        },
      },
    ]);
  };

  const handleSave = async () => {
    if (!editText.trim()) {
      Alert.alert('Error', 'Todo title cannot be empty');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', editText.trim());
      formData.append('description', todo.description || '');
      if (todo.completed) {
        formData.append('completed', 'on');
      }

      const result = await updateTodo(todo.id, formData);

      if (result.error) {
        Alert.alert('Error', result.error);
      } else {
        await fetchUpdatedTodos();
        setIsEditing(false);
        Alert.alert('Success', 'Todo updated successfully');
      }
    } catch (error) {
      console.error('Error updating todo:', error);
      Alert.alert('Error', 'Failed to update todo');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.title);
    setIsEditing(false);
  };

  return (
    <View
      className={`bg-white/80 rounded-xl p-4 border border-gray-100 ${
        todo.completed ? 'opacity-60' : ''
      } ${isLoading ? 'opacity-50' : ''}`}
    >
      <View className="flex-row items-center gap-3 space-x-3">
        {/* Checkbox */}
        <Button
          onPress={handleToggle}
          disabled={isLoading}
          className={`w-6 h-6 rounded-full border-2 items-center justify-center ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 bg-white'
          }`}
        >
          {todo.completed && (
            <LucideIcon icon={Check} className={'text-white size-4'} />
          )}
        </Button>

        {isEditing ? (
          <View className="flex-1 flex-row items-center space-x-2">
            <TextInput
              value={editText}
              onChangeText={setEditText}
              onSubmitEditing={handleSave}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-gray-900"
              autoFocus
              editable={!isLoading}
              placeholderTextColor="#9CA3AF"
            />
            <TouchableOpacity
              onPress={handleSave}
              disabled={isLoading || !editText.trim()}
              className="bg-green-500 rounded-lg px-3 py-2"
            >
              {isLoading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text className="text-white font-medium">✓</Text>
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleCancel}
              disabled={isLoading}
              className="bg-red-500 rounded-lg px-3 py-2"
            >
              <Text className="text-white font-medium">✕</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View className="flex-1 flex-row items-center justify-between">
            <View className="flex-1">
              <Text
                className={`text-base ${
                  todo.completed
                    ? 'line-through text-gray-400'
                    : 'text-gray-900'
                }`}
              >
                {todo.title}
              </Text>
              {todo.description && (
                <Text className="text-sm text-gray-500 mt-1">
                  {todo.description}
                </Text>
              )}
            </View>
            <View className="flex-row items-center gap-2 space-x-2">
              <Button onPress={() => setIsEditing(true)} disabled={isLoading}>
                <LucideIcon icon={Edit} className={'text-white size-5'} />
              </Button>
              <Button onPress={handleDelete} disabled={isLoading}>
                <LucideIcon icon={Trash} className={'text-white size-5'} />
              </Button>
            </View>
          </View>
        )}
      </View>
    </View>
  );
};
