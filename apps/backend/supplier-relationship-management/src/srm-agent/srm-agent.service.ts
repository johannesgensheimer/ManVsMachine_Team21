import { Injectable } from '@nestjs/common';
import { QueryDto } from './dto/query.dto';

@Injectable()
export class SrmAgentService {
  async processQuery(queryDto: QueryDto): Promise<string> {
    // For now, just return "hello world"
    // TODO: Add LLM integration and actual agent logic here
    return 'hello world';
  }
}