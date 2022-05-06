import app from "../src/app.js";
import supertest from "supertest";
import {prisma} from "../src/database.js";

describe("test", async () => {

    beforeEach(async () => {
        await prisma.$executeRaw`TRUNCATE TABLE receitas;`;
      });

      afterAll(async () => {
        await prisma.$disconnect();
   });
});