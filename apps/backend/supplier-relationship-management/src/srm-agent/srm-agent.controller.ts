import {
  Controller,
  Post,
  Body,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { SrmAgentService } from './srm-agent.service';
import { QueryDto } from './dto/query.dto';

@ApiTags('srm-agent')
@Controller('srm-agent')
export class SrmAgentController {
  constructor(private readonly srmAgentService: SrmAgentService) {}

  @Post('query')
  @ApiOperation({ summary: 'Process query through SRM agent' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Query processed successfully',
    schema: {
      type: 'object',
      properties: {
        response: { type: 'string', example: 'hello world' }
      }
    }
  })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  async processQuery(@Body() queryDto: QueryDto): Promise<{ response: string }> {
    const response = await this.srmAgentService.processQuery(queryDto);
    return { response };
  }
}