import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { LoginResponseDto, RegisterResponseDto, LogoutResponseDto } from './dto/auth-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ 
    summary: 'Register a new user',
    operationId: 'authRegister'
  })
  @ApiResponse({ status: 201, description: 'User registered successfully', type: RegisterResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @ApiOperation({ 
    summary: 'Login user',
    operationId: 'authLogin'
  })
  @ApiResponse({ status: 200, description: 'Login successful', type: LoginResponseDto })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('logout')
  @ApiOperation({ 
    summary: 'Logout user',
    operationId: 'authLogout'
  })
  @ApiResponse({ status: 200, description: 'Logout successful', type: LogoutResponseDto })
  async logout() {
    return this.authService.logout();
  }

  @Post('register-admin')
  @ApiOperation({ 
    summary: 'Register a new admin user',
    operationId: 'authRegisterAdmin'
  })
  @ApiResponse({ status: 201, description: 'Admin user registered successfully', type: RegisterResponseDto })
  @ApiResponse({ status: 400, description: 'Bad request - validation error' })
  async registerAdmin(@Body() registerDto: Omit<RegisterDto, 'isAdmin'>) {
    return this.authService.register({ ...registerDto, isAdmin: true });
  }
}