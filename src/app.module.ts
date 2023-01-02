import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 모든 모듈에서 사용할 수 있도록 설정. 다른모듈에서 가져올 필요없음
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
