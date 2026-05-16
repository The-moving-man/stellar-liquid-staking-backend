import { Injectable } from '@nestjs/common';

@Injectable()
export class RewardsService {
  /**
   * Estimate APY from exchange rate history
   * APY = ((current_rate / rate_7d_ago) ^ (365/7) - 1) * 100
   */
  calculateApy(currentRate: number, rateSevenDaysAgo: number): number {
    if (rateSevenDaysAgo === 0) return 0;
    const ratio = currentRate / rateSevenDaysAgo;
    return (Math.pow(ratio, 365 / 7) - 1) * 100;
  }

  estimateRewards(stakedXlm: number, apyPercent: number, days: number): number {
    return stakedXlm * (apyPercent / 100) * (days / 365);
  }
}
