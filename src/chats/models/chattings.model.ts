import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Types, Document } from 'mongoose';
import { Socket as SocketModel } from './sockets.model';

const options: SchemaOptions = {
  collection: 'chattings',
  timestamps: true, // db에 타임스템프를 자동으로 추가
};

@Schema(options)
export class Chatting extends Document {
  @Prop({
    type: {
      _id: { type: Types.ObjectId, required: true, ref: 'sockets' },
      id: { type: String },
      username: { type: String, required: true },
    },
  })
  @IsNotEmpty()
  user: SocketModel;

  @Prop({
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  chat: string;
}

export const ChattingSchama = SchemaFactory.createForClass(Chatting);
