import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// 🛡️ LocalAuthGuard - Passport Local Strategy'yi aktif eden guard
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  
  constructor() {
    super();
    console.log('🛡️ LocalAuthGuard oluşturuldu - "local" stratejisini kullanacak');
  }
  
  // 🔄 Bu guard çalıştığında şu sırayla işlemler gerçekleşir:
  // 1️⃣ HTTP isteğinden email ve password çıkarılır
  // 2️⃣ LocalStrategy.validate() metodu çağrılır
  // 3️⃣ validate() başarılıysa req.user set edilir
  // 4️⃣ Controller metoduna req.user ile devam edilir
} 