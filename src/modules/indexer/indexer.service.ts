import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { SorobanRpc } from '@stellar/stellar-sdk';
import { StakingService } from '../staking/staking.service';
import { WithdrawalsService } from '../withdrawals/withdrawals.service';

@Injectable()
export class IndexerService implements OnModuleInit {
  private readonly logger = new Logger(IndexerService.name);
  private rpc: SorobanRpc.Server;
  private cursor = 0;
  private running = false;

  constructor(
    private readonly config: ConfigService,
    private readonly stakingService: StakingService,
    private readonly withdrawalsService: WithdrawalsService,
  ) {}

  onModuleInit() {
    const url = this.config.get<string>('app.stellarRpc')!;
    this.rpc = new SorobanRpc.Server(url, { allowHttp: url.startsWith('http://') });
    this.logger.log('Indexer initialized');
  }

  @Cron(CronExpression.EVERY_10_SECONDS)
  async poll() {
    if (this.running) return;
    this.running = true;
    try {
      await this.index();
      // Mark claimable withdrawals every poll
      await this.withdrawalsService.markClaimable();
    } catch (e) {
      this.logger.error('Indexer error', e);
    } finally {
      this.running = false;
    }
  }

  private async index() {
    const latest = (await this.rpc.getLatestLedger()).sequence;
    if (this.cursor === 0) this.cursor = Math.max(latest - 100, 1);
    if (this.cursor >= latest) return;

    const contractId = this.config.get<string>('app.stakingPoolId');
    if (!contractId) return;

    const res = await this.rpc.getEvents({
      startLedger: this.cursor,
      filters: [{ type: 'contract', contractIds: [contractId] }],
      limit: 200,
    });

    for (const event of res.events) {
      await this.processEvent(event);
    }

    this.cursor = latest;
    this.logger.debug(`Indexed to ledger ${latest}, ${res.events.length} events`);
  }

  private async processEvent(event: any) {
    const topic = event.topic?.[0]?.value ?? '';
    switch (topic) {
      case 'stake':
        await this.handleStake(event);
        break;
      case 'unstake':
        await this.handleUnstake(event);
        break;
      case 'enqueue':
        await this.handleEnqueue(event);
        break;
    }
  }

  private async handleStake(event: any) {
    const [staker, amount, shares] = event.value?.value ?? [];
    if (!staker) return;
    await this.stakingService.upsert({
      walletAddress: staker,
      xlmStaked: String(amount ?? 0),
      sharesBalance: String(shares ?? 0),
      lastUpdatedLedger: event.ledger,
    });
  }

  private async handleUnstake(event: any) {
    this.logger.debug(`Unstake event: ${JSON.stringify(event.value)}`);
  }

  private async handleEnqueue(event: any) {
    const [id, owner, xlmAmount, claimableAt] = event.value?.value ?? [];
    if (!owner) return;
    await this.withdrawalsService.save({
      requestId: Number(id ?? 0),
      walletAddress: owner,
      xlmAmount: String(xlmAmount ?? 0),
      claimableAt: Number(claimableAt ?? 0),
      status: 'pending',
      ledger: event.ledger,
    });
  }
}
