import * as yup from 'yup';
import { expenseValidationSchema } from 'validationSchema/expenses';
import { financialForecastValidationSchema } from 'validationSchema/financial-forecasts';
import { financialReportValidationSchema } from 'validationSchema/financial-reports';

export const businessOrganizationValidationSchema = yup.object().shape({
  name: yup.string().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  expense: yup.array().of(expenseValidationSchema),
  financial_forecast: yup.array().of(financialForecastValidationSchema),
  financial_report: yup.array().of(financialReportValidationSchema),
});
