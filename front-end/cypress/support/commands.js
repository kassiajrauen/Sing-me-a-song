Cypress.Commands.add("resetDB", () => {
  cy.request("POST", "http://localhost:5000/e2e/truncate", {});
});

Cypress.Commands.add("insertRecommendation", (music) => {
  cy.visit("http://localhost:3000/");

  cy.get("#name").type(music.name);
  cy.get("#link").type(music.youtubeLink);

  cy.intercept("POST", "http://localhost:5000/recommendations").as(
    "insertNewRecommendation"
  );

  cy.get("Button").click();

  cy.wait("@insertNewRecommendation");
});

Cypress.Commands.add("increaseCounter", () => {
  cy.get("article").within(() => {
    cy.get("div").last().should("have.text", "0");
  });

  cy.get("article").within(() => {
    cy.get("svg:first-of-type").click();
  });

  cy.get("article").within(() => {
    cy.get("div").last().should("have.text", "1");
  });
});

Cypress.Commands.add("decreaseCounter", () => {
  cy.get("article").within(() => {
    cy.get("div").last().should("have.text", "0");
  });

  cy.get("article").within(() => {
    cy.get("svg:last-of-type").click();
  });

  cy.reload();

  cy.get("article").within(() => {
    cy.get("div").last().should("have.text", "-1");
  });
});

Cypress.Commands.add("deleteRecommendation", () => {
  Cypress._.times(6, () => {
    cy.get("article").within(() => {
      cy.get("svg:last-of-type").click();
    });
  });
});
