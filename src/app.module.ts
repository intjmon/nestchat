import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { NestModule } from '@nestjs/common/interfaces/modules';
import * as mongoose from 'mongoose';

//console.log('MONGODB::::', process.env.MONGODB_URI);
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 사용할 수 있도록 설정. 다른모듈에서 가져올 필요없음
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure() {
    console.log('MONGODB::::', process.env.MONGODB_URI);
    const DEBUG = process.env.MODE === 'dev' ? true : false;
    mongoose.set('debug', DEBUG);
  }
}
