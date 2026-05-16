import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StakingPosition } from '../../database/entities/staking-position.entity';

@Injectable()
export class StakingService {
  constructor(
    @InjectRepository(StakingPosition)
    private readonly repo: Repository<StakingPosition>,
  ) {}

  async findByWallet(address: string): Promise<StakingPosition> {
    const pos = await this.repo.findOne({ where: { walletAddress: address } });
    if (!pos) throw new NotFoundException(`No staking position for ${address}`);
    return pos;
  }

  async upsert(data: Partial<StakingPosition>): Promise<StakingPosition> {
    const existing = await this.repo.findOne({ where: { walletAddress: data.walletAddress } });
    if (existing) { Object.assign(existing, data); return this.repo.save(existing); }
    return this.repo.save(this.repo.create(data));
  }

  async getTotalStaked(): Promise<string> {
    const r = await this.repo
      .createQueryBuilder('s')
      .select('SUM(CAST(s.xlmStaked AS NUMERIC))', 'total')
      .getRawOne();
    return r?.total ?? '0';
  }
}
