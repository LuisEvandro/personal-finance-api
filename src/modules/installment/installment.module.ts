import { Module } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma.service';
import { InstallmentController } from './installment.controller';
import { InstallmentService } from './installment.service';

@Module({
  controllers: [InstallmentController],
  providers: [InstallmentService, PrismaService],
})
export class InstallmentModule {}
