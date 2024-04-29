import { Controller, Post, Body } from '@nestjs/common';
import { IdentifiersService } from './identifiers.service';

@Controller('identifiers')
export class IdentifiersController {
  constructor(private readonly identifiersService: IdentifiersService) {}

  @Post('imsi')
  async getMsisdnByImsi(@Body() { imsi }: { imsi: string }) {
    return this.identifiersService.imsiToMsisdn(imsi);
  }
}
