import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Index } from 'typeorm';

@Entity('staking_positions')
export class StakingPosition {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Index() @Column() walletAddress: string;
  @Column({ type: 'numeric', precision: 36, scale: 18, default: '0' }) sharesBalance: string;
  @Column({ type: 'numeric', precision: 36, scale: 18, default: '0' }) xlmStaked: string;
  @Column({ type: 'numeric', precision: 36, scale: 18, default: '0' }) rewardsEarned: string;
  @Column({ type: 'bigint', default: 0 }) lastUpdatedLedger: number;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
