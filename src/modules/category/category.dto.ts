export type CategoryDTO = {
  id?: string;
  name: string;
  color: string;
  description?: string;
  status: boolean;
  created_at: Date;
  updated_at?: Date;
};
