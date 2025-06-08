import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { UsersService } from './users/users.service';
import { CategoriesService } from './categories/categories.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  app.enableCors();

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('NestJS Starter API')
    .setDescription('A comprehensive NestJS starter API with authentication and user management')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'JWT-auth', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

  // Seed default data
  await seedAdminUser(app);
  await seedCategories(app);
  
  await app.listen(process.env.PORT ?? 3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
  console.log(`Swagger documentation is available at: ${await app.getUrl()}/api`);
}

async function seedAdminUser(app: any) {
  try {
    const usersService = app.get(UsersService);
    
    const adminEmail = 'admin@example.com';
    const existingAdmin = await usersService.findByEmail(adminEmail);
    
    if (!existingAdmin) {
      await usersService.createAdmin({
        email: adminEmail,
        password: 'admin123',
        firstName: 'Admin',
        lastName: 'User',
        role: 'admin',
      });
      console.log('✅ Default admin user created:');
      console.log('   Email: admin@example.com');
      console.log('   Password: admin123');
    } else {
      console.log('ℹ️  Admin user already exists');
    }
  } catch (error) {
    console.error('❌ Error seeding admin user:', error.message);
  }
}

async function seedCategories(app: any) {
  try {
    const categoriesService = app.get(CategoriesService);
    
    const defaultCategories = [
      {
        name: 'Electronics',
        description: 'Electronic devices and gadgets',
        slug: 'electronics'
      },
      {
        name: 'Clothing',
        description: 'Fashion and apparel',
        slug: 'clothing'
      },
      {
        name: 'Books',
        description: 'Books and literature',
        slug: 'books'
      },
      {
        name: 'Home & Garden',
        description: 'Home and garden products',
        slug: 'home-garden'
      }
    ];

    for (const categoryData of defaultCategories) {
      try {
        await categoriesService.create(categoryData);
        console.log(`✅ Category created: ${categoryData.name}`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️  Category already exists: ${categoryData.name}`);
        } else {
          console.error(`❌ Error creating category ${categoryData.name}:`, error.message);
        }
      }
    }
  } catch (error) {
    console.error('❌ Error seeding categories:', error.message);
  }
}

bootstrap();
