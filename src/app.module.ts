import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ThrottlerModule } from '@nestjs/throttler';
import { ScheduleModule } from '@nestjs/schedule';
import { StakingModule } from './modules/staking/staking.module';
import { ValidatorsModule } from './modules/validators/validators.module';
import { RewardsModule } from './modules/rewards/rewards.module';
import { WithdrawalsModule } from './modules/withdrawals/withdrawals.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { IndexerModule } from './modules/indexer/indexer.module';
import { AdminModule } from './modules/admin/admin.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import appConfig from './config/app.config';
import dbConfig from './config/database.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig, dbConfig] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (c: ConfigService) => ({
        type: 'postgres',
        host: c.get('database.host'),
        port: c.get('database.port'),
        username: c.get('database.username'),
        password: c.get('database.password'),
        database: c.get('database.name'),
        autoLoadEntities: true,
        synchronize: c.get('app.env') === 'development',
      }),
    }),
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    ScheduleModule.forRoot(),
    StakingModule,
    ValidatorsModule,
    RewardsModule,
    WithdrawalsModule,
    AnalyticsModule,
    IndexerModule,
    AdminModule,
    WebsocketModule,
  ],
})
export class AppModule {}
