import {Body, Controller, Post, } from "@nestjs/common";
import {TestService} from "@mmh/gateway/apps/test/test.service";

@Controller({
  path: 'test'
})
export class TestController {

  constructor(private service: TestService) {}

  @Post('mail')
  async uploadFile(@Body() data: {
    email: string,
    login: string,
    code: string
  }) {
    return this.service.sendEmailConfirm({email: data.email, login: data.login , code: parseInt(data.code)});
  }
}
