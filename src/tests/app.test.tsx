import React from 'react';
import { waitFor, render, RenderResult, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

userEvent.setup();

describe('<App />', () => {
  let view: RenderResult;

  beforeEach(async () => {
    view = render(<App />);

    await waitFor(() => {
      expect(screen.queryAllByRole('row')).toHaveLength(9); // Country headers, 3 countries in list, 5 in details panel
    });
  });

  it('should match snapshot', async () => {
    expect(view.container).toMatchSnapshot();
  });

  it('should filter rows', async () => {
    const filterInput = await screen.findByTestId('filter-input');
    await userEvent.type(filterInput, 'Can');

    const canadaRow = await screen.findByText(/Canada/i);

    expect(canadaRow).toBeVisible();
    await expect(screen.findByText(/Belgium/i)).rejects.toThrow();
  });

  it('should sort by Country name by default', async () => {
    const rows = await screen.findAllByRole('row');

    // row[0] is the table header
    expect(rows[1]).toHaveTextContent(/Belgium/i);
    expect(rows[2]).toHaveTextContent(/Canada/i);
    expect(rows[3]).toHaveTextContent(/Papua New Guinea/i);
  });

  it('should toggle A-Z, Z-A sorting on column header click', async () => {
    const countryCodeButton = screen.getByRole('button', { name: 'Code' });

    // A-Z first click
    await userEvent.click(countryCodeButton);
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent(/BEL/i);
      expect(rows[2]).toHaveTextContent(/CAN/i);
      expect(rows[3]).toHaveTextContent(/PNG/i);
    });

    // Z-A second click
    await userEvent.click(countryCodeButton);
    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent(/PNG/i);
      expect(rows[2]).toHaveTextContent(/CAN/i);
      expect(rows[3]).toHaveTextContent(/BEL/i);
    });
  });

  it('should sort population column', async () => {
    const countryPopulationButton = screen.getByRole('button', { name: 'Population' });
    await userEvent.click(countryPopulationButton);

    await waitFor(() => {
      const rows = screen.getAllByRole('row');
      expect(rows[1]).toHaveTextContent(/400/i);
      expect(rows[2]).toHaveTextContent(/500/i);
      expect(rows[3]).toHaveTextContent(/1,000/i);
    });
  });

  it("should display selected country's details", async () => {
    const canadaButton = await screen.findByRole('button', { name: 'Canada' });
    await userEvent.click(canadaButton);

    const detailsPanel = await screen.findByTestId('details-panel');
    expect(detailsPanel).toHaveTextContent(/Ottawa/i);
    expect(detailsPanel).toHaveTextContent(/CAD/i);
    expect(detailsPanel).toHaveTextContent(/883,395/i);
    expect(view.container).toMatchSnapshot();
  });
});
