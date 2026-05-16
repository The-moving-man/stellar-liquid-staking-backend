import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { IndexerService } from './indexer.service';
import { StakingModule } from '../staking/staking.module';
import { WithdrawalsModule } from '../withdrawals/withdrawals.module';
import { AnalyticsModule } from '../analytics/analytics.module';

@Module({
  imports: [ConfigModule, StakingModule, WithdrawalsModule, AnalyticsModule],
  providers: [IndexerService],
})
export class IndexerModule {}
