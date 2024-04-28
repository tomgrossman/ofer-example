import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { MathService } from './math.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('math')
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @UseGuards(JwtAuthGuard)
  @Post('evaluate')
  async login(@Body() data: { expression: string }) {
    return this.mathService.evaluateStr(data.expression);
  }
}
