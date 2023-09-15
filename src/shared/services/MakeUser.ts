import * as bcrypt from 'bcrypt';
import { randomUUID } from 'crypto';

export class MakeUser {
  static execute(data: any) {
    return {
      ...data,
      id: randomUUID(),
      password: bcrypt.hashSync(data.password, 10),
    };
  }
}
