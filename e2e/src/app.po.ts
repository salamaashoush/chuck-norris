import { $$, browser, by, element } from 'protractor';
import { JOKES_LIST_TEST_IDS } from '../../src/app/test-ids';
export class AppPage {
  async navigateTo(): Promise<unknown> {
    return browser.get(browser.baseUrl);
  }

  getTestIdSelector(testId: string) {
    return by.css(`[data-testid=${testId}]`);
  }

  async getJoke(jokeId: number) {
    return element(this.getTestIdSelector(JOKES_LIST_TEST_IDS.joke({ id: jokeId })));
  }

  async getJokesCount(): Promise<number> {
    return $$('[data-testid^=joke-]').count();
  }
}
