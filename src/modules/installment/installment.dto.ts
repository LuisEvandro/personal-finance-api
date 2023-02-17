export type InstallmentDTO = {
  id?: string;
  quantity: number;
  startPay: Date;
  finalPay: Date;
  created_at: Date;
  updated_at?: Date;
};
