import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './decorator/public-route.decorator';

@Controller('')
export class AppController {
  constructor(private authService: AuthService) {}

  @Get('/healthcheck')
  async healthcheck(): Promise<any> {
    return {
      status: "Ok",
      info: {
        database: true
      },
    }
  }
}
