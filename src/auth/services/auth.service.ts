import { Injectable, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { UserLoginDto } from '../dto/user-login.dto';
import { ILogin } from '../interfaces/ILogin';
import { User, UserDocument } from 'src/users/schemas/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  public async validateUser(dto: UserLoginDto): Promise<ILogin> {
    const { email, password } = dto;
    const user = await this.userModel.findOne(
      { email: email.toLowerCase() },
      { password: 1, name: 1, email: 1 },
    );

    if (!user) {
      throw new ForbiddenException('E-mail ou senha inválidos');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new ForbiddenException('E-mail ou senha inválidos');
    }

    return { _id: user._id, email: user.email };
  }
}
