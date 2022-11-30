import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type UserDocument = User & Document;
@Schema()
export class User {
  _id?: mongoose.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;
  
  @Prop({ required: false })
  telefone?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
