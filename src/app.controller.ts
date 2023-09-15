import { Controller, Get } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { Public } from './decorator/public-route.decorator';

@Controller('')
export class AppController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private authService: AuthService) {}

  @Public()
  @Get('/healthcheck')
  async healthcheck(): Promise<any> {
    return {
      database: true,
    };
  }
}
