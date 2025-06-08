import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.validateUser(email, password);
    if (user) {
      console.log('✅ validateUser başarılı:', user.email);
      return user;
    }
    console.log('❌ validateUser başarısız:', email);
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id, role: user.role };
    
    console.log('🔐 JWT token oluşturuluyor, payload:', payload);
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      },
    };
  }

  async loginWithUser(user: any) {
    console.log('🚀 loginWithUser - Doğrulanmış kullanıcı ile token oluşturuluyor:', user);
    console.log('🚀 loginWithUser - Doğrulanmış kullanıcı ile token oluşturuluyor:', user.email);
    
    return this.login(user);
  }

  async loginWithCredentials(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.login(user);
  }

  async register(createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    const userObj = (user as any).toObject();
    const { password, ...result } = userObj;
    return result;
  }
} 