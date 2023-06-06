import axios from 'axios';
import queryString from 'query-string';
import { FinancialForecastInterface } from 'interfaces/financial-forecast';
import { GetQueryInterface } from '../../interfaces';

export const getFinancialForecasts = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/financial-forecasts${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFinancialForecast = async (financialForecast: FinancialForecastInterface) => {
  const response = await axios.post('/api/financial-forecasts', financialForecast);
  return response.data;
};

export const updateFinancialForecastById = async (id: string, financialForecast: FinancialForecastInterface) => {
  const response = await axios.put(`/api/financial-forecasts/${id}`, financialForecast);
  return response.data;
};

export const getFinancialForecastById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/financial-forecasts/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFinancialForecastById = async (id: string) => {
  const response = await axios.delete(`/api/financial-forecasts/${id}`);
  return response.data;
};
