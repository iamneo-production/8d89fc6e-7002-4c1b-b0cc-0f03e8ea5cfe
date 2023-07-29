import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AddOns from '../../components/Customer/AddOns/AddOns';
import { MemoryRouter } from 'react-router';

describe('AddOns', () => {
  test('fe_react_customerAddOns', () => {
    render(<MemoryRouter><AddOns /></MemoryRouter>);

    const addInstitute = screen.getByTestId('planName');
    const instituteName = screen.getByTestId('amount');
    const validity = screen.getByTestId('validity');

    expect(addInstitute).toBeTruthy();
    expect(instituteName).toBeTruthy();
    expect(validity).toBeTruthy();
  });
});