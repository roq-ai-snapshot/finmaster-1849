import { EmployeeExpenseInterface } from 'interfaces/employee-expense';
import { UserInterface } from 'interfaces/user';
import { BusinessOrganizationInterface } from 'interfaces/business-organization';

export interface ExpenseInterface {
  id?: string;
  category: string;
  amount: number;
  description?: string;
  date: Date;
  user_id: string;
  business_organization_id: string;
  created_at?: Date;
  updated_at?: Date;
  employee_expense?: EmployeeExpenseInterface[];
  user?: UserInterface;
  business_organization?: BusinessOrganizationInterface;
  _count?: {
    employee_expense?: number;
  };
}
