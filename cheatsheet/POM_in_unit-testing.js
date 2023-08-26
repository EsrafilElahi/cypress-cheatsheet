// LoginFormPageObject.js
import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm'; // Replace with your actual component import

class LoginFormPageObject {
  renderComponent() {
    render(<LoginForm />);
  }

  getUsernameInput() {
    return screen.getByLabelText('Username');
  }

  getPasswordInput() {
    return screen.getByLabelText('Password');
  }

  getSubmitButton() {
    return screen.getByRole('button', { name: 'Submit' });
  }

  fillUsername(username) {
    const usernameInput = this.getUsernameInput();
    fireEvent.change(usernameInput, { target: { value: username } });
  }

  fillPassword(password) {
    const passwordInput = this.getPasswordInput();
    fireEvent.change(passwordInput, { target: { value: password } });
  }

  submitForm() {
    const submitButton = this.getSubmitButton();
    fireEvent.click(submitButton);
  }
}

export default LoginFormPageObject;

// testpage.test.js
import LoginFormPageObject from './LoginFormPageObject';

describe('LoginForm Component', () => {
  let loginFormPageObject;

  beforeEach(() => {
    loginFormPageObject = new LoginFormPageObject();
  });

  it('fills in username and password inputs', () => {
    loginFormPageObject.renderComponent();

    loginFormPageObject.fillUsername('testuser');
    loginFormPageObject.fillPassword('testpassword');

    const usernameInput = loginFormPageObject.getUsernameInput();
    const passwordInput = loginFormPageObject.getPasswordInput();

    expect(usernameInput.value).toBe('testuser');
    expect(passwordInput.value).toBe('testpassword');
  });

  it('submits the form with valid credentials', () => {
    const mockSubmitHandler = jest.fn();
    loginFormPageObject.renderComponent();
    loginFormPageObject.fillUsername('testuser');
    loginFormPageObject.fillPassword('testpassword');

    const submitButton = loginFormPageObject.getSubmitButton();
    submitButton.addEventListener('click', mockSubmitHandler);

    loginFormPageObject.submitForm();

    expect(mockSubmitHandler).toHaveBeenCalledTimes(1);
  });
});
