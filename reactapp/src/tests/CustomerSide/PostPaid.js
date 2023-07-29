import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PostPaid from '../../components/Customer/PostPaid/PostPaid';
import { MemoryRouter } from 'react-router';

describe('PostPaid', () => {
  test('fe_react_customerPostPaid', () => {
    render(<MemoryRouter><PostPaid /></MemoryRouter>);

    const addInstitute = screen.getByTestId('planName');
    const instituteName = screen.getByTestId('amount');
    const validity = screen.getByTestId('validity');

    expect(addInstitute).toBeTruthy();
    expect(instituteName).toBeTruthy();
    expect(validity).toBeTruthy();
  });
});