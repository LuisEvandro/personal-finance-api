import { CategoryDTO } from 'src/modules/category/category.dto';
import { InstallmentDTO } from '../installment/installment.dto';

export type TransactionDTO = {
  id?: string;
  name?: string;
  description?: string;
  category?: CategoryDTO;
  categoryId: string;
  value?: number;
  type?: string;
  payment_method?: string;
  installment?: InstallmentDTO;
  installmentId?: string;
  created_at: Date;
  updated_at?: Date;
};
