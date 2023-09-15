import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/modules/user/user.module';
import { AuthService } from './auth.service';
import { PassportLocalStrategy } from './passport-local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { AuthController } from 'src/modules/auth/auth.controller';

@Module({
  controllers: [AuthController],
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: `${process.env.JWT_SECRET}`,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [AuthService, PassportLocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
