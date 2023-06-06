import { UserInterface } from 'interfaces/user';
import { BusinessOrganizationInterface } from 'interfaces/business-organization';

export interface FinancialForecastInterface {
  id?: string;
  forecast_type: string;
  start_date: Date;
  end_date: Date;
  user_id: string;
  business_organization_id: string;
  created_at?: Date;
  updated_at?: Date;

  user?: UserInterface;
  business_organization?: BusinessOrganizationInterface;
  _count?: {};
}
