/// <reference types="cypress" />
import "cypress-real-events/support";

// locate elements
cy.get("#id");
cy.get(".className");
cy.get(".div>li");

// should
cy.get("#id").should("exist");
cy.get("#id").should("have.class", "active-class");
cy.get(".div>li").should("have.length", 3);
cy.get(".div>li")
  .should("have.length", 3)
  .and("have.attr", "href")
  .and("include", "test.com");
cy.get(".div>li").should("have.css", "color", "red");
cy.get(".cls").should("have.attr", "data-id", "123");
cy.get(".cls").should("have.value", "test-value");
cy.get(".cls").should("be.visible");
cy.get(".cls").should("not.be.visible");
cy.get(".cls").should("be.disabled");
cy.get(".cls").should("not.be.disabled");
cy.get(".cls").should("be.enabled");
cy.get(".cls").should("not.be.enabled");
cy.get(".cls").should("not.be.NaN");
cy.get(".cls").should("be.NaN");
cy.get(".cls").should("be.focused");
cy.get(".cls").should("have.focus");
cy.get(".cls").should("be.empty");
cy.get(".cls").should("not.be.empty");
cy.get("input#male").should("be.checked");
cy.get("li:first").click();
cy.get(".my-elem")
  .should("have.property", "name", "esrafil")
  .should("have.property", "family", "elahi");

// eq ---> index
cy.get("#selector").eq(2);
cy.get(".test").should("contain", "item1");
cy.get('input[name="my-radio-btn"]').should("not.be.checked");
cy.get(".arr").should("be.an", "array");
cy.get("#my-elem").should("have.text", "hello world");
cy.getByTestId("todos-list")
  .find("li")
  .first()
  .should("have.attr", "data-testid", "todo-item")
  .and("be.visible");

cy.visit("https://cypress.io");
cy.title().should(
  "eq",
  "JavaScript End to End Testing Framework | cypress.io testing tools"
);
cy.title().should("include", "End to End Testing Framework");
cy.visit("https://play2.automationcamp.ir/index.html");
cy.get("td").filter("#td_id");
cy.get("input[name=q]").type("Cypress").type("{backspace}{home}{del}");
cy.get("input[name=q]").type("{selectall}{del}");

// contains
cy.get("#my-elem").contains("hello world");
cy.get('[alt="iphone"]').as("iphone");
cy.contains("li", "item1");
cy.contains("span", "Not Unique Text");
cy.get("li").contains("item1");
cy.get("@iphone").click();
cy.visit("https://www.amazon.ae/");
cy.contains("Best Sellers").should("be.visible");

// wrap
cy.wrap([2, 4, 6, 1]).should("be.an", "array").and("have.length", 4);

// events
cy.get("button").click();
cy.get("button").dblclick();
cy.get("button").rightclick();
cy.get("button").realHover("mouse");
cy.get("Sign Up").click({ force: true });
cy.get("input[type=email]").type("esrafil.elahi@gmail.com");
cy.get('[placeholder="name"]').type("hi ${enter}");
cy.get("#elem").type("hi ${control} ${a}");
cy.get('input[type="text"').type("hello", { force: true, delay: 100 });
cy.get("#search-field").clear();
cy.contains("ADDONS", { matchCase: false });
cy.get("#button-cart").first().clear();
cy.get('[type="checkbox"]').check();
cy.get('[type="checkbox"]').uncheck();
cy.get("#select").select("Avatar");
cy.get("#select").select("Avatar", { force: true });
cy.get("input[name=q]").type("I'm typing fast", { delay: 0 });
cy.wait(1000);
cy.get("#select-demo").select("Wednesday");
cy.get("#select-demo").select(4).should("have.value", "Wednesday");
cy.get("input[type=checkbox]").check(["JAVA", "PYTHON", "JAVASCRIPT"]);
cy.get("#mat-chip-list-0").within(function () {
  cy.contains("Orange");
});

cy.get("[role=button][title=Increase]")
  .realMouseDown()
  .wait(3000)
  .realMouseUp();

cy.visit("https://www.google.com/");
cy.get("input[name=q]")
  .type("Cypress")
  .realPress(["Control", "A"])
  .realPress(["Control", "X"])
  .realPress(["Control", "V"]);

