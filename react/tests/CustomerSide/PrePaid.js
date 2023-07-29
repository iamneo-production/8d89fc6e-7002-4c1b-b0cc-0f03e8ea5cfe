import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import PrePaid from '../../components/Customer/PrePaid/PrePaid';
import { MemoryRouter } from 'react-router';

describe('PrePaid', () => {
  test('fe_react_customerPrePaid', () => {
    render(<MemoryRouter><PrePaid /></MemoryRouter>);

    const addInstitute = screen.getByTestId('planName');
    const instituteName = screen.getByTestId('amount');
    const validity = screen.getByTestId('validity');

    expect(addInstitute).toBeTruthy();
    expect(instituteName).toBeTruthy();
    expect(validity).toBeTruthy();
  });
});