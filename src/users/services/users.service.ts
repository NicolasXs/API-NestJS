import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument } from '../schemas/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  public async create(dto: CreateUserDto): Promise<User> {
    const created = await this.userModel.create(dto);
    return created;
  }

  public async findAll(): Promise<User[]> {
    return this.userModel.find();
  }

  public async findOne(_id: string): Promise<User> {
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async update(_id: string, dto: UpdateUserDto): Promise<any> {
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.userModel.updateOne({ _id });
  }

  public async remove(_id: string): Promise<any> {
    const user = await this.userModel.findById(_id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userModel.deleteOne({ _id });
  }
}
