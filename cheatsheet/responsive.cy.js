describe(" Test Automation - Cypress", () => {
  it("TC1- Viewport Test", () => {
    cy.viewport(990, 760);
    cy.visit("https://www.amazon.com");
  });

  it("Tc2- Viewport Test", () => {
    cy.viewport("iphone-3");
    cy.visit("https://www.amazon.com");
  });
  it("TC3- Viewport Test", () => {
    cy.viewport("iphone-3", "landscape");
    cy.visit("https://www.amazon.com");
  });
  it("TC4- Viewport Test", () => {
    cy.viewport("ipad-mini");
    cy.visit("https://www.amazon.com");
  });
  it("TC5- Viewport Test", () => {
    cy.viewport("macbook-16");
    cy.visit("https://www.amazon.com");
  });
  it("TC6- Viewport Test", () => {
    cy.viewport("samsung-s10");
    cy.visit("https://www.amazon.com");
  });
  it("TC6- Viewport Test", () => {
    cy.viewport("samsung-s3");
    cy.visit("https://www.amazon.com");
  });
});
