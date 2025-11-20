import { useCallback } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  todosFindAllOptions,
  todosUpdateMutation,
  todosRemoveMutation,
} from '@frontend/codegen/generated/@tanstack/react-query.gen';
import type { TodoResponseDto } from '@frontend/codegen/generated/types.gen';
import '@frontend/codegen/clients/mobileClient'; // Initialize the client

export function TodoListPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();

  // Fetch todos using React Query
  const {
    data: todos = [],
    isLoading,
    refetch,
    isRefetching,
  } = useQuery({
    ...todosFindAllOptions(),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  // Update mutation
  const updateTodoMutation = useMutation({
    ...todosUpdateMutation(),
    onMutate: async ({ path, body }) => {
      // Optimistically update the UI
      await queryClient.cancelQueries({
        queryKey: todosFindAllOptions().queryKey,
      });

      const previousTodos = queryClient.getQueryData<TodoResponseDto[]>(
        todosFindAllOptions().queryKey
      );

      queryClient.setQueryData<TodoResponseDto[]>(
        todosFindAllOptions().queryKey,
        (old) =>
          old?.map((todo) =>
            todo.id === path.id ? { ...todo, ...body } : todo
          ) ?? []
      );

      return { previousTodos };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousTodos) {
        queryClient.setQueryData(
          todosFindAllOptions().queryKey,
          context.previousTodos
        );
      }
      Alert.alert(
        t('common.error', { defaultValue: 'Error' }),
        t('todos.updateError', { defaultValue: 'Failed to update todo' })
      );
    },
    // Removed onSettled to prevent unnecessary refetching
  });

  // Delete mutation
  const deleteTodoMutation = useMutation({
    ...todosRemoveMutation(),
    onMutate: async ({ path }) => {
      // Optimistically remove from UI
      await queryClient.cancelQueries({
        queryKey: todosFindAllOptions().queryKey,
      });

      const previousTodos = queryClient.getQueryData<TodoResponseDto[]>(
        todosFindAllOptions().queryKey
      );

      queryClient.setQueryData<TodoResponseDto[]>(
        todosFindAllOptions().queryKey,
        (old) => old?.filter((todo) => todo.id !== path.id) ?? []
      );

      return { previousTodos };
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousTodos) {
        queryClient.setQueryData(
          todosFindAllOptions().queryKey,
          context.previousTodos
        );
      }
      Alert.alert(
        t('common.error', { defaultValue: 'Error' }),
        t('todos.deleteError', { defaultValue: 'Failed to delete todo' })
      );
    },
    // Removed onSettled to prevent unnecessary refetching
  });

  // Toggle todo completion status
  const toggleTodo = (todo: TodoResponseDto) => {
    updateTodoMutation.mutate({
      path: { id: todo.id },
      body: { completed: !todo.completed },
    });
  };

  // Delete todo with confirmation
  const deleteTodo = (todoId: string) => {
    Alert.alert(
      t('todos.deleteTitle', { defaultValue: 'Delete Todo' }),
      t('todos.deleteConfirm', {
        defaultValue: 'Are you sure you want to delete this todo?',
      }),
      [
        {
          text: t('common.cancel', { defaultValue: 'Cancel' }),
          style: 'cancel',
        },
        {
          text: t('common.delete', { defaultValue: 'Delete' }),
          style: 'destructive',
          onPress: () => {
            deleteTodoMutation.mutate({
              path: { id: todoId },
            });
          },
        },
      ]
    );
  };

  // Navigate to edit page
  const editTodo = (todo: TodoResponseDto) => {
    router.push({
      pathname: '/(authenticated)/edit-todo',
      params: {
        id: todo.id,
        initialTitle: todo.title,
        initialDescription: todo.description || '',
      },
    });
  };

  // Handle refresh
  const handleRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  // Render todo item
  const renderTodoItem = ({ item }: { item: TodoResponseDto }) => (
    <View style={styles.todoItem}>
      <TouchableOpacity
        style={styles.todoContent}
        onPress={() => toggleTodo(item)}
        activeOpacity={0.7}
      >
        <View style={styles.checkboxContainer}>
          <Ionicons
            name={item.completed ? 'checkbox' : 'square-outline'}
            size={24}
            color={item.completed ? '#10b981' : '#9ca3af'}
          />
        </View>
        <View style={styles.todoTextContainer}>
          <Text
            style={[
              styles.todoTitle,
              item.completed && styles.completedTodoTitle,
            ]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          {item.description && (
            <Text
              style={[
                styles.todoDescription,
                item.completed && styles.completedTodoDescription,
              ]}
              numberOfLines={2}
            >
              {item.description}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <View style={styles.todoActions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => editTodo(item)}
          activeOpacity={0.7}
        >
          <Ionicons name="pencil-outline" size={20} color="#3b82f6" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteTodo(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color="#ef4444" />
        </TouchableOpacity>
      </View>
    </View>
  );

  // Empty state
  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Ionicons name="clipboard-outline" size={64} color="#d1d5db" />
      <Text style={styles.emptyStateTitle}>
        {t('todos.emptyTitle', { defaultValue: 'No todos yet' })}
      </Text>
      <Text style={styles.emptyStateDescription}>
        {t('todos.emptyDescription', {
          defaultValue: 'Tap the + button to add your first todo',
        })}
      </Text>
    </View>
  );

  // Loading state
  if (isLoading && todos.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3b82f6" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          {t('todos.title', { defaultValue: 'My Todos' })}
        </Text>
        <Text style={styles.headerSubtitle}>
          {todos.filter((t) => !t.completed).length}{' '}
          {t('todos.pending', { defaultValue: 'pending' })}
        </Text>
      </View>

      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderTodoItem}
        contentContainerStyle={
          todos.length === 0 ? styles.emptyListContainer : styles.listContainer
        }
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl
            refreshing={isRefetching}
            onRefresh={handleRefresh}
            colors={['#3b82f6']}
            tintColor="#3b82f6"
          />
        }
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 100,
  },
  emptyListContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  todoItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  todoContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxContainer: {
    marginRight: 12,
  },
  todoTextContainer: {
    flex: 1,
  },
  todoTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 2,
  },
  completedTodoTitle: {
    textDecorationLine: 'line-through',
    color: '#9ca3af',
  },
  todoDescription: {
    fontSize: 14,
    color: '#6b7280',
  },
  completedTodoDescription: {
    textDecorationLine: 'line-through',
    color: '#d1d5db',
  },
  todoActions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    padding: 8,
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4b5563',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
});
