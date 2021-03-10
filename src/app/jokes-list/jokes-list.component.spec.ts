import { fireEvent, render, screen } from '@testing-library/angular';
import { JOKES_MOCK } from '../mocks/jokes';
import { JokesListComponent } from './jokes-list.component';
import { JOKES_LIST_TEST_IDS } from './test-ids';

describe('JokesListComponent', () => {
  it('should render jokes list', async () => {
    const expectedText = JOKES_MOCK[0].joke;
    await render(JokesListComponent, {
      componentProperties: {
        jokes: JOKES_MOCK,
      },
    });
    expect(screen.getByText(expectedText));
  });

  it('should add to favourite', async () => {
    const expectedJoke = JOKES_MOCK[0];
    const addToFavouriteSpy = jasmine.createSpy('addToFavouriteSpy');
    await render(JokesListComponent, {
      componentProperties: {
        jokes: JOKES_MOCK,
        addToFavourites: {
          emit: addToFavouriteSpy,
        } as any,
      },
    });
    const addButton = screen.getByTestId(JOKES_LIST_TEST_IDS.addToFavourites(expectedJoke));
    fireEvent.click(addButton);
    expect(addToFavouriteSpy).toHaveBeenCalledWith(expectedJoke);
  });

  it('should remove from favourite', async () => {
    const expectedJoke = JOKES_MOCK[0];
    const removeFromFavouritesSpy = jasmine.createSpy('removeFromFavourites');
    await render(JokesListComponent, {
      componentProperties: {
        jokes: JOKES_MOCK,
        isFavouredJoke: () => true,
        removeFromFavourites: {
          emit: removeFromFavouritesSpy,
        } as any,
      },
    });
    const removeButton = screen.getByTestId(JOKES_LIST_TEST_IDS.removeFromFavourites(expectedJoke));
    fireEvent.click(removeButton);
    expect(removeFromFavouritesSpy).toHaveBeenCalledWith(expectedJoke);
  });
});
