import { JOKES_MOCK } from '../support/mocks';

describe('Chuck Norris Jokes', () => {
  beforeEach(() => {
    Cypress.config('intercepts' as any, {});
    cy.mockApi();
    cy.visit('/');
  });

  it('should show login page', () => {
    cy.contains('Chuck Norris');
    cy.getByTestId('jokesList').children().should('have.length', 10);
  });

  it('should refresh jokes', () => {
    const newMockData = [...JOKES_MOCK];
    const newJoke: any = {
      id: 1234,
      joke: 'new joke',
      categories: [],
    };
    newMockData[0] = newJoke;
    cy.mockApi({ data: newMockData });
    cy.getByTestId('refresh').click();
    cy.getByTestId('joke', newJoke).contains(newJoke.joke);
  });

  it('should add a favourite joke every 5 seconds', () => {
    const newMockData = [
      {
        id: 1234,
        joke: 'new random joke',
        categories: [] as any[],
      },
    ];

    cy.mockApi({ data: newMockData, alias: 'randomJoke', resource: '/jokes/random/1' });
    cy.getByTestId('getRandomJoke').check();
    cy.wait(5000);
    cy.getByTestId('favourite', newMockData[0]).contains(newMockData[0].joke);
  });

  it('should add joke to favourites', () => {
    const targetJoke = JOKES_MOCK[0];
    cy.getByTestId('addToFavourites', targetJoke).click();
    cy.getByTestId('favouritesList').children().should('have.length', 1);
    cy.getByTestId('favourite', targetJoke).should('exist');
  });

  it('should remove joke from favourites using start button', () => {
    const targetJoke = JOKES_MOCK[0];
    cy.getByTestId('addToFavourites', targetJoke).click();
    cy.getByTestId('favouritesList').children().should('have.length', 1);
    cy.getByTestId('removeFromFavourites', targetJoke).click();
    cy.getByTestId('favouritesList').children().should('have.length', 0);
    cy.getByTestId('favourite', targetJoke).should('not.exist');
  });

  it('should remove joke from favourites using remove button', () => {
    const targetJoke = JOKES_MOCK[0];
    cy.getByTestId('addToFavourites', targetJoke).click();
    cy.getByTestId('favouritesList').children().should('have.length', 1);
    cy.getByTestId('remove', targetJoke).click();
    cy.getByTestId('favouritesList').children().should('have.length', 0);
    cy.getByTestId('favourite', targetJoke).should('not.exist');
  });
});
