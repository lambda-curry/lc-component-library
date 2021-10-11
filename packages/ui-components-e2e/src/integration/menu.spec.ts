describe('menu', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-menu--menu&args=&viewMode=story');
  });

  it('should open the first menu', () => {
    cy.contains('Menu').click();
    cy.get('.szh-menu').should('be.visible');
    cy.screenshot();
  });

  it('should show the submenu on hover', () => {
    cy.contains('Menu').click();
    cy.get('.szh-menu').within(() => {
      cy.get('.szh-menu__submenu')
        .trigger('mouseover')
        .within(() => {
          cy.get('ul.szh-menu--state-open').should('be.visible');
        });
      cy.screenshot();
    });
  });
});
