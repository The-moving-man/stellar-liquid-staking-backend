import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Validator } from '../../database/entities/validator.entity';

@Injectable()
export class ValidatorsService {
  constructor(@InjectRepository(Validator) private readonly repo: Repository<Validator>) {}

  findAll(): Promise<Validator[]> {
    return this.repo.find({ where: { active: true }, order: { totalDelegated: 'DESC' } });
  }

  async upsert(data: Partial<Validator>): Promise<Validator> {
    const existing = await this.repo.findOne({ where: { address: data.address } });
    if (existing) { Object.assign(existing, data); return this.repo.save(existing); }
    return this.repo.save(this.repo.create(data));
  }
}
