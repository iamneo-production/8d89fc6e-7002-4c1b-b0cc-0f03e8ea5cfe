import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostPaid from '../../components/Admin/PostPaid/PostPaid';
import { MemoryRouter } from 'react-router';

describe('PostPaid', () => {
  test('fe_react_adminPostPaid', () => {
    render(<MemoryRouter><PostPaid /></MemoryRouter>);


    const planName = screen.getByTestId('planName');
    const amount = screen.getByTestId('amount');
    const validity = screen.getByTestId('validity');

    expect(planName).toBeTruthy();
    expect(amount).toBeTruthy();
    expect(validity).toBeTruthy();
  });
});