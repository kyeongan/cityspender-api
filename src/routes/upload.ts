// src/routes/upload.ts
import express from "express";
import multer from "multer";
import csv from "csv-parser";
import fs from "fs";
import { PrismaClient } from "../../generated/prisma";

const router = express.Router();
const prisma = new PrismaClient();
const upload = multer({ dest: "uploads/" });

interface CSVRow {
  user_id: string;
  city: string;
  merchant: string;
  amount: string;
  currency: string;
  category: string;
  timestamp: string;
}

router.post("/", upload.single("file"), async (req: any, res) => {
  const filePath = req.file?.path;

  if (!filePath) return res.status(400).json({ error: "No file uploaded" });

  const results: CSVRow[] = [];

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (data: CSVRow) => results.push(data))
    .on("end", async () => {
      try {
        const validRows = results.map((row) => ({
          user_id: row.user_id,
          city: row.city,
          merchant: row.merchant,
          amount: parseFloat(row.amount),
          currency: row.currency,
          category: row.category,
          timestamp: new Date(row.timestamp),
        }));

        await prisma.transaction.createMany({ data: validRows });

        fs.unlinkSync(filePath); // Clean up uploaded file
        res.status(201).json({ inserted: validRows.length });
      } catch (err) {
        res.status(500).json({ error: "Failed to parse or insert CSV" });
      }
    });
});

export default router;
