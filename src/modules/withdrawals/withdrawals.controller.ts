import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WithdrawalsService } from './withdrawals.service';

@ApiTags('withdrawals')
@Controller('api/v1/withdrawals')
export class WithdrawalsController {
  constructor(private readonly withdrawalsService: WithdrawalsService) {}

  @Get(':address')
  @ApiOperation({ summary: 'Get withdrawal requests for a wallet' })
  findByWallet(@Param('address') address: string) {
    return this.withdrawalsService.findByWallet(address);
  }
}
