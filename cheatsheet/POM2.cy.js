class ProductListingPage {
  visit() {
    cy.visit('/products');
  }

  selectProduct(productName) {
    cy.contains(productName).click();
  }
}

export default new ProductListingPage();

class ShoppingCartPage {
  visit() {
    cy.visit('/cart');
  }

  getCartItemNames() {
    return cy.get('.cart-item').find('.item-name');
  }

  removeItem(itemName) {
    cy.contains('.cart-item', itemName).find('.remove-button').click();
  }

  checkout() {
    cy.get('.checkout-button').click();
  }
}

export default new ShoppingCartPage();

// test page
import ProductListingPage from './ProductListingPage';
import ShoppingCartPage from './ShoppingCartPage';

describe('Product and Cart Test', () => {
  beforeEach(() => {
    ProductListingPage.visit();
  });

  it('should add products to the cart', () => {
    ProductListingPage.selectProduct('Product A');
    ProductListingPage.selectProduct('Product B');

    ShoppingCartPage.visit();
    ShoppingCartPage.getCartItemNames().should('have.length', 2);

    ShoppingCartPage.removeItem('Product A');
    ShoppingCartPage.getCartItemNames().should('have.length', 1);
  });

  it('should proceed to checkout', () => {
    ProductListingPage.selectProduct('Product C');

    ShoppingCartPage.visit();
    ShoppingCartPage.checkout();

    // Add assertions here to verify successful checkout process
  });
});
