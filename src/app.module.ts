import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [
    JwtModule.register({
      secret: process.env.SECRET,
      global: true,
    }),
    ConfigModule.forRoot({isGlobal: true}),
    PrismaModule
  ],
})
export class AppModule {}
