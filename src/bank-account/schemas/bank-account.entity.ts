import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/users/schemas/user.entity';

export type BankAccountDocument = BankAccount & Document;

export enum AccountType {
  CURRENT = 'CURRENT',
  SAVINGS = 'SAVINGS',
}

@Schema()
export class BankAccount {
  _id?: mongoose.ObjectId;

  @Prop({ required: true })
  accountNumber: string;

  @Prop({ required: true, enum: AccountType })
  accountType: AccountType;

  @Prop({ default: 0 })
  balance: number;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;
}

export const BankAccountSchema = SchemaFactory.createForClass(BankAccount);
