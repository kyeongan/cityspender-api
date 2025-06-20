import request from "supertest";
import app from "../src/index"; // Make sure you export app = express() in index.ts

describe("Transaction API", () => {
  it("should return health check", async () => {
    const res = await request(app).get("/health");
    expect(res.status).toBe(200);
    expect(res.text).toBe("OK");
  });

  it("should return city report", async () => {
    const res = await request(app).get("/report/city");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return user report with valid user_id", async () => {
    const userId = "u_test_user";
    const res = await request(app)
      .get(`/report/user/${userId}`)
      .query({ start: "2024-01-01T00:00:00Z", end: "2024-12-31T23:59:59Z" });

    expect(res.status).toBe(200);
    expect(res.body.summary).toBeDefined();
    expect(Array.isArray(res.body.byMerchant)).toBe(true);
    expect(Array.isArray(res.body.byCategory)).toBe(true);
  });

  it("should return 400 for invalid user_id", async () => {
    const res = await request(app).get("/report/user/");
    expect(res.status).toBe(404);
  });
});
