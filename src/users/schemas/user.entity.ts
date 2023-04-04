import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  _id?: mongoose.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;
  
  @Prop({ minlength: 8, required: true, select: 0 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

