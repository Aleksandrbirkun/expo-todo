import  { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  todosUpdateMutation,
  todosFindAllOptions,
} from '@frontend/codegen/generated/@tanstack/react-query.gen';
import '@frontend/codegen/clients/mobileClient'; // Initialize the client

export function EditTodoPage() {
  const { t } = useTranslation();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { id, initialTitle, initialDescription } = useLocalSearchParams<{
    id: string;
    initialTitle: string;
    initialDescription?: string;
  }>();

  const [title, setTitle] = useState(initialTitle || '');
  const [description, setDescription] = useState(initialDescription || '');

  // Update mutation using the generated mutation options
  const updateMutation = useMutation({
    ...todosUpdateMutation(),
    onMutate: async ({ path, body }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({
        queryKey: todosFindAllOptions().queryKey,
      });

      // Snapshot the previous value
      const previousTodos = queryClient.getQueryData(todosFindAllOptions().queryKey);

      // Optimistically update the todo
      queryClient.setQueryData(todosFindAllOptions().queryKey, (old: any) => {
        if (!old) return old;
        return old.map((todo: any) =>
          todo.id === path.id ? { ...todo, ...body } : todo
        );
      });

      // Return a context object with the snapshotted value
      return { previousTodos };
    },
    onSuccess: () => {
      router.back();
    },
    onError: (error, variables, context) => {
      // Rollback on error
      if (context?.previousTodos) {
        queryClient.setQueryData(
          todosFindAllOptions().queryKey,
          context.previousTodos
        );
      }
      console.error('Error updating todo:', error);
      Alert.alert(
        t('common.error', { defaultValue: 'Error' }),
        t('editTodo.errorMessage', {
          defaultValue: 'Failed to update todo. Please try again.',
        })
      );
    },
  });

  const handleSubmit = () => {
    if (!title.trim()) {
      Alert.alert(
        t('common.error', { defaultValue: 'Error' }),
        t('editTodo.titleRequired', { defaultValue: 'Title is required' })
      );
      return;
    }

    updateMutation.mutate({
      path: { id: id as string },
      body: {
        title: title.trim(),
        description: description.trim() || undefined,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.backButton}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#111827" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {t('editTodo.title', { defaultValue: 'Edit Todo' })}
            </Text>
            <View style={styles.headerSpacer} />
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {t('editTodo.titleLabel', { defaultValue: 'Title' })} *
              </Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder={t('editTodo.titlePlaceholder', {
                  defaultValue: 'Enter todo title',
                })}
                placeholderTextColor="#9ca3af"
                autoFocus
                maxLength={100}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {t('editTodo.descriptionLabel', { defaultValue: 'Description' })}
              </Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                value={description}
                onChangeText={setDescription}
                placeholder={t('editTodo.descriptionPlaceholder', {
                  defaultValue: 'Enter description (optional)',
                })}
                placeholderTextColor="#9ca3af"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                maxLength={500}
              />
            </View>
          </View>

          {/* Action Buttons */}
          <View style={styles.actions}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => router.back()}
              activeOpacity={0.7}
              disabled={updateMutation.isPending}
            >
              <Text style={styles.cancelButtonText}>
                {t('common.cancel', { defaultValue: 'Cancel' })}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                updateMutation.isPending && styles.disabledButton,
              ]}
              onPress={handleSubmit}
              activeOpacity={0.7}
              disabled={updateMutation.isPending}
            >
              {updateMutation.isPending ? (
                <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                <>
                  <Ionicons name="save-outline" size={20} color="#ffffff" />
                  <Text style={styles.submitButtonText}>
                    {t('editTodo.submit', { defaultValue: 'Save Changes' })}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  keyboardView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerSpacer: {
    width: 40,
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    minHeight: 100,
    paddingTop: 10,
  },
  actions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 12,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#d1d5db',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6b7280',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
    flexDirection: 'row',
    gap: 6,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#ffffff',
  },
  disabledButton: {
    opacity: 0.7,
  },
});