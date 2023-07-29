import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrePaid from '../../components/Admin/PrePaid/PrePaid';
import { MemoryRouter } from 'react-router';

describe('Home Page', () => {
  test('fe_react_adminHomePage', () => {
    render(<MemoryRouter><PrePaid /></MemoryRouter>);

    const planName = screen.getByTestId('planName');
    const amount = screen.getByTestId('amount');
    const validity = screen.getByTestId('validity');

    expect(planName).toBeTruthy();
    expect(amount).toBeTruthy();
    expect(validity).toBeTruthy();
  });
});