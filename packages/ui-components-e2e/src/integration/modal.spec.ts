describe('modal', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-modal--modal&args=&viewMode=story');
  });

  // This is a failed test, but maybe we should leave it as a good example? It shows a bit of functionality
  // that we may want to add to the modal component
  it('should open and close the modal by clicking off the modal element', () => {
    cy.contains('Toggle Modal').click();
    cy.get('.lc-modal').should('be.visible');
    cy.screenshot();
    cy.get('body').click();
    cy.get('.lc-modal').should('not.be.visible');
    cy.screenshot();
  });

  it('should open and close the modal by click the close button', () => {
    cy.contains('Toggle Modal').click();
    cy.get('.lc-modal').should('be.visible');
    cy.screenshot();
    cy.get('.lc-icon-close').click();
    cy.get('.lc-modal').should('not.be.visible');
    cy.screenshot();
  });
});
