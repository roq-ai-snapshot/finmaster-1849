import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { expenseValidationSchema } from 'validationSchema/expenses';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getExpenses();
    case 'POST':
      return createExpense();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getExpenses() {
    const data = await prisma.expense
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'expense'));
    return res.status(200).json(data);
  }

  async function createExpense() {
    await expenseValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.employee_expense?.length > 0) {
      const create_employee_expense = body.employee_expense;
      body.employee_expense = {
        create: create_employee_expense,
      };
    } else {
      delete body.employee_expense;
    }
    const data = await prisma.expense.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
