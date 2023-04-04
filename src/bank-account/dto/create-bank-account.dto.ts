import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { AccountType } from '../schemas/bank-account.entity';

export class CreateBankAccountDto {
  @ApiProperty({ required: true })
  @IsNotEmpty({ message: 'É necessário informar o número da conta.' })
  accountNumber: string;

  @ApiProperty({ required: true, enum: AccountType })
  @IsNotEmpty()
  accountType: AccountType;

  @ApiProperty({ required: true })
  @IsNumber()
  balance: number;

  @ApiProperty({ required: true, example: '{USER_ID}' })
  @IsNotEmpty()
  owner: string;
}
