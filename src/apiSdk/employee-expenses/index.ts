import axios from 'axios';
import queryString from 'query-string';
import { EmployeeExpenseInterface } from 'interfaces/employee-expense';
import { GetQueryInterface } from '../../interfaces';

export const getEmployeeExpenses = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/employee-expenses${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createEmployeeExpense = async (employeeExpense: EmployeeExpenseInterface) => {
  const response = await axios.post('/api/employee-expenses', employeeExpense);
  return response.data;
};

export const updateEmployeeExpenseById = async (id: string, employeeExpense: EmployeeExpenseInterface) => {
  const response = await axios.put(`/api/employee-expenses/${id}`, employeeExpense);
  return response.data;
};

export const getEmployeeExpenseById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/employee-expenses/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteEmployeeExpenseById = async (id: string) => {
  const response = await axios.delete(`/api/employee-expenses/${id}`);
  return response.data;
};
