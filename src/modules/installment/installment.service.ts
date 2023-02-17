import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class InstallmentService {
  constructor(private prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.transaction.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }
}
