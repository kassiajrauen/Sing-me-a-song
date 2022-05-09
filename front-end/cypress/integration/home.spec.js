import recommendationBodyFactory from "./factories/recommendationBodyFactory.js";

describe("Home page", () => {
  beforeEach(() => {
    cy.resetDB();
  });

  it("should insert a new recommendation successfully", () => {
    const music = recommendationBodyFactory();

    cy.insertRecommendation(music);
    cy.contains(music.name);

    cy.end();
  });

  it("should increase to recommendation counter", () => {
    const music = recommendationBodyFactory();

    cy.insertRecommendation(music);

    cy.reload();
    cy.contains(music.name);

    cy.increaseCounter();

    cy.end();
  });

  it("should decrease to recommendation counter", () => {
    const music = recommendationBodyFactory();

    cy.insertRecommendation(music);

    cy.contains(music.name);
    cy.decreaseCounter();

    cy.end();
  });

  it("should delete the recommendation if it has -5 votes", () => {
    const music = recommendationBodyFactory();

    cy.insertRecommendation(music);

    cy.contains(music.name);
    cy.deleteRecommendation();

    cy.contains("No recommendations yet! Create your own :)");

    cy.end();
  });

  it("should navigate between pages", () => {
    cy.visit("http://localhost:3000");

    cy.get("#home").click();
    cy.url().should("eq", "http://localhost:3000/");

    cy.get("#top").click();
    cy.url().should("eq", "http://localhost:3000/top");

    cy.get("#random").click();
    cy.url().should("eq", "http://localhost:3000/random");
  });
});
