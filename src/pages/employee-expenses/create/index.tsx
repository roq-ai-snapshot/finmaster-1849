import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { useRouter } from 'next/router';
import { createEmployeeExpense } from 'apiSdk/employee-expenses';
import { Error } from 'components/error';
import { employeeExpenseValidationSchema } from 'validationSchema/employee-expenses';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, withAuthorization } from '@roq/nextjs';
import { UserInterface } from 'interfaces/user';
import { ExpenseInterface } from 'interfaces/expense';
import { getUsers } from 'apiSdk/users';
import { getExpenses } from 'apiSdk/expenses';
import { EmployeeExpenseInterface } from 'interfaces/employee-expense';

function EmployeeExpenseCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: EmployeeExpenseInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createEmployeeExpense(values);
      resetForm();
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<EmployeeExpenseInterface>({
    initialValues: {
      created_at: new Date(new Date().toDateString()),
      updated_at: new Date(new Date().toDateString()),
      employee_id: (router.query.employee_id as string) ?? null,
      expense_id: (router.query.expense_id as string) ?? null,
    },
    validationSchema: employeeExpenseValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
  });

  return (
    <AppLayout>
      <Text as="h1" fontSize="2xl" fontWeight="bold">
        Create Employee Expense
      </Text>
      <Box bg="white" p={4} rounded="md" shadow="md">
        {error && <Error error={error} />}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="created_at" mb="4">
            <FormLabel>Created At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.created_at}
              onChange={(value: Date) => formik.setFieldValue('created_at', value)}
            />
          </FormControl>
          <FormControl id="updated_at" mb="4">
            <FormLabel>Updated At</FormLabel>
            <DatePicker
              dateFormat={'dd/MM/yyyy'}
              selected={formik.values?.updated_at}
              onChange={(value: Date) => formik.setFieldValue('updated_at', value)}
            />
          </FormControl>
          <AsyncSelect<UserInterface>
            formik={formik}
            name={'employee_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.email}
              </option>
            )}
          />
          <AsyncSelect<ExpenseInterface>
            formik={formik}
            name={'expense_id'}
            label={'Select Expense'}
            placeholder={'Select Expense'}
            fetcher={getExpenses}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.category}
              </option>
            )}
          />
          <Button isDisabled={!formik.isValid || formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default withAuthorization({
  service: AccessServiceEnum.PROJECT,
  entity: 'employee_expense',
  operation: AccessOperationEnum.CREATE,
})(EmployeeExpenseCreatePage);
