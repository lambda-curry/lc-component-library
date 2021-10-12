describe('drawer', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-drawer--drawer&args=&viewMode=story');
  });

  it('should open and close the drawer', () => {
    cy.contains('Open Drawer').click();
    cy.get('.lc-drawer-content').should('be.visible');
    cy.percySnapshot();
    cy.get('body').click();
    cy.get('.lc-drawer-content').should('not.exist');
  });
});
