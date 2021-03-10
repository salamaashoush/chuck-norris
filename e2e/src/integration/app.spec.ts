describe('Chuck Norris Jokes', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show login page', () => {
    cy.contains('Chuck Norris');
    cy.getByTestId('jokesList').children().should('have.length', 10);
  });
});
