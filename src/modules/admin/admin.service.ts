import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AdminService {
  constructor(private readonly jwtService: JwtService) {}

  async login(password: string): Promise<{ accessToken: string }> {
    const hash = process.env.ADMIN_PASSWORD_HASH ?? '';
    if (!await bcrypt.compare(password, hash)) throw new UnauthorizedException();
    return { accessToken: this.jwtService.sign({ role: 'admin' }) };
  }
}
