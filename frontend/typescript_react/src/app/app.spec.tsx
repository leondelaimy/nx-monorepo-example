import { render, waitFor } from '@testing-library/react';
import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import App from './app';

const server = setupServer(
  http.get('http://localhost:3000', () => {
    return HttpResponse.json('test1');
  }),
  http.get('http://localhost:3001', () => {
    return HttpResponse.json('test2');
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('App', () => {
  it('should render successfully', async () => {
    const { baseElement, getByText } = render(<App />);
    expect(baseElement).toBeTruthy();
    // Let the fetches in App's effect resolve (and be intercepted by MSW)
    // before the test ends, so they don't leak past `server.close()`.
    await waitFor(() => expect(getByText('"test1"')).toBeTruthy());
  });

  it('should have a greeting as the title', async () => {
    const { getAllByText } = render(<App />);
    expect(
      getAllByText(new RegExp('Welcome typescript-react', 'gi')).length > 0
    ).toBeTruthy();
    // Same here: wait for the fetched data to settle before teardown.
    await waitFor(() => expect(getAllByText('"test2"').length).toBeGreaterThan(0));
  });
});
