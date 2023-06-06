import * as yup from 'yup';
import { employeeExpenseValidationSchema } from 'validationSchema/employee-expenses';

export const expenseValidationSchema = yup.object().shape({
  category: yup.string().required(),
  amount: yup.number().integer().required(),
  description: yup.string(),
  date: yup.date().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  business_organization_id: yup.string().nullable().required(),
  employee_expense: yup.array().of(employeeExpenseValidationSchema),
});
