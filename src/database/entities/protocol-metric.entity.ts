import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('protocol_metrics')
export class ProtocolMetric {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ type: 'numeric', precision: 36, scale: 18 }) totalStaked: string;
  @Column({ type: 'numeric', precision: 36, scale: 18 }) totalShares: string;
  @Column({ type: 'numeric', precision: 36, scale: 18 }) exchangeRate: string;
  @Column({ type: 'numeric', precision: 10, scale: 4 }) apy: string;
  @Column({ type: 'int' }) activeValidators: number;
  @Column({ type: 'numeric', precision: 36, scale: 18, default: '0' }) protocolRevenue: string;
  @Column({ type: 'bigint' }) ledger: number;
  @CreateDateColumn() createdAt: Date;
}
