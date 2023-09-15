import { UserRepository } from '@core/repositories/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { ICriteria } from 'src/shared/interfaces/ICriteria';
import { IPagination } from 'src/shared/interfaces/IPagination';
import { User } from '@prisma/client';

type Props = {
  criteria?: ICriteria;
  pagination?: IPagination;
};

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll({ criteria, pagination }: Props): Promise<User[]> {
    return await this.userRepository.findAll({ criteria, pagination });
  }

  async findBy(criteria: ICriteria): Promise<User | null> {
    return await this.userRepository.findBy(criteria);
  }

  async save(data: CreateUserDto): Promise<User> {
    return await this.userRepository.save(data);
  }

  async update(id: string, data: UpdateUserDto): Promise<User> {
    return await this.userRepository.update(data, id);
  }

  async changePassword(id: string, body: ChangePasswordDto): Promise<void> {
    const user = await this.findBy({ id });

    if (!user) {
      throw new BadRequestException('usuário não encontrado');
    }
    if (!this.comparePassword(body.old_password, user.password)) {
      throw new BadRequestException('Senha anterior incorreta!');
    }
    const newPassword = this.encriptPassword(body.new_password);
    return await this.userRepository.changePassword(id, newPassword);
  }

  encriptPassword(passwordPlain: string): string {
    return bcrypt.hashSync(passwordPlain, 10);
  }

  comparePassword(passwordPlain: string, passwordEncripted: string): boolean {
    return bcrypt.compareSync(passwordPlain, passwordEncripted);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.update(
      {
        deleted_at: new Date(),
        hash_password: null,
      },
      id,
    );
  }

  async restore(id: string): Promise<void> {
    await this.userRepository.update(
      {
        deleted_at: null,
        hash_password: null,
      },
      id,
    );
  }
}
