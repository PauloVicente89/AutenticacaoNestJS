import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserRepository } from 'src/core/repositories/user.repository';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { ICriteria } from 'src/shared/interfaces/ICriteria';
import { IPagination } from 'src/shared/interfaces/IPagination';

type Props = {
  criteria?: ICriteria;
  pagination: IPagination;
};

@Injectable()
export default class PrismaUserRepository implements UserRepository {
  private readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async findAll({ criteria, pagination }: Props): Promise<User[]> {
    const page = pagination.page || 1;
    const perPage = pagination.perPage || 20;
    const skip = (page - 1) * perPage;

    const where: any = {};

    if (criteria?.name) {
      where.name = { contains: criteria?.name, mode: 'insensitive' };
    }

    if (criteria?.email) {
      where.email = { contains: criteria?.email, mode: 'insensitive' };
    }

    if (criteria?.active) {
      where.active = { in: criteria?.active };
    }

    if (criteria?.role) {
      where.role = { in: criteria?.role };
    }

    if (criteria?.cellphone) {
      where.cellphone = criteria.cellphone;
    }

    where.deleted_at = null;

    return await this.prisma.user.findMany({
      where: where,
      take: +perPage,
      skip: +skip,
    });
  }

  async findBy(criteria: ICriteria): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: criteria,
    });
  }

  async save(user: CreateUserDto): Promise<User> {
    return await this.prisma.user.create({ data: user });
  }

  async update(user: UpdateUserDto, id: string): Promise<User> {
    return await this.prisma.user.update({
      where: { id },
      data: user,
    });
  }

  async changePassword(id: string, password: string): Promise<void> {
    await this.prisma.user.update({
      where: { id },
      data: { password },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