// api requests
cy.intercept("GET", "api/endpoint").as("resApi");
cy.get("@resApi").should("exist");
cy.intercept("POST", "api/endpoint")
  .then((res) => res.json())
  .then((response) => cy.log(response));

fetch("https://api.spacexdata.com/v3/missions")
  .then((resp) => resp.json())
  .then((data) => {
    console.log(data);
  });

cy.request("GET", "https://api.spacexdata.com/v3/missions").as("missions");
cy.get("@missions").then(function (response) {
  expect(response.status).to.equal(200);
});

// plugin cypress-plugin-api
cy.api("GET", "https://reqres.in/api/users?page=2").should((response) => {
  expect(response.status).to.eq(200);
});

// scrolls
cy.scrollTo(0, 500);
cy.scrollTo("topRight");
cy.scrollTo("bottom");
cy.scrollTo("100%", "10%");
cy.scrollTo(0, 100);
cy.scrollTo("topLeft");

// browsers
cy.getCookie("my-cookie").then((cookie) => {
  cy.log(cookie.name);
  cy.log(cookie.value);
});
cy.clearCookie();
cy.url().then((url) => {
  console.log(url); // logs the current URL
});
cy.location().then((location) => {
  console.log(location.href); // logs the current URL
  console.log(location.hostname); // logs the current hostna
  console.log(location.pathname); // logs the current pathna
  console.log(location.search); // logs the current search p
});
cy.reload();
cy.viewport(430, 480); // 430 --> width , 480 --> height
cy.on("window:alert", function (message) {
  expect(message).eq("I am a JS Alert");
});

// function
const myFunc = () => {
  console.log("my func");
};
cy.spy(myFunc); // spy it
myFunc(); // call function
cy.get("@myfunc").should("have.been.calledOnce");

cy.get(".list").eq(2);
cy.get(".list").eq(2).should("have.text", "list test");
cy.get("li").first().should("contain", "item1");
cy.get("li").last().should("contain", "item4");
cy.get("li").parent().should("have.class", "elem-parent");
cy.get(".child-element").parents().should("have.length", 2);
cy.get(".parent-element").children().should("have.length", 2);
cy.get(".child-element-2").siblings().should("have.length", 2);
cy.get("textarea#box").type(
  "Cypress is a next generation front end testing tool built for then testing modern applications.",
  { delay: 0 }
);

// JQuery
cy.get("#fname")
  .type("Cypress")
  .then((el) => {
    let input_value = el.val();
    expect(input_value).to.eq("Cypress");
  });

cy.get("tr").then(function ($list) {
  cy.log($list.length);
});

// within --> goto inside element
cy.get("tbody>tr")
  .eq(2)
  .within(function () {
    cy.get("td:first-child").should("have.text", "Pheobe");
    cy.get("td:eq(0)").should("have.text", "Pheobe");
    cy.get("td").eq(0).should("have.text", "Pheobe");
    cy.get("td").first().should("have.text", "Pheobe");
  });

cy.get("table")
  .contains("Smith")
  .parent()
  .within(function () {
    cy.get("td").eq(4).should("have.text", "Actor");
  });

cy.get("tbody th").each(function ($el, index) {
  if ($el.text() === "Occupation") {
    cy.get("table")
      .contains("Smith")
      .parent()
      .within(function () {
        cy.get("td").eq(index).should("have.text", "Actor");
      });
  }
});

describe("Implicit Assertions", () => {
  it(".should() - make an assertion about the current subject", () => {
    // https://on.cypress.io/should
    cy.get(".assertion-table")
      .find("tbody tr:last")
      .should("have.class", "success")
      .find("td")
      .first()
      // checking the text of the <td> element in various ways
      .should("have.text", "Column content")
      .should("contain", "Column content")
      .should("have.html", "Column content")
      // chai-jquery uses "is()" to check if element matches selector
      .should("match", "td")
      // to match text content against a regular expression
      // first need to invoke jQuery method text()
      // and then match using regular expression
      .invoke("text")
      .should("match", /column content/i);

    // a better way to check element's text content against a regular expression
    // is to use "cy.contains"
    // https://on.cypress.io/contains
    cy.get(".assertion-table")
      .find("tbody tr:last")
      // finds first <td> element with text content matching regular expression
      .contains("td", /column content/i)
      .should("be.visible");

    // for more information about asserting element's text
    // see https://on.cypress.io/using-cypress-faq#How-do-I-get-an-element’s-text-contents
  });
});
