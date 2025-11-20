import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signInSchema,
  type SignInFormData,
} from '@frontend/feature-login/shared/validation/auth.schemas';

import { TextInput } from '@frontend/shared/mobile-ui/TextInput';
import { Text } from '@frontend/shared/mobile-ui/Text';
import { Button } from '@frontend/shared/mobile-ui/Button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/shared/mobile-ui/Form';
import { mobileClient } from '@backend/feature-supabase/lib/clients/mobileClient';
import { useToast } from '@frontend/shared/mobile-ui/Toast';

interface SignInFormProps {
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
  onForgotPassword?: () => void;
  onSignUpClick?: () => void;
  t?: (key: string) => string;
}

export function SignInForm({
  onSuccess,
  onError,
  onForgotPassword,
  onSignUpClick,
  t,
}: SignInFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);

    try {
      const { data: authData, error } =
        await mobileClient.auth.signInWithPassword({
          email: data.email,
          password: data.password,
        });

      if (error) {
        // Show toast notification
        showToast({
          title: 'Error',
          description: error.message || 'Failed to sign in',
          variant: 'error',
        });

        onError?.(error);
      } else if (authData?.user) {
        showToast({
          title: 'Success',
          description: 'Signed in successfully!',
        });
        onSuccess?.(authData.user);
      }
    } catch (error) {
      showToast({
        title: 'Error',
        description: 'An unexpected error occurred',
        variant: 'error',
      });

      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <View style={styles.formContainer}>
        {/* Email Field */}
        <View style={styles.fieldContainer}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl>
                  <TextInput
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    editable={!isLoading}
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    style={styles.textInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        {/* Password Field */}
        <View style={styles.fieldContainer}>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <View style={styles.passwordHeader}>
                  <FormLabel>Password</FormLabel>
                  {onForgotPassword && (
                    <Button
                      variant="link"
                      size="sm"
                      onPress={onForgotPassword}
                      disabled={isLoading}
                    >
                      <Text style={styles.forgotPasswordText}>
                        Forgot password?
                      </Text>
                    </Button>
                  )}
                </View>
                <FormControl>
                  <TextInput
                    placeholder="Enter your password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password"
                    editable={!isLoading}
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    style={styles.textInput}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </View>

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button
            onPress={form.handleSubmit(onSubmit)}
            disabled={isLoading}
            loading={isLoading}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Text>
          </Button>
        </View>

        {/* Sign Up Link */}
        {onSignUpClick && (
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>
              Don't have an account?{' '}
              <Text
                style={styles.signUpLink}
                onPress={!isLoading ? onSignUpClick : undefined}
              >
                Sign up
              </Text>
            </Text>
          </View>
        )}
      </View>
    </Form>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
  },
  fieldContainer: {
    marginBottom: 24,
  },
  passwordHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#2563EB',
  },
  textInput: {
    width: '100%',
  },
  buttonContainer: {
    marginTop: 8,
  },
  submitButton: {
    width: '100%',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  signUpContainer: {
    alignItems: 'center',
    marginTop: 16,
  },
  signUpText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signUpLink: {
    fontWeight: '500',
    color: '#2563EB',
  },
});
