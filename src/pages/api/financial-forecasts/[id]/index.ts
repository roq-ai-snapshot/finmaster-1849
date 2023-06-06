import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { financialForecastValidationSchema } from 'validationSchema/financial-forecasts';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.financial_forecast
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getFinancialForecastById();
    case 'PUT':
      return updateFinancialForecastById();
    case 'DELETE':
      return deleteFinancialForecastById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getFinancialForecastById() {
    const data = await prisma.financial_forecast.findFirst(convertQueryToPrismaUtil(req.query, 'financial_forecast'));
    return res.status(200).json(data);
  }

  async function updateFinancialForecastById() {
    await financialForecastValidationSchema.validate(req.body);
    const data = await prisma.financial_forecast.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteFinancialForecastById() {
    const data = await prisma.financial_forecast.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
