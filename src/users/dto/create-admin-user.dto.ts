import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminUserDto {
  @ApiProperty({ 
    example: 'admin@example.com', 
    description: 'Admin email address' 
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ 
    example: 'admin123', 
    description: 'Admin password (minimum 6 characters)',
    minLength: 6 
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ 
    example: 'Admin', 
    description: 'Admin first name' 
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ 
    example: 'User', 
    description: 'Admin last name' 
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ 
    example: 'admin', 
    description: 'User role',
    enum: ['user', 'admin']
  })
  @IsEnum(['user', 'admin'])
  role: string;
} 