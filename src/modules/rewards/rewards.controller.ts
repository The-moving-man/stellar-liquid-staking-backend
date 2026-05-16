import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';
import { RewardsService } from './rewards.service';

@ApiTags('rewards')
@Controller('api/v1/rewards')
export class RewardsController {
  constructor(private readonly rewardsService: RewardsService) {}

  @Get('estimate')
  @ApiOperation({ summary: 'Estimate rewards for a given stake amount and duration' })
  @ApiQuery({ name: 'amount', type: Number })
  @ApiQuery({ name: 'apy', type: Number })
  @ApiQuery({ name: 'days', type: Number })
  estimate(
    @Query('amount') amount: number,
    @Query('apy') apy: number,
    @Query('days') days = 365,
  ) {
    return {
      estimatedRewards: this.rewardsService.estimateRewards(+amount, +apy, +days),
    };
  }
}
