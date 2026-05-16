import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';

@ApiTags('analytics')
@Controller('api/v1/analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('stats')
  @ApiOperation({ summary: 'Latest protocol stats: TVL, APY, exchange rate' })
  getLatest() { return this.analyticsService.getLatest(); }

  @Get('history')
  @ApiOperation({ summary: 'Historical protocol metrics' })
  getHistory(@Query('limit') limit = 30) {
    return this.analyticsService.getHistory(+limit);
  }
}
