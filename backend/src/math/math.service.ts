import { Injectable } from '@nestjs/common';
import { evaluate } from 'mathjs';

@Injectable()
export class MathService {
  evaluateStr(expression: string): number {
    return evaluate(expression);
  }
}
