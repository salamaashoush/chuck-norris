// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands

import { JOKES_MOCK } from './mocks';
import { TEST_IDS } from './test-ids';
// ***********************************************
declare global {
  namespace Cypress {
    interface Chainable<Subject> {
      getByTestId(testId: keyof typeof TEST_IDS, ...params: any[]): Cypress.Chainable<Subject>;
      mockApi(config?: IMockApiConfig): void;
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

interface IMockApiConfig {
  data?: any;
  resource?: string;
  alias?: string;
}
// Workaround because cy.intercept currently does not support overriding mocked routes
Cypress.Commands.add(
  'mockApi',
  ({ data = JOKES_MOCK, resource = '/jokes/random/10', alias = 'jokes' }: IMockApiConfig = {}) => {
    const url = `https://api.icndb.com${resource}`;
    const method = 'GET';
    const response = { status: 'success', value: data };
    const key = `${alias}-${method}-${url}`;
    const intercepts: any = Cypress.config('intercepts' as any);

    if (key in intercepts) {
      intercepts[key] = response;
    } else {
      intercepts[key] = response;
      cy.intercept(method, url, req => {
        return req.reply(intercepts[key]);
      }).as(alias);
    }

    cy.waitFor(`@${alias}`);
  }
);

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
