import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseService } from '../supabase/supabase.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private supabaseService: SupabaseService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { email, password, isAdmin = false } = registerDto;
    
    try {
      console.log('Attempting to register user:', email);
      const { data, error } = await this.supabaseService.signUp(email, password);
      
      console.log('Supabase signup response:', { data: data?.user?.id, error });
      
      if (error) {
        console.error('Supabase signup error:', error);
        throw new UnauthorizedException(error.message);
      }

      if (!data.user) {
        throw new UnauthorizedException('Registration failed - no user returned');
      }

      // Skip profile creation for now - just return the user
      return {
        user: {
          id: data.user.id,
          email: data.user.email,
          confirmed: data.user.email_confirmed_at ? true : false,
          role: isAdmin ? 'admin' : 'user',
        },
        message: data.user.email_confirmed_at 
          ? 'Registration successful'
          : 'Registration successful. Please check your email to verify your account.',
      };
    } catch (error) {
      console.error('Registration error:', error);
      throw new UnauthorizedException(error.message || 'Registration failed');
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    
    const { data, error } = await this.supabaseService.signIn(email, password);
    
    if (error) {
      throw new UnauthorizedException(error.message);
    }

    const supabase = this.supabaseService.getClient();
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', data.user.id)
      .single();

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        role: profile?.role || 'user',
      },
    };
  }

  async logout() {
    const { error } = await this.supabaseService.signOut();
    
    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Logged out successfully' };
  }
}