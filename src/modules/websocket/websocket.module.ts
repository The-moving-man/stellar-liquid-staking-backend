import { Module } from '@nestjs/common';
import { StakingGateway } from './staking.gateway';

@Module({ providers: [StakingGateway], exports: [StakingGateway] })
export class WebsocketModule {}
