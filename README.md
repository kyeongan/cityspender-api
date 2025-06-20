# CitySpender API 🚀

A real-world style API for city-wide and user-specific transaction analytics.  
✅ Built with Node.js + Express + TypeScript + Prisma  
✅ Powered by PostgreSQL (via Docker)  
✅ Features Swagger docs, Postman collection, and Jest tests  

---

## 🌟 Features
- Upload transaction data via CSV
- Generate city-level spend reports (with optional date filters)
- Generate user-specific reports (with merchant/category breakdowns)
- OpenAPI (Swagger) documentation at `/docs`
- Postman collection included in repo
- Seed realistic data with Faker
- Ready for Docker + GitHub Actions CI

---

## 🚀 Quick Start

### 1️⃣ Clone + Install
```bash
git clone https://github.com/yourname/cityspender-api.git
cd cityspender-api
npm install
```

### 2️⃣ Start Postgres with Docker
```bash
docker-compose up -d
```

### 3️⃣ Run Prisma Migrations + Seed Data
```bash
npx prisma migrate dev --name init
npx prisma generate
npx ts-node scripts/seed.ts
```

### 4️⃣ Start API
```bash
npx ts-node-dev src/index.ts
```

Access Swagger UI at [http://localhost:3000/docs](http://localhost:3000/docs)

---

## 📬 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| `POST` | `/transactions/upload` | Upload transactions CSV |
| `GET` | `/report/city` | City-wide report (supports `start`, `end`) |
| `GET` | `/report/user/:user_id` | User-specific report |

---

## 🧪 Tests
```bash
npm run test
```

---

## 📂 Postman + Swagger
- [Swagger UI](http://localhost:3000/docs)
- Import `CitySpender.postman_collection.json` in Postman

---

## 🐳 Docker Compose
```yaml
version: '3.8'
services:
  db:
    image: postgres:15
    restart: always
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: cityspender
    ports:
      - '5432:5432'
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:
```

---

## ⚡ Stack
- Node.js + Express + TypeScript
- PostgreSQL + Prisma
- Docker (Postgres DB)
- Jest + Supertest
- Swagger + Postman

---

## 📄 License
MIT