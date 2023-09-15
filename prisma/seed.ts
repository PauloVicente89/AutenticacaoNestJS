import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'crypto';
import * as bcrypt from 'bcrypt';
import { Role } from '../src/shared/enums/role';

const prisma = new PrismaClient();

async function main() {
  let randomUserId;

  for (let i = 0; i < 6; i++) {
    randomUserId = randomUUID();
    const user = {
      id: randomUserId,
      name: faker.name.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: bcrypt.hashSync('123456', 10),
      cellphone: faker.phone.number('77#########'),
      active: 1,
      role: Role.ADMIN,
    };
    await prisma.user.create({ data: user });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
