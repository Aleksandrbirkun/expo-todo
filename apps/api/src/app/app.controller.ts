import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AppDataResponseDto } from './dto/app-response.dto';

@ApiTags('app')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Get application data',
    operationId: 'appGetData'
  })
  @ApiResponse({ status: 200, description: 'Application data retrieved successfully', type: AppDataResponseDto })
  getData() {
    return this.appService.getData();
  }
}
