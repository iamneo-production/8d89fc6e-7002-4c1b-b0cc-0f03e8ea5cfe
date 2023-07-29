import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddOns from '../../components/Admin/AddOns/AddOns';
import { MemoryRouter } from 'react-router';

describe('AddOns', () => {
  test('fe_react_adminAddOns', () => {
    render(<MemoryRouter><AddOns /></MemoryRouter>);

    const planName = screen.getByTestId('planName');
    const amount = screen.getByTestId('amount');
    const validity = screen.getByTestId('validity');

    expect(planName).toBeTruthy();
    expect(amount).toBeTruthy();
    expect(validity).toBeTruthy();
  });
});