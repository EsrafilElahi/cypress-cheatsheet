describe("API Test using plugin cypress-plugin-api", () => {
  it("test api - GET ", () => {

    cy.api("GET", "https://reqres.in/api/users?page=2").should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it("POST API testing Using Cypress API Plugin", () => {
    cy.api("POST", "https://reqres.in/api/users", {
      name: "Anshita",
      job: "QA leader",
    }).should((response) => {
      expect(response.status).to.eq(201);
    });
  });
  it("DELETE API testing Using Cypress API Plugin", () => {
    cy.api("DELETE", "https://reqres.in/api/users/2").should((response) => {
      expect(response.status).to.eq(204);
    });
  });
  it('.as() - alias a route for later use', () => {
    // Alias the route to wait for its response
    cy.intercept('GET', '**/comments/*').as('getComment')

    // we have code that gets a comment when
    // the button is clicked in scripts.js
    cy.get('.network-btn').click()

    // https://on.cypress.io/wait
    cy.wait('@getComment').its('response.statusCode').should('eq', 200)
  })
});
