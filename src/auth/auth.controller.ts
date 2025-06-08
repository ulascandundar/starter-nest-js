import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  @ApiOperation({ summary: 'User login using Passport Local Strategy' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful - JWT token returned' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid email or password' })
  async login(@Request() req) {
    console.log('🔍 LocalStrategy tarafından doğrulanmış kullanıcı:', req.user);
    
    return this.authService.loginWithUser(req.user);
  }

  @Post('login-dto')
  @ApiOperation({ summary: 'Alternative login using DTO approach (old method)' })
  @ApiResponse({ status: 200, description: 'Login successful' })
  @ApiResponse({ status: 401, description: 'Unauthorized - Invalid credentials' })
  async loginWithDto(@Body() loginDto: LoginDto) {
    return this.authService.loginWithCredentials(loginDto);
  }

  @Post('register')
  @ApiOperation({ summary: 'User registration' })
  @ApiResponse({ status: 201, description: 'User registered successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  @ApiResponse({ status: 409, description: 'User already exists' })
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
} 