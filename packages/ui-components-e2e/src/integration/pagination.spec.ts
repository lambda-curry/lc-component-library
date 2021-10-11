describe('pagination', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-pagination--pagination&args=&viewMode=story');
  });

  /* works up until the 5th button, then fails; not sure why still */
  it('should change the active page on click', () => {
    cy.get('.lc-pagination li button').each(button => {
      if (!button.is(':disabled')) {
        cy.wrap(button).click().should('have.class', 'Mui-selected');
      }
    });
  });
});
