import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/modules/user/user.service';
import { MenuScreenAvailable, RoleTypes } from 'src/shared/enums/profile';

interface Response {
  access_token: string;
  user: {
    id: string | undefined;
    email: string;
    name: string;
    role: number;
    menu: string[];
    deleted_at: Date | null;
  };
}
@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findBy({ email });
    if (!user) {
      throw new BadRequestException(['Dados de login inválidos']);
    }
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      throw new BadRequestException(['Dados de login inválidos']);
    }
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      deleted_at: user.deleted_at,
    };
  }

  async login(user: User): Promise<Response> {
    const payload = {
      email: user.email,
      sub: user.id,
      role: user.role,
      name: user.name,
      deleted_at: user.deleted_at,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        deleted_at: user.deleted_at,
        menu: MenuScreenAvailable[RoleTypes[user.role]],
      },
    };
  }
}
