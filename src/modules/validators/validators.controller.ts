import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ValidatorsService } from './validators.service';

@ApiTags('validators')
@Controller('api/v1/validators')
export class ValidatorsController {
  constructor(private readonly validatorsService: ValidatorsService) {}

  @Get()
  @ApiOperation({ summary: 'List active validators with performance metrics' })
  findAll() {
    return this.validatorsService.findAll();
  }
}
