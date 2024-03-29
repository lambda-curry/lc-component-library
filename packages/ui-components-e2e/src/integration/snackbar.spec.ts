describe('snackbar', () => {
  beforeEach(() => {
    cy.visit('/iframe.html?id=components-snackbars--snackbars&args=&viewMode=story');
  });

  it('should render a snackbar and then should disappear after 5 seconds', () => {
    cy.get('.lc-button').contains('Default').click();
    cy.get('.snackbar').should('contain', 'Your notification here.');
    cy.percySnapshot();
    cy.waitUntil(() => cy.get('.snackbar', { timeout: 8000 }).should('not.be.visible'));
  });

  it('should render a success .snackbar with the background color rgb(var(--lc-color-success))', () => {
    cy.get('.lc-button').contains('Success').click();

    cy.document().then(doc => {
      const color = getComputedStyle(doc.documentElement).getPropertyValue('--lc-color-success').trim();
      cy.get('.snackbar > div').should('have.css', 'background-color', `rgb(${color})`);
    });

    cy.percySnapshot();
  });

  it('should render a warning .snackbar with the background color rgb(var(--lc-color-warning))', () => {
    cy.get('.lc-button').contains('Warning').click();

    cy.document().then(doc => {
      const color = getComputedStyle(doc.documentElement).getPropertyValue('--lc-color-warning').trim();
      cy.get('.snackbar > div').should('have.css', 'background-color', `rgb(${color})`);
    });

    cy.percySnapshot();
  });

  it('should render an error .snackbar with the background color rgb(var(--lc-color-danger))', () => {
    cy.get('.lc-button').contains('Error').click();

    cy.document().then(doc => {
      const color = getComputedStyle(doc.documentElement).getPropertyValue('--lc-color-danger').trim();
      cy.get('.snackbar > div').should('have.css', 'background-color', `rgb(${color})`);
    });

    cy.percySnapshot();
  });

  it('should render an info .snackbar with the background color rgb(var(--lc-color-primary))', () => {
    cy.get('.lc-button').contains('Info').click();

    cy.document().then(doc => {
      const color = getComputedStyle(doc.documentElement).getPropertyValue('--lc-color-primary').trim();
      cy.get('.snackbar > div').should('have.css', 'background-color', `rgb(${color})`);
    });

    cy.percySnapshot();
  });
});
