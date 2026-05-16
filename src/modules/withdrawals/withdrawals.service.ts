import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WithdrawalRequest, WithdrawalStatus } from '../../database/entities/withdrawal-request.entity';

@Injectable()
export class WithdrawalsService {
  constructor(@InjectRepository(WithdrawalRequest) private readonly repo: Repository<WithdrawalRequest>) {}

  findByWallet(address: string): Promise<WithdrawalRequest[]> {
    return this.repo.find({ where: { walletAddress: address }, order: { createdAt: 'DESC' } });
  }

  save(data: Partial<WithdrawalRequest>): Promise<WithdrawalRequest> {
    return this.repo.save(this.repo.create(data));
  }

  async markClaimable(): Promise<void> {
    const now = Math.floor(Date.now() / 1000);
    await this.repo
      .createQueryBuilder()
      .update()
      .set({ status: 'claimable' as WithdrawalStatus })
      .where('status = :s AND "claimableAt" <= :now', { s: 'pending', now })
      .execute();
  }
}
