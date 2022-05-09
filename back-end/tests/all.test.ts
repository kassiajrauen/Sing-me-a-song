import app from "../src/app.js";
import supertest from "supertest";
import {prisma} from "../src/database.js";
import recommendationsBodyFactory from "./factories/recommendationBodyFactory.js";

describe("POST /recommendations", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return 201 given a valid body", async () => {
    const music = recommendationsBodyFactory();

    const response = await supertest(app)
      .post("/recommendations").send(music);
    const createdMusic = await prisma.recommendation.findUnique({ 
      where: { name: music.name}
    })

    expect(createdMusic).not.toBeNull();
    expect(response.status).toEqual(201);
  })

  it("should return 422 given an invalid body", async () => {
    const music = recommendationsBodyFactory();

    const response = await supertest(app).post("/recommendations").send(music);

    expect(response.status).toEqual(201);
  })
});
