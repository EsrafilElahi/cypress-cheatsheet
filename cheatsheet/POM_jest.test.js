// ButtonPageObject.js
import { render, screen } from '@testing-library/react';
import Button from './Button'; // Replace with your actual component import

class ButtonPageObject {
  renderComponent(props) {
    render(<Button {...props} />);
  }

  getButtonElement() {
    return screen.getByRole('button');
  }

  // Add methods to interact with the button component here
}

export default ButtonPageObject;

// testpage.test.js
import ButtonPageObject from './ButtonPageObject';

describe('Button Component', () => {
  let buttonPageObject;

  beforeEach(() => {
    buttonPageObject = new ButtonPageObject();
  });

  it('renders a button with correct label', () => {
    buttonPageObject.renderComponent({ label: 'Click Me' });
    const buttonElement = buttonPageObject.getButtonElement();

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent('Click Me');
  });

  it('calls the provided onClick function when clicked', () => {
    const mockClickHandler = jest.fn();
    buttonPageObject.renderComponent({ onClick: mockClickHandler });

    const buttonElement = buttonPageObject.getButtonElement();
    buttonElement.click();

    expect(mockClickHandler).toHaveBeenCalledTimes(1);
  });
});
