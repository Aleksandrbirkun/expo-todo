import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { createTodo, getTodos } from '../actions/todos';
import { useTranslation } from 'react-i18next';
import { TodoResponseDto } from '@frontend/codegen/generated';

interface AddTodoFormProps {
  onTodoAdded: (todos: TodoResponseDto[]) => void;
}

export function AddTodoForm({ onTodoAdded }: AddTodoFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleSubmit = async () => {
    if (!title.trim()) {
      Alert.alert('Error', 'Please enter a todo title');
      return;
    }

    setIsLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title.trim());
      formData.append('description', description.trim());

      const result = await createTodo(formData);

      if (result.error) {
        Alert.alert('Error', result.error);
      } else {
        // Refresh todos list
        const todosResult = await getTodos();
        if (todosResult.data) {
          onTodoAdded(todosResult.data);
        }

        // Clear form
        setTitle('');
        setDescription('');
        Alert.alert('Success', 'Todo added successfully!');
      }
    } catch (error) {
      console.error('Error creating todo:', error);
      Alert.alert('Error', 'Failed to create todo');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <Text className="text-gray-700 mb-2 font-medium">
        {t('dashboard.addTodo.placeholder')}
      </Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 mb-3"
        placeholder={t('dashboard.addTodo.placeholder')}
        value={title}
        onChangeText={setTitle}
        editable={!isLoading}
        placeholderTextColor="#9CA3AF"
        autoFocus
      />

      <Text className="text-gray-700 mb-2 font-medium">
        {t('dashboard.addTodo.descriptionPlaceholder')}
      </Text>
      <TextInput
        className="border border-gray-300 rounded-lg px-4 py-3 text-gray-900 mb-4"
        placeholder={t('dashboard.addTodo.descriptionPlaceholder')}
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={2}
        textAlignVertical="top"
        editable={!isLoading}
        placeholderTextColor="#9CA3AF"
      />

      <TouchableOpacity
        onPress={handleSubmit}
        disabled={isLoading || !title.trim()}
        className={`rounded-lg py-3 px-4 ${
          isLoading || !title.trim() ? 'bg-gray-300' : 'bg-blue-600'
        }`}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-semibold text-center">
            {t('dashboard.addTodo.button')}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
