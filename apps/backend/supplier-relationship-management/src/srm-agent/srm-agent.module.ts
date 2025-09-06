import { Module } from '@nestjs/common';
import { SrmAgentController } from './srm-agent.controller';
import { SrmAgentService } from './srm-agent.service';

@Module({
  controllers: [SrmAgentController],
  providers: [SrmAgentService],
  exports: [SrmAgentService],
})
export class SrmAgentModule {}