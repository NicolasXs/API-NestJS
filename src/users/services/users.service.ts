import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import { User, UserDocument } from '../schemas/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  private async transformBody(dto: any): Promise<void> {
    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 12);
    }
  }

  private async findByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email: email.toLowerCase() }).exec();
  }

  private async validateCreate(dto: CreateUserDto): Promise<void> {
    const user = await this.findByEmail(dto.email);
    if (user) {
      throw new BadRequestException('Email already used');
    }
  }

  public async create(dto: CreateUserDto): Promise<User> {
    await this.validateCreate(dto);
    await this.transformBody(dto);
    const createdUser = new this.userModel(dto);
    return createdUser.save();
  }

  public async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  public async findOne(_id: string): Promise<User> {
    const user = await this.userModel.findById(_id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  private async validateUpdate(
    _id: string,
    dto: UpdateUserDto,
  ): Promise<void> {
    if (dto.email) {
      const user = await this.findByEmail(dto.email);
      if (user && String(user._id) !== _id) {
        throw new BadRequestException('Email already used');
      }
    }
  }

  public async update(_id: string, dto: UpdateUserDto): Promise<void> {
    const user = await this.userModel.findById(_id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.validateUpdate(_id, dto);
    await this.transformBody(dto);
    await this.userModel.updateOne({ _id }, dto).exec();
  }

  public async remove(_id: string): Promise<void> {
    const user = await this.userModel.findById(_id).exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userModel.deleteOne({ _id }).exec();
  }
}