import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Index } from 'typeorm';

export type WithdrawalStatus = 'pending' | 'claimable' | 'claimed';

@Entity('withdrawal_requests')
export class WithdrawalRequest {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'bigint' }) requestId: number;
  @Index() @Column() walletAddress: string;
  @Column({ type: 'numeric', precision: 36, scale: 18 }) xlmAmount: string;
  @Column({ type: 'bigint' }) claimableAt: number;
  @Column({ default: 'pending' }) status: WithdrawalStatus;
  @Column({ type: 'bigint' }) ledger: number;
  @CreateDateColumn() createdAt: Date;
}
