import recommendationBodyFactory from "./factories/recommendationBodyFactory.js";

describe("Home page", () => {
  beforeEach(() => {
    cy.request("POST", "http://localhost:5000/e2e/truncate", {});
  });

  it("should insert a new recommendation successfully", () => {
    const music = recommendationBodyFactory();

    cy.visit("http://localhost:3000");

    cy.get("#name").type(music.name);
    cy.get("#link").type(music.youtubeLink);

    cy.intercept("POST", "http://localhost:5000/recommendations").as(
      "insertNewRecommendation"
    );

    cy.get("Button").click();

    cy.wait("@insertNewRecommendation");

    cy.end();
  });
});
