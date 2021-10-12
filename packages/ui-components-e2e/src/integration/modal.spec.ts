describe('modal', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-modal--modal&args=&viewMode=story');
  });

  it('should open and close the modal by click the close button', () => {
    cy.contains('Toggle Modal').click();
    cy.get('.lc-modal.ReactModal__Content--after-open').should('be.visible');
    cy.percySnapshot();
    cy.get('.lc-icon-close').click();
    cy.get('.lc-modal').should('not.exist');
  });
});
