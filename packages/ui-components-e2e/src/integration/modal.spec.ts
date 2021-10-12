describe('modal', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-modal--modal&args=&viewMode=story');
  });

  it('should open and close the modal by click the close button', () => {
    cy.contains('Toggle Modal One').click();
    cy.get('.lc-modal.ReactModal__Content--after-open').should('be.visible');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(550);
    cy.percySnapshot();
    cy.get('.lc-icon-close').click();
    cy.get('.lc-modal').should('not.exist');
  });

  it('with lots of content should fit on the screen', () => {
    cy.contains('Toggle Modal Two').click();
    cy.get('.lc-modal.ReactModal__Content--after-open').should('be.visible');
    // eslint-disable-next-line cypress/no-unnecessary-waiting
    cy.wait(550);
    cy.percySnapshot();
  });
});
