describe('pagination', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-pagination--pagination&args=&viewMode=story');
  });

  it('should change the active page on click', () => {
    cy.screenshot();
    const pageNumbers = Array.from(Array(10).keys()).map(i => (i + 1).toString());
    pageNumbers.forEach(pageNumber => {
      cy.contains(pageNumber).click();
      cy.contains(pageNumber).should('have.class', 'Mui-selected');
    });
  });
});
