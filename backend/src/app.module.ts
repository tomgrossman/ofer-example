import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MathModule } from './math/math.module';
import { AuthModule } from './auth/auth.module';
import { IdentifiersModule } from './identifiers/identifiers.module';

@Module({
  imports: [AuthModule, MathModule, IdentifiersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
