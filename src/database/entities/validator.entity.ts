import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('validators')
export class Validator {
  @PrimaryGeneratedColumn('uuid') id: string;
  @Column({ unique: true }) address: string;
  @Column() name: string;
  @Column({ type: 'int', default: 0 }) weight: number;
  @Column({ default: true }) active: boolean;
  @Column({ type: 'numeric', precision: 36, scale: 18, default: '0' }) totalDelegated: string;
  @Column({ type: 'numeric', precision: 10, scale: 4, default: '0' }) uptime: string;
  @Column({ type: 'numeric', precision: 10, scale: 4, default: '0' }) apy: string;
  @Column({ type: 'int', default: 0 }) commissionBps: number;
  @CreateDateColumn() createdAt: Date;
  @UpdateDateColumn() updatedAt: Date;
}
