describe('tooltip', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-tooltip--tooltip&args=&viewMode=story');
  });

  it('should show tip on hover and hide on mouse off', () => {
    cy.get('.lc-icon-pencil').trigger('mouseover');
    cy.get('.MuiTooltip-popper').should('be.visible');
    cy.screenshot();
    cy.get('.lc-icon-pencil').trigger('mouseout');
    cy.get('.MuiTooltip-popper').should('not.exist');
    cy.screenshot();
  });
});
