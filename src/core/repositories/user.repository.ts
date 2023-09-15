import { User } from '@prisma/client';
import { CreateUserDto } from 'src/modules/user/dto/create-user.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { ICriteria } from 'src/shared/interfaces/ICriteria';
import { IPagination } from 'src/shared/interfaces/IPagination';

type Props = {
  criteria?: ICriteria;
  pagination?: IPagination;
};

export abstract class UserRepository {
  abstract findAll({ criteria, pagination }: Props): Promise<User[]>;
  abstract findBy(criteria: ICriteria): Promise<User | null>;
  abstract save(data: CreateUserDto): Promise<User>;
  abstract update(data: UpdateUserDto, id: string): Promise<User>;
  abstract changePassword(id: string, password: string): Promise<void>;
  abstract delete(id: string): Promise<void>;
}
