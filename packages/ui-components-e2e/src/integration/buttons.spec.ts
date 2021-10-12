describe('buttons', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-buttons-buttons--buttons&args=&viewMode=story');
  });

  it('should render a button', () => {
    cy.get('.button-story button:first').should('contain', 'Default Button');
    cy.percySnapshot();
  });
});
