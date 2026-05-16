import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { StakingService } from './staking.service';

@ApiTags('staking')
@Controller('api/v1/staking')
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @Get('position/:address')
  @ApiOperation({ summary: 'Get staking position for a wallet' })
  getPosition(@Param('address') address: string) {
    return this.stakingService.findByWallet(address);
  }

  @Get('tvl')
  @ApiOperation({ summary: 'Total XLM staked in protocol' })
  getTvl() {
    return this.stakingService.getTotalStaked().then((total) => ({ totalStaked: total }));
  }
}
