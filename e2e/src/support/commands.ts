// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

import { TEST_IDS } from './test-ids';

// ***********************************************
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getByTestId(testId: keyof typeof TEST_IDS, ...params: string[]): Cypress.Chainable<Subject>;
    }
  }
}
//
// -- This is a parent command --
Cypress.Commands.add('getByTestId', (testId: keyof typeof TEST_IDS, ...params: any[]) => {
  const testIdValue =
    typeof TEST_IDS[testId] === 'function'
      ? (TEST_IDS[testId] as CallableFunction)(...params)
      : TEST_IDS[testId];
  return cy.get(`[data-testid=${testIdValue}]`);
});

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
