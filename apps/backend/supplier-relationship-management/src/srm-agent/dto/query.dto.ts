import { IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class QueryDto {
  @ApiPropertyOptional({ 
    description: 'Query input for the SRM agent',
    example: 'Find suppliers for microchips in California'
  })
  @IsOptional()
  @IsString()
  query?: string;
}