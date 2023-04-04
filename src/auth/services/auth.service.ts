import { ForbiddenException, Injectable } from '@nestjs/common';
import { UserLoginDto } from '../dto/user-login.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'src/users/schemas/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ILogin } from '../interfaces/ILogin';

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  private async findByEmail(email: string): Promise<User> {
    return this.userModel.findOne(
      { email: email.toLowerCase() },
      { password: 1, name: 1, email: 1 },
    );
  }

  private async comparePass(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  public async validateUser(dto: UserLoginDto): Promise<ILogin> {
    const user = await this.findByEmail(dto.email);
    if (!user) throw new ForbiddenException('Invalid credentials');

    const passMatch = await this.comparePass(dto.password, user.password);

    if (!passMatch) throw new ForbiddenException('Invalid credentials');

    return { _id: user._id, email: user.email };
  }
}
