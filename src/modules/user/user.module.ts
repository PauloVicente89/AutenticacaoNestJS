import { UserRepository } from '@core/repositories/user.repository';
import PrismaUserRepository from '@infra/prisma/repositories/prisma-user.repository';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [UserService],
})
export class UserModule {}
