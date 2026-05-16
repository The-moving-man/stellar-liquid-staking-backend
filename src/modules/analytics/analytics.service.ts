import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProtocolMetric } from '../../database/entities/protocol-metric.entity';

@Injectable()
export class AnalyticsService {
  constructor(@InjectRepository(ProtocolMetric) private readonly repo: Repository<ProtocolMetric>) {}

  async getLatest(): Promise<ProtocolMetric | null> {
    return this.repo.findOne({ order: { createdAt: 'DESC' } });
  }

  async getHistory(limit = 30): Promise<ProtocolMetric[]> {
    return this.repo.find({ order: { createdAt: 'DESC' }, take: limit });
  }

  async save(data: Partial<ProtocolMetric>): Promise<ProtocolMetric> {
    return this.repo.save(this.repo.create(data));
  }
}
