import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { MathService } from './math/math.service';
import { MathModule } from './math/math.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule, MathModule],
  controllers: [AppController],
  providers: [AppService, AuthService, MathService],
})
export class AppModule {}
