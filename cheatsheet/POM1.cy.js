// LoginPage.js
class LoginPage {
  visit() {
    cy.visit('/login');
  }

  fillUsername(username) {
    cy.get('#username').type(username);
  }

  fillPassword(password) {
    cy.get('#password').type(password);
  }

  submitLogin() {
    cy.get('button[type="submit"]').click();
  }
}

export default new LoginPage();

// login.spec.js
import LoginPage from './LoginPage';

describe('Login Test', () => {
  beforeEach(() => {
    LoginPage.visit();
  });

  it('should login with valid credentials', () => {
    LoginPage.fillUsername('yourUsername');
    LoginPage.fillPassword('yourPassword');
    LoginPage.submitLogin();

    // Add assertions here to verify successful login
  });
});

