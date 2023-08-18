import testData from "../fixtures/login.json";
const testValue = require("../fixtures/login.json");

describe("Automation using Cypress|| Fixtures", () => {
  let data;
  before(() => {
    cy.visit(
      "https://ecommerce-playground.lambdatest.io/index.php?route=account/login"
    );
    cy.fixture("login").then((value) => {
      data = value;
    });
  });

  it("Login into the application using fixture data", () => {
    cy.get('input[name="email"]').type(testValue.email);
    cy.get('input[name="password"]').type(testValue.password);
    cy.get('input[type="submit"]').click();
  });
});

fetch("https://api.spacexdata.com/v3/missions")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
  });
