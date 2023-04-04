import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class TransactionAccountDto {
  @ApiProperty({ required: true })
  @IsNumber()
  balance: number;
}
