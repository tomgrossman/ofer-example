import { Controller, Post, Body } from '@nestjs/common';
import { MathService } from './math.service';

@Controller('math')
export class MathController {
  constructor(private readonly mathService: MathService) {}

  @Post('evaluate')
  async login(@Body() data: { expression: string }) {
    return this.mathService.evaluateStr(data.expression);
  }
}
