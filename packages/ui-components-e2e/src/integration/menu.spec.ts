describe('menu', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-menu--menu&args=&viewMode=story');
  });

  it('should open the first menu', () => {
    cy.contains('Menu').click();
    cy.get('.szh-menu').should('be.visible');
  });

  it('should show the submenu on hover', () => {
    cy.contains('Menu').click();
    cy.get('.szh-menu .szh-menu__submenu').trigger('mouseover');
    cy.get('ul.szh-menu--state-open ul.szh-menu--state-open').should('be.visible');
    cy.percySnapshot();
  });
});

describe('menu with hover attr', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-menu--menu-with-hover&args=&viewMode=story');
  });

  it('should show the menu on hover', () => {
    cy.contains('Click me').trigger('mouseover');
    cy.get('.szh-menu .szh-menu__submenu').should('be.visible');
  });
});
