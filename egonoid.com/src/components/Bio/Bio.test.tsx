import React from 'react';
import { render, cleanup } from '@testing-library/react';
import { Bio } from '.';

describe('<Bio />', () => {
  beforeEach(cleanup);

  it('renders correctly', () => {
    // Arrange

    // Act
    const container = render(<Bio />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
