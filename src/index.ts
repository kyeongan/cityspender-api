// src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from "../generated/prisma";
import cityReportRouter from './routes/cityReport';
import healthRouter from './routes/health';
import uploadRouter from './routes/upload';
import userReportRouter from './routes/userReport';
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";

dotenv.config();
const app = express();
const prisma = new PrismaClient();

// Load Swagger documentation
const swaggerDocument = YAML.load(path.join(__dirname, "../docs/swagger.yaml"));
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

// Serve static files from docs directory (for GitHub Pages compatibility)
app.use(express.static(path.join(__dirname, '../docs')));

// Serve landing page at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../docs/index.html'));
});

app.use('/report/city', cityReportRouter);
app.use('/health', healthRouter);
app.use('/upload', uploadRouter);
app.use('/report/user', userReportRouter);

const PORT = process.env.PORT || 3000;
export default app;

// Only start the server if this file is run directly
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
