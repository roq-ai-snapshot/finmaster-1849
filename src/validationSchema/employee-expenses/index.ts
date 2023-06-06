import * as yup from 'yup';

export const employeeExpenseValidationSchema = yup.object().shape({
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  employee_id: yup.string().nullable().required(),
  expense_id: yup.string().nullable().required(),
});
