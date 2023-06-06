import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { expenseValidationSchema } from 'validationSchema/expenses';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.expense
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getExpenseById();
    case 'PUT':
      return updateExpenseById();
    case 'DELETE':
      return deleteExpenseById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getExpenseById() {
    const data = await prisma.expense.findFirst(convertQueryToPrismaUtil(req.query, 'expense'));
    return res.status(200).json(data);
  }

  async function updateExpenseById() {
    await expenseValidationSchema.validate(req.body);
    const data = await prisma.expense.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteExpenseById() {
    const data = await prisma.expense.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
