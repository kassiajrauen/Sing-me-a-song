import { jest } from "@jest/globals";
import { recommendationRepository } from "../../src/repositories/recommendationRepository";
import { recommendationService } from "../../src/services/recommendationsService.js";
import { recommendationFactory } from "../factories/recommendationFactory.js";

describe("Recommendations test", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  });

  it("should conflict recommendation insert", async () => {
    const music = recommendationFactory();

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValue(music[0]);

    expect(async () => {
      await recommendationService.insert({ ...music });
    }).rejects.toEqual({
      message: "Recommendations names must be unique",
      type: "conflict",
    });
  });
});
