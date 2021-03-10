import { fireEvent, render, screen } from '@testing-library/angular';
import { JOKES_MOCK } from '../mocks/jokes';
import { FavouritesListComponent } from './favourites-list.component';
import { FAVOURITES_LIST_TEST_IDS } from './test-ids';

describe('FavouritesListComponent', () => {
  it('should render favourite list', async () => {
    const expectedText = JOKES_MOCK[0].joke;
    await render(FavouritesListComponent, {
      componentProperties: {
        favourites: JOKES_MOCK,
      },
    });
    expect(screen.getByText(expectedText));
  });

  it('should remove from favourite list', async () => {
    const expectedJoke = JOKES_MOCK[0];
    const removeSpy = jasmine.createSpy('addToFavouriteSpy');

    await render(FavouritesListComponent, {
      componentProperties: {
        favourites: JOKES_MOCK,
        remove: { emit: removeSpy } as any,
      },
    });
    const removeButton = screen.getByTestId(FAVOURITES_LIST_TEST_IDS.remove(expectedJoke));
    fireEvent.click(removeButton);
    expect(removeSpy).toHaveBeenCalledWith(expectedJoke);
  });
});
