import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Recharge from '../../components/Admin/Recharge/Recharge';
import { MemoryRouter } from 'react-router';

describe('Recharge', () => {
  test('fe_react_adminRecharge', () => {
    render(<MemoryRouter><Recharge /></MemoryRouter>);

    const customerName = screen.getByTestId('customerName');
    const planName = screen.getByTestId('planName');
    const amount = screen.getByTestId('amount');

    expect(customerName).toBeTruthy();
    expect(planName).toBeTruthy();
    expect(amount).toBeTruthy();

  });
});