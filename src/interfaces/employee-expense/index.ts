import { UserInterface } from 'interfaces/user';
import { ExpenseInterface } from 'interfaces/expense';

export interface EmployeeExpenseInterface {
  id?: string;
  employee_id: string;
  expense_id: string;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  expense?: ExpenseInterface;
  _count?: {};
}
