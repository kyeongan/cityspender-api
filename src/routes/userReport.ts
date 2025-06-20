// src/routes/userReport.ts
import express from 'express';
import { PrismaClient } from "../../generated/prisma";
import { dateRangeSchema, userReportParamsSchema } from '../utils/validator';

const router = express.Router();
const prisma = new PrismaClient();

router.get('/:user_id', async (req, res) => {
  // Inside /report/user/:user_id route
  const paramParse = userReportParamsSchema.safeParse(req.params);
  const queryParse = dateRangeSchema.safeParse(req.query);

  if (!paramParse.success || !queryParse.success) {
    return res
      .status(400)
      .json({
        error: "Invalid parameters",
        details: {
          param: paramParse.error?.issues,
          query: queryParse.error?.issues,
        },
      });
  }

  const { user_id } = req.params;
  const { start, end } = req.query;

  try {
    const where: any = { user_id };

    if (start || end) {
      where.timestamp = {};
      if (start) where.timestamp.gte = new Date(start as string);
      if (end) where.timestamp.lte = new Date(end as string);
    }

    const summary = await prisma.transaction.aggregate({
      where,
      _sum: { amount: true },
      _count: { id: true },
    });

    const byMerchant = await prisma.transaction.groupBy({
      by: ["merchant"],
      where,
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { _sum: { amount: "desc" } },
    });

    const byCategory = await prisma.transaction.groupBy({
      by: ["category"],
      where,
      _sum: { amount: true },
      _count: { id: true },
      orderBy: { _sum: { amount: "desc" } },
    });

    res.json({
      summary,
      byMerchant,
      byCategory,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;