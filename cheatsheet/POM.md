# Why implement *e2e tests* in *TypeScript* following *Page Object* pattern?

:information_source: Example based on TypeScript/Cypress. But this can be apply on **any language** (Java, C#, ...) or **any library** (Selenium, ...).

## Problems

### Bad practice: list selector actions

```javascript
it('Login & display basket', {
    cy.visit("http://sample.test");
    cy.get('form input[name="email"]').type("...");
    cy.get('form input[name="password"]').type("...");
    cy.get('form button').click();
    cy.get("#bascket").click();
    cy.get('#articles').then(it => expect(it).to.have.length(0));
});
```

Problems:
* **not readable**: it's a technical code
* `cy.get()`, `.type()`, `.click()` are functions **linked to the library**: everyone have to know this library
* **code duplication** (ex: `cy.visit()`): many block codes should be reused elsewhere

### 1st solution: define reusable functions

There are frequently common steps in tests.
We can define *shared functions*:
```javascript
function openApp() {
    cy.visit("http://sample.test");
}
function fillEmail(value) {
    cy.get('form input[name="email"]').type(value);
}
function withArticles(fct) {
    cy.get('#articles').then(fct);
}
// [...]
```
```javascript
it('Login & display basket', {
    openApp();
    fillEmail("...");
    fillPassword("...");
    clickOnLoginButton();
    clickOnBasketButton();
    withArticles(it => expect(it).to.have.length(0));
});
```

Problems:
* **lot of not maintainable functions** (often without organisation)
* **no help from compiler**: if you mess up some lines, the error occurs later (not during compilation, but during runtime)

## Towards a better solution

### The *Page Object* pattern

This pattern organizes code with:
* 1 page per 1 class
* 1 action per 1 method

:book: [Full documentation](https://martinfowler.com/bliki/PageObject.html)

```javascript
function opennApp() {
    cy.visit("http://sample.test");
    return new LoginPage();
}

class LoginPage {
    fillEmail(value) {
        cy.get('form input[name="email"]').type(value);
        return this;
    }
    fillPassword(value) {
        cy.get('form input[name="password"]').type(value);
        return this;
    }
    clickOnSubmit() {
        cy.get('input[type="button"]').click();
        return new HomePage();
    }
}

class HomePage {
    clickOnBasketButton() {
        cy.get("#bascket").click();
        return new BasketPage();
    }
}

class BasketPage {
    withArticles(fct) {
        cy.get('#articles').then(fct);
        return this;
    }
}
```

```javacript
it('Login & display basket', {
    openApp()
        .fillEmail("...")
        .fillPassword("...")
        .clickOnSubmit()
        .clickOnBasketButton()
        .withArticles(it => expect(it).to.have.length(0));
});
```

Advantages:
* **modeling**: actions are organized (classes & methods)
* **restriction**: you cannot execute action if it's not possible (`TypeError: (intermediate value).doSomething is not a function`)

### A statically-typed language

Advantages:
* **accelerates test implementation**: IDE offers authorized functions
* help **refactoring**: you can apply TDD methodology (if new feature require workflow modification, first you will modify page-object layout and then compiler will help you to adapt all tests requiring modification)
* **secures** tests:
    ```typescript
    it('Login & display basket', {
        openApp()
            .clickOnBasketButton() // Property 'clickOnBasketButton' does not exist on type 'LoginPage'.
        // ...
    });
    ```
