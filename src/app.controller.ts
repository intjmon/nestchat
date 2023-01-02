import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index') // views안에 index.hbs를 말함 idx.hbs라면 idx가 돼야함
  root() {
    return {
      data: {
        title: 'chatting',
        copyright: 'jw',
      },
    };
  }
}
