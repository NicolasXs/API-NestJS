import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BankAccount, BankAccountDocument } from '../schemas/bank-account.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TransactionAccountDto } from '../dto/transaction-account.dto';

export interface CreateBankAccountDto {
  accountNumber: string;
  accountType: string;
  balance: number;
  owner: string;
}

@Injectable()
export class BankAccountService {
  constructor(
    @InjectModel(BankAccount.name)
    private bankModel: Model<BankAccountDocument>,
  ) {}

  async create(createBankAccountDto: CreateBankAccountDto): Promise<BankAccount> {
    const createdAccount = new this.bankModel(createBankAccountDto);
    return createdAccount.save();
  }

  async findAll(): Promise<BankAccount[]> {
    return this.bankModel.find().populate('owner');
  }

  async findOne(_id: string): Promise<BankAccount> {
    try {
      const bankAccount = await this.bankModel.findById(_id).populate('owner');
      if (!bankAccount) {
        throw new NotFoundException('Bank account not found');
      }
      return bankAccount;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAccountByUserId(_id: string): Promise<BankAccount> {
    try {
      const bankAccount = await this.bankModel.findOne({ owner: _id }).populate('owner');
      if (!bankAccount) {
        throw new NotFoundException('Bank account not found');
      }
      return bankAccount;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  private validSaque(currentBalance: number, value: number): number {
    const newBalance = currentBalance - value;
    if (newBalance < 0) throw new BadRequestException('Saldo baixo');
    return newBalance;
  }

  async withdraw(_id: string, dto: TransactionAccountDto): Promise<any> {
    try {
      const account = await this.findOne(_id);
      const balance = this.validSaque(account.balance, dto.balance);
      await this.bankModel.updateOne({ _id }, { balance });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async deposit(_id: string, dto: TransactionAccountDto): Promise<any> {
    try {
      const account = await this.findOne(_id);
      const balance = dto.balance + account.balance;
      await this.bankModel.updateOne({ _id }, { balance });
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
  public async remove(_id: string): Promise<any> {
    await this.findOne(_id);
    return this.bankModel.deleteOne({ _id });
  }
}
