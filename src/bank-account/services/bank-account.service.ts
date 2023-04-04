import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBankAccountDto } from '../dto/create-bank-account.dto';

import {
  BankAccount,
  BankAccountDocument,
} from '../schemas/bank-account.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionAccountDto } from '../dto/transaction-account.dto';

@Injectable()
export class BankAccountService {
  constructor(
    @InjectModel(BankAccount.name)
    private bankModel: Model<BankAccountDocument>,
  ) {}

  public async create(
    createBankAccountDto: CreateBankAccountDto,
  ): Promise<BankAccount> {
    return this.bankModel.create(createBankAccountDto);
  }

  public async findAll(): Promise<BankAccount[]> {
    return this.bankModel.find().populate('owner');
  }

  public async findOne(_id: string): Promise<BankAccount> {
    const bankAccount = await this.bankModel.findById(_id).populate('owner');
    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }
    return bankAccount;
  }

  public async findAccountByUserId(_id: string): Promise<BankAccount> {
    const bankAccount = await this.bankModel.findOne({ owner: _id }).populate('owner');
    if (!bankAccount) {
      throw new NotFoundException('Bank account not found');
    }
    return bankAccount;
  }

  private validSaque(currentBalance: number, value: number): number {
    const newBalance = currentBalance - value;
    if (newBalance < 0) throw new BadRequestException('Saldo baixo');
    return newBalance;
  }

  public async sacar(_id: string, dto: TransactionAccountDto): Promise<any> {
    const account = await this.findOne(_id);
    const balance = this.validSaque(account.balance, dto.balance);

    return this.bankModel.updateOne({ _id }, { balance });
  }

  public async depositar(
    _id: string,
    dto: TransactionAccountDto,
  ): Promise<any> {
    const account = await this.findOne(_id);
    const balance = dto.balance + account.balance;
    return this.bankModel.updateOne({ _id }, { balance });
  }

  public async remove(_id: string): Promise<any> {
    await this.findOne(_id);
    return this.bankModel.deleteOne({ _id });
  }
}
