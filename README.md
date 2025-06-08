# NestJS E-Ticaret Starter Projesi

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

Bu proje, modern e-ticaret uygulamaları için kapsamlı bir **NestJS** starter template'idir. Kullanıcı yönetimi, ürün kataloğu, sipariş yönetimi ve rol tabanlı yetkilendirme sistemlerini içerir.

## 📋 İçindekiler

- [Özellikler](#özellikler)
- [Teknoloji Stack](#teknoloji-stack)
- [Kurulum](#kurulum)
- [Çalıştırma](#çalıştırma)
- [API Dokümantasyonu](#api-dokümantasyonu)
- [Proje Mimarisi](#proje-mimarisi)
- [NestJS Konseptleri](#nestjs-konseptleri)
- [Mongoose ve MongoDB](#mongoose-ve-mongodb)
- [Test](#test)
- [Katkıda Bulunma](#katkıda-bulunma)

## 🚀 Özellikler

### 🔐 Kimlik Doğrulama ve Yetkilendirme
- **JWT tabanlı kimlik doğrulama**
- **Rol tabanlı erişim kontrolü** (Admin/User)
- **Bcrypt ile şifre hashleme**
- **Otomatik admin kullanıcı oluşturma** (admin@example.com / admin123)

### 👥 Kullanıcı Yönetimi
- Kullanıcı kaydı ve girişi
- Profil yönetimi
- Admin'ler tüm kullanıcıları görüntüleyebilir
- Kullanıcı aktivasyon/deaktivasyon

### 📦 Ürün ve Kategori Sistemi
- **Kategori yönetimi** (CRUD işlemleri)
- **Ürün yönetimi** (kategori ilişkilendirme ile)
- **Sayfalama desteği**
- **Stok takibi**
- **Otomatik kategori seed'leme**

### 🛒 Sipariş Yönetimi
- **Kapsamlı sipariş sistemi**
- **Sipariş durumu takibi** (beklemede, onaylandı, işleniyor, kargoda, teslim edildi, iptal edildi)
- **Otomatik sipariş numarası oluşturma**
- **Stok yönetimi** (sipariş verirken stok azaltma, iptal edildiğinde geri yükleme)
- **Sipariş iptal etme** fonksiyonu
- **Toplam fiyat hesaplama**

### 📊 API Özellikleri
- **Swagger dokümantasyonu**
- **Global validation pipes**
- **CORS desteği**
- **Hata yönetimi**
- **DTO validation**

## 🛠 Teknoloji Stack

- **Framework:** NestJS 11.x
- **Runtime:** Node.js
- **Dil:** TypeScript
- **Veritabanı:** MongoDB
- **ODM:** Mongoose 8.x
- **Kimlik Doğrulama:** JWT + Passport
- **Validation:** class-validator + class-transformer
- **Dokümantasyon:** Swagger/OpenAPI
- **Şifreleme:** bcryptjs
- **Test:** Jest

## 📥 Kurulum

### Gereksinimler
- Node.js (v18 veya üzeri)
- MongoDB (v5 veya üzeri)
- npm veya yarn

### Adımlar

1. **Projeyi klonlayın:**
```bash
git clone <repository-url>
cd nestjs-starter/starter
```

2. **Bağımlılıkları yükleyin:**
```bash
npm install
```

3. **MongoDB'yi başlatın:**
```bash
# Windows için
net start MongoDB

# macOS için (brew ile kurulduysa)
brew services start mongodb-community

# Linux için
sudo systemctl start mongod
```

4. **Ortam değişkenlerini ayarlayın:**
`.env` dosyası oluşturun (isteğe bağlı):
```env
DATABASE_URL=mongodb://localhost:27017/nestjs-ecommerce
JWT_SECRET=your-super-secret-jwt-key
PORT=3000
```

## 🏃‍♂️ Çalıştırma

### Development modunda çalıştırma:
```bash
npm run start:dev
```

### Production build:
```bash
npm run build
npm run start:prod
```

### Debug modunda çalıştırma:
```bash
npm run start:debug
```

## 📚 API Dokümantasyonu

Uygulama çalıştıktan sonra Swagger UI'ya şu adresten erişebilirsiniz:
```
http://localhost:3000/api
```

### Temel API Endpoint'leri

#### 🔐 Authentication
- `POST /auth/register` - Kullanıcı kaydı
- `POST /auth/login` - Kullanıcı girişi

#### 👥 Users
- `GET /users` - Tüm kullanıcıları listele (Admin only)
- `GET /users/profile` - Kendi profilini görüntüle
- `PUT /users/profile` - Profil güncelle

#### 🏷 Categories
- `GET /categories` - Kategorileri listele
- `POST /categories` - Kategori oluştur (Admin only)
- `PUT /categories/:id` - Kategori güncelle (Admin only)
- `DELETE /categories/:id` - Kategori sil (Admin only)

#### 📦 Products
- `GET /products` - Ürünleri listele (sayfalama ile)
- `GET /products/:id` - Ürün detayı
- `POST /products` - Ürün oluştur (Admin only)
- `PUT /products/:id` - Ürün güncelle (Admin only)
- `DELETE /products/:id` - Ürün sil (Admin only)

#### 🛒 Orders
- `GET /orders` - Siparişleri listele
- `GET /orders/:id` - Sipariş detayı
- `POST /orders` - Sipariş oluştur
- `PUT /orders/:id/cancel` - Sipariş iptal et
- `PUT /orders/:id/status` - Sipariş durumu güncelle (Admin only)

## 🏗 Proje Mimarisi

```
src/
├── auth/                 # Kimlik doğrulama modülü
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── auth.module.ts
│   ├── dto/
│   ├── guards/
│   └── strategies/
├── users/                # Kullanıcı yönetimi modülü
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── users.module.ts
│   ├── schemas/
│   └── dto/
├── categories/           # Kategori yönetimi modülü
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   ├── categories.module.ts
│   ├── schemas/
│   └── dto/
├── products/             # Ürün yönetimi modülü
│   ├── products.controller.ts
│   ├── products.service.ts
│   ├── products.module.ts
│   ├── schemas/
│   └── dto/
├── orders/               # Sipariş yönetimi modülü
│   ├── orders.controller.ts
│   ├── orders.service.ts
│   ├── orders.module.ts
│   ├── schemas/
│   └── dto/
├── order-items/          # Sipariş kalemleri modülü
│   ├── order-items.controller.ts
│   ├── order-items.service.ts
│   ├── order-items.module.ts
│   ├── schemas/
│   └── dto/
├── common/               # Ortak yapılar
│   ├── guards/
│   ├── decorators/
│   └── types/
├── config/               # Konfigürasyon
│   └── database.config.ts
├── app.module.ts         # Ana modül
└── main.ts              # Uygulama giriş noktası
```

## 🧠 NestJS Konseptleri

### 📦 Modüller (Modules)

**Modüller**, NestJS uygulamasının yapı taşlarıdır. Her modül, belirli bir işlevsellik için gerekli olan bileşenleri (controller, service, provider) bir araya getirir.

```typescript
@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
```

**Açıklama:**
- `imports`: Bu modülün ihtiyaç duyduğu diğer modüller
- `controllers`: HTTP isteklerini işleyen controller'lar
- `providers`: Servisler ve diğer provider'lar
- `exports`: Diğer modüller tarafından kullanılabilecek provider'lar

### 🛡 Guard'lar (Guards)

**Guard'lar**, route'lara erişim kontrolü sağlar. Authentication ve authorization için kullanılır.

#### JwtAuthGuard - Kimlik Doğrulama
```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> {
    return super.canActivate(context);
  }
}
```

**Kullanımı:**
```typescript
@UseGuards(JwtAuthGuard)
@Get('profile')
getProfile(@Request() req) {
  return req.user;
}
```

#### RolesGuard - Yetkilendirme
```typescript
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>('roles', context.getHandler());
    if (!requiredRoles) return true;
    
    const { user } = context.switchToHttp().getRequest();
    return requiredRoles.some((role) => user.role === role);
  }
}
```

### 🎯 Decorator'lar (Decorators)

#### Route Decorator'ları
- `@Get()`, `@Post()`, `@Put()`, `@Delete()`: HTTP metodları
- `@Param()`: URL parametreleri
- `@Body()`: Request body
- `@Query()`: Query parametreleri

#### Guard Decorator'ları
- `@UseGuards()`: Guard'ları aktif eder
- `@Roles()`: Gerekli rolleri belirtir

#### Swagger Decorator'ları
- `@ApiTags()`: API gruplandırması
- `@ApiOperation()`: İşlem açıklaması
- `@ApiResponse()`: Yanıt açıklaması
- `@ApiBearerAuth()`: JWT token gereksinimi

**Decorator Çalışma Sırası:**
1. Method decorator'ları (@Get, @Post, vs.)
2. Guard decorator'ları (@UseGuards)
3. Parameter decorator'ları (@Body, @Param, vs.)

### 🔄 Dependency Injection

NestJS, güçlü bir **Dependency Injection** sistemi kullanır:

```typescript
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private jwtService: JwtService
  ) {}
}
```

**Avantajları:**
- **Loosely coupled** kod
- **Test edilebilirlik**
- **Modülerlik**
- **Kod tekrarının azalması**

### 📡 Request Lifecycle

1. **Incoming Request** (Gelen istek)
2. **Middlewares** (Ara yazılımlar)
3. **Guards** (Kimlik doğrulama/yetkilendirme)
4. **Interceptors** (Pre-processing)
5. **Pipes** (Validation/transformation)
6. **Controller** (Route handler)
7. **Service** (Business logic)
8. **Interceptors** (Post-processing)
9. **Exception Filters** (Hata yönetimi)
10. **Response** (Yanıt)

## 🍃 Mongoose ve MongoDB

### 📊 Schema Tanımlama

```typescript
@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: Role, default: Role.USER })
  role: Role;

  @Prop({ default: true })
  isActive: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
```

**Schema Özellikleri:**
- `@Schema()`: MongoDB collection'ını tanımlar
- `@Prop()`: Document property'lerini tanımlar
- `timestamps: true`: Otomatik `createdAt` ve `updatedAt` alanları
- `unique: true`: Benzersizlik constraint'i
- `enum`: Belirli değerler arasından seçim
- `default`: Varsayılan değer

### 🔗 İlişkiler (Relationships)

#### ObjectId Referansları
```typescript
@Schema()
export class Product {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true })
  categoryId: mongoose.Types.ObjectId;
}

@Schema()
export class Order {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: mongoose.Types.ObjectId;
}
```

#### Populate İşlemleri
```typescript
// Kategori bilgileriyle birlikte ürünleri getir
const products = await this.productModel
  .find()
  .populate('categoryId', 'name description')
  .exec();

// Kullanıcı ve ürün bilgileriyle sipariş detayı
const order = await this.orderModel
  .findById(orderId)
  .populate('userId', 'firstName lastName email')
  .populate('items.productId', 'name price')
  .exec();
```

### 🔍 Sorgu İşlemleri

#### Temel CRUD İşlemleri
```typescript
// Create
const user = new this.userModel(createUserDto);
await user.save();

// Read
const users = await this.userModel.find({ isActive: true });
const user = await this.userModel.findById(id);

// Update
await this.userModel.findByIdAndUpdate(id, updateData, { new: true });

// Delete
await this.userModel.findByIdAndDelete(id);
```

#### Gelişmiş Sorgular
```typescript
// Sayfalama
const products = await this.productModel
  .find()
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({ createdAt: -1 });

// Filtreleme ve Arama
const products = await this.productModel.find({
  $and: [
    { categoryId: categoryId },
    { price: { $gte: minPrice, $lte: maxPrice } },
    { name: { $regex: searchTerm, $options: 'i' } }
  ]
});

// Aggregation
const orderStats = await this.orderModel.aggregate([
  { $match: { status: 'delivered' } },
  { $group: { 
      _id: '$userId', 
      totalOrders: { $sum: 1 },
      totalAmount: { $sum: '$totalPrice' }
    }
  }
]);
```

### 🎭 Mongoose Middleware

```typescript
// Pre-save middleware (şifre hashleme)
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Post-save middleware
UserSchema.post('save', function(doc) {
  console.log('Yeni kullanıcı oluşturuldu:', doc.email);
});
```

### 📈 İndeksleme ve Performans

```typescript
// İndeks tanımlama
UserSchema.index({ email: 1 });
UserSchema.index({ email: 1, isActive: 1 });

// Compound index
ProductSchema.index({ categoryId: 1, createdAt: -1 });

// Text index (arama için)
ProductSchema.index({ 
  name: 'text', 
  description: 'text' 
});
```

## 📊 Veritabanı Seed'leme

Uygulama başlatıldığında otomatik olarak:

### 👨‍💼 Admin Kullanıcı
- **Email:** admin@example.com
- **Şifre:** admin123
- **Rol:** admin

### 🏷 Kategoriler
- Electronics (Elektronik)
- Clothing (Giyim)
- Books (Kitaplar)
- Home & Garden (Ev ve Bahçe)

Bu veriler `main.ts` dosyasında otomatik olarak oluşturulur.

## 🧪 Test

### Unit testler çalıştırma:
```bash
npm run test
```

### Test coverage:
```bash
npm run test:cov
```

### E2E testler:
```bash
npm run test:e2e
```

### Test watch mode:
```bash
npm run test:watch
```

## 🎨 Code Style ve Linting

### Kodu formatla:
```bash
npm run format
```

### Lint kontrolü:
```bash
npm run lint
```

## 🚀 Production'a Hazırlık

### Build alma:
```bash
npm run build
```

### Production'da çalıştırma:
```bash
npm run start:prod
```

### Ortam Değişkenleri
Production'da şu environment variable'ları ayarlayın:
- `DATABASE_URL`: MongoDB connection string
- `JWT_SECRET`: JWT imzalama anahtarı
- `PORT`: Uygulama portu
