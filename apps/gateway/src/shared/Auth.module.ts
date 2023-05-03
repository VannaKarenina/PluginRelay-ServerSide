import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import {JwtStrategy} from "@mmh/gateway/strategies";

const {JWT_SECRET, JWT_TIMEOUT} = process.env;

@Module({
  imports: [
    JwtModule.register({
      secret: JWT_SECRET,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  providers: [JwtStrategy],
  exports: [JwtStrategy, JwtModule],
})
export class AuthModule {}
