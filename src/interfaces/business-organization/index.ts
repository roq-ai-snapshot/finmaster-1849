import { ExpenseInterface } from 'interfaces/expense';
import { FinancialForecastInterface } from 'interfaces/financial-forecast';
import { FinancialReportInterface } from 'interfaces/financial-report';
import { UserInterface } from 'interfaces/user';

export interface BusinessOrganizationInterface {
  id?: string;
  name: string;
  user_id: string;
  created_at?: Date;
  updated_at?: Date;
  expense?: ExpenseInterface[];
  financial_forecast?: FinancialForecastInterface[];
  financial_report?: FinancialReportInterface[];
  user?: UserInterface;
  _count?: {
    expense?: number;
    financial_forecast?: number;
    financial_report?: number;
  };
}
