import { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  signUpSchema,
  type SignUpFormData,
  validatePasswordStrength,
} from '@frontend/feature-login/shared/validation/auth.schemas';

import { Text } from '@frontend/shared/mobile-ui/Text';
import { TextInput } from '@frontend/shared/mobile-ui/TextInput';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@frontend/shared/mobile-ui/Form';
import { Button } from '@frontend/shared/mobile-ui/Button';
import { mobileClient } from '@backend/feature-supabase/lib/clients/mobileClient';
import { useToast } from '@frontend/shared/mobile-ui/Toast';

interface SignUpFormProps {
  onSuccess?: (user: any) => void;
  onError?: (error: any) => void;
  onSignInClick?: () => void;
  t?: (key: string) => string;
}

export function SignUpForm({
  onSuccess,
  onError,
  onSignInClick,
  t,
}: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const password = form.watch('password');

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      const { data: authData, error } = await mobileClient.auth.signUp({
        email: data.email,
        password: data.password,
      });

      if (error) {
        showToast({
          title: 'Error',
          description: error.message || 'Failed to create account',
          variant: 'error',
        });

        onError?.(error);
      } else if (authData?.user) {
        // Check if email confirmation is required
        if (!authData.user.confirmed_at) {
          showToast({
            title: 'Confirm Your Email',
            description:
              'Please check your email to confirm your account. You should receive a confirmation link shortly.',
          });
        } else {
          showToast({
            title: 'Success',
            description: 'Account created successfully!',
          });
          onSuccess?.(authData.user);
        }
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

  // Password strength calculation based on length
  const getPasswordStrength = () => {
    if (!password) return null;

    const validation = validatePasswordStrength(password);
    const strength = validation.strength;

    let color = '#EF4444';
    let text = 'Very Weak';

    if (strength >= 100) {
      color = '#10B981';
      text = 'Strong';
    } else if (strength >= 80) {
      color = '#3B82F6';
      text = 'Good';
    } else if (strength >= 60) {
      color = '#F59E0B';
      text = 'Fair';
    } else if (strength >= 40) {
      color = '#FB923C';
      text = 'Weak';
    }

    return { strength, color, text };
  };

  const passwordStrength = getPasswordStrength();

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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <TextInput
                    placeholder="Create a strong password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password-new"
                    editable={!isLoading}
                    value={field.value}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    style={styles.textInput}
                  />
                </FormControl>
                <FormMessage />

                {/* Password Strength Indicator */}
                {passwordStrength && (
                  <View style={styles.passwordStrengthContainer}>
                    <View style={styles.passwordStrengthHeader}>
                      <Text style={styles.passwordStrengthLabel}>
                        Password strength:
                      </Text>
                      <Text style={styles.passwordStrengthValue}>
                        {passwordStrength.text}
                      </Text>
                    </View>
                    <View style={styles.passwordStrengthBar}>
                      <View
                        style={[
                          styles.passwordStrengthProgress,
                          {
                            width: `${passwordStrength.strength}%`,
                            backgroundColor: passwordStrength.color
                          }
                        ]}
                      />
                    </View>
                  </View>
                )}
              </FormItem>
            )}
          />
        </View>

        {/* Confirm Password Field */}
        <View style={styles.fieldContainer}>
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <TextInput
                    placeholder="Re-enter your password"
                    secureTextEntry
                    autoCapitalize="none"
                    autoComplete="password-new"
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
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Text>
          </Button>
        </View>

        {/* Sign In Link */}
        {onSignInClick && (
          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>
              Already have an account?{' '}
              <Text
                style={styles.signInLink}
                onPress={!isLoading ? onSignInClick : undefined}
              >
                Sign in
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
  textInput: {
    width: '100%',
  },
  passwordStrengthContainer: {
    marginTop: 8,
  },
  passwordStrengthHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  passwordStrengthLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  passwordStrengthValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  passwordStrengthBar: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  passwordStrengthProgress: {
    height: '100%',
    borderRadius: 4,
  },
  buttonContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  submitButton: {
    width: '100%',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: '500',
  },
  signInContainer: {
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    color: '#6B7280',
  },
  signInLink: {
    fontWeight: '500',
    color: '#2563EB',
  },
});
