import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BankAccountService } from '../services/bank-account.service';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';

import { ApiTags } from '@nestjs/swagger';
import { BankAccount } from '../schemas/bank-account.entity';
import { TransactionAccountDto } from '../dto/transaction-account.dto';

@ApiTags('bank-account')
@Controller('bank-account')
export class BankAccountController {
  constructor(private readonly bankAccountService: BankAccountService) {}

  @Post()
  public async create(@Body() dto: CreateBankAccountDto): Promise<BankAccount> {
    return this.bankAccountService.create(dto);
  }

  @Get()
  public async findAll(): Promise<BankAccount[]> {
    return this.bankAccountService.findAll();
  }

  @Get(':id')
  public async findOne(@Param('id') _id: string): Promise<BankAccount> {
    return this.bankAccountService.findOne(_id);
  }

  @Delete(':id')
  public async remove(@Param('id') _id: string): Promise<any> {
    return this.bankAccountService.remove(_id);
  }

  @Patch(':id/withdraw')
  public async withdraw(
    @Param('id') _id: string,
    @Body() dto: TransactionAccountDto,
  ): Promise<any> {
    return this.bankAccountService.withdraw(_id, dto);
  }

  @Patch(':id/deposit')
  public async deposit(
    @Param('id') _id: string,
    @Body() dto: TransactionAccountDto,
  ): Promise<any> {
    return this.bankAccountService.deposit(_id, dto);
  }

  @Get('/owner/:id')
  public async findAccountByUserId(@Param('id') _id: string): Promise<BankAccount> {
    return this.bankAccountService.findAccountByUserId(_id);
  }
}
