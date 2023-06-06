import * as yup from 'yup';

export const financialReportValidationSchema = yup.object().shape({
  report_type: yup.string().required(),
  start_date: yup.date().required(),
  end_date: yup.date().required(),
  created_at: yup.date().required(),
  updated_at: yup.date().required(),
  user_id: yup.string().nullable().required(),
  business_organization_id: yup.string().nullable().required(),
});
