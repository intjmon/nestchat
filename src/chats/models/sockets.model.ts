import { Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';

const options: SchemaOptions = {
  collection: 'chattings',
  timestamps: true, // db에 타임스템프를 자동으로 추가
};

@Schema(options)
export class Socket extends Document {}
export const SeocktSchema = SchemaFactory.createForClass(Socket);
