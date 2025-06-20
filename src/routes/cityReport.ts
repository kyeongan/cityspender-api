// src/routes/cityReport.ts
import express from "express";
import { PrismaClient } from "../../generated/prisma";

const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    const report = await prisma.transaction.groupBy({
      by: ["city"],
      _sum: {
        amount: true,
      },
      _count: {
        id: true,
      },
    });
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
