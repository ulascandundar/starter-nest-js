import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

// 🎯 LocalStrategy - Email ve şifre ile kimlik doğrulaması için Passport.js stratejisi
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  
  constructor(private authService: AuthService) {
    // 🔧 Passport Local Strategy konfigürasyonu
    super({ 
      usernameField: 'email' // 📧 Varsayılan 'username' yerine 'email' alanını kullan
    });
    
    console.log('🚀 LocalStrategy oluşturuldu - email alanı username olarak kullanılacak');
  }

  // 🔍 Bu metod Passport.js tarafından otomatik çağrılır
  // 📨 HTTP isteğinden email ve password otomatik çıkarılır
  async validate(email: string, password: string): Promise<any> {
    
    console.log('🔍 LocalStrategy.validate çağrıldı - Email:', email);
    
    // 🎯 AuthService.validateUser çağır - veritabanında email/şifre kontrolü
    const user = await this.authService.validateUser(email, password);
    
    if (!user) {
      // ❌ Kullanıcı bulunamadı veya şifre yanlış
      console.log('❌ LocalStrategy doğrulama başarısız:', email);
      throw new UnauthorizedException('Invalid email or password');
    }
    
    // ✅ Doğrulama başarılı
    console.log('✅ LocalStrategy doğrulama başarılı:', user.email);
    
    // 🎯 ÖNEMLİ: Bu return edilen user, req.user olarak controller'a geçer
    return user;
  }
} 