import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import Profile from '../components/Profile';

const mockStore = configureMockStore([thunk]);
describe('Profile Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      rockets: {
        allRockets: [
          {
            id: 'rocket1',
            rocket_name: 'Rocket 1',
            reserved: true,
          },
          {
            id: 'rocket2',
            rocket_name: 'Rocket 2',
            reserved: true,
          },
        ],
      },
    });
  });

  test('renders Profile component correctly', () => {
    const { getByText } = render(
      <Provider store={store}>
        <Profile />
      </Provider>,
    );
    expect(getByText('My Rockets')).toBeInTheDocument();
  });

  it('Matches the snapshot', () => {
    const { container } = render(
      <Provider store={store}>
        <Profile />
      </Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
