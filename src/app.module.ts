import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BankAccountModule } from './bank-account/bank-account.module';
import { AuthModule } from './auth/auth.module';
import 'dotenv/config';

@Module({
  imports: [MongooseModule.forRoot(process.env.DATABASE), UsersModule, BankAccountModule, AuthModule],
})
export class AppModule {}
 