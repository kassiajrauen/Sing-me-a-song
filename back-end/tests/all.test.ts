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

describe("POST /recommendations/:id/upvote", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return status 200 given a valid body", async () => {
    const music = recommendationsBodyFactory();

    await prisma.recommendation.create({data: {...music}}
    );

    const createdMusic = await prisma.recommendation.findUnique({ 
      where: { name: music.name}
    })
    const response = await supertest(app).post(`/recommendations/${createdMusic.id}/upvote`).send()
    const result = await prisma.recommendation.findUnique({where: {name: music.name}})

    expect(result.score).toBeLessThanOrEqual(1)
    expect(response.status).toEqual(200)
  })
})

describe("POST /recommendations/:id/downvote", () =>{
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return status 200 given a valid body", async () => {
    const music = recommendationsBodyFactory();

    await prisma.recommendation.create({data: {...music}}
    );

    const createdMusic = await prisma.recommendation.findUnique({ 
      where: { name: music.name}
    })
    const response = await supertest(app).post(`/recommendations/${createdMusic.id}/downvote`).send()
    const result = await prisma.recommendation.findUnique({where: {name: music.name}})

    expect(result.score).toBeLessThanOrEqual(-1)
    expect(response.status).toEqual(200)
  })

  it.todo("should exclude recommendation", )
})

describe("GET /recommendations", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return 200 when the recommendation is an array", async () => {
    const music = recommendationsBodyFactory();

    await prisma.recommendation.create({data: {...music}}
    );

    const response = await supertest(app).get(`/recommendations`)

    expect(response.body.length).toBeGreaterThan(0) 
    expect(response.body.length).not.toBeNull() 
    expect(response.status).toEqual(200)  
  })
})

describe("GET /recommendations/:id", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`;
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("should return 200 when the recommendation is valid", async () => {
    const music = recommendationsBodyFactory();

    const createdMusic = await prisma.recommendation.create({data: {...music}}
      );

    const response = await supertest(app).get(`/recommendations/${createdMusic.id}`);

    expect(response.body).toEqual(createdMusic);
    expect(response.status).toEqual(200); 
  })
})

