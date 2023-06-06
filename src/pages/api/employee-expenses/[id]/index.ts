import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { employeeExpenseValidationSchema } from 'validationSchema/employee-expenses';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.employee_expense
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getEmployeeExpenseById();
    case 'PUT':
      return updateEmployeeExpenseById();
    case 'DELETE':
      return deleteEmployeeExpenseById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getEmployeeExpenseById() {
    const data = await prisma.employee_expense.findFirst(convertQueryToPrismaUtil(req.query, 'employee_expense'));
    return res.status(200).json(data);
  }

  async function updateEmployeeExpenseById() {
    await employeeExpenseValidationSchema.validate(req.body);
    const data = await prisma.employee_expense.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });
    return res.status(200).json(data);
  }
  async function deleteEmployeeExpenseById() {
    const data = await prisma.employee_expense.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
