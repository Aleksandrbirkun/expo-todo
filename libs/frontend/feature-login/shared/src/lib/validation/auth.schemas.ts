import { z } from 'zod';

// Sign In schema
export const signInSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type SignInFormData = z.infer<typeof signInSchema>;

// Sign Up schema
export const signUpSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

export type SignUpFormData = z.infer<typeof signUpSchema>;

// Password strength validation
export function validatePasswordStrength(password: string) {
  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[^a-zA-Z0-9]/.test(password),
  };

  // Calculate strength based on criteria met
  if (checks.length) strength += 20;
  if (checks.lowercase) strength += 20;
  if (checks.uppercase) strength += 20;
  if (checks.numbers) strength += 20;
  if (checks.special) strength += 20;

  // Additional points for length
  if (password.length >= 12) strength = Math.min(100, strength + 10);
  if (password.length >= 16) strength = 100;

  return {
    strength,
    checks,
    isValid: strength >= 60,
  };
}