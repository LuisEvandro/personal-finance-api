import { Module } from '@nestjs/common';
import { CategoryModule } from './modules/category/category.module';
import { InstallmentModule } from './modules/installment/installment.module';
import { TransactionModule } from './modules/transaction/transaction.module';

@Module({
  imports: [CategoryModule, TransactionModule, InstallmentModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
