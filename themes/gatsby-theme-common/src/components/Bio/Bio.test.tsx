import React from 'react';
import { render, cleanup } from '@testing-library/react';
import * as Gatsby from 'gatsby';
import Bio from '.';

describe('<Bio />', () => {
  beforeEach(cleanup);

  it('renders correctly', () => {
    // Arrange
    const useStaticQuery = jest.spyOn(Gatsby, 'useStaticQuery');
    useStaticQuery.mockImplementation(() => ({
      avatar: {
        childImageSharp: {
          fixed: {
            width: 300,
            height: 300,
            src: '',
            srcSet: '',
          },
        },
      },
      site: {
        siteMetadata: {
          author: 'Florian',
          description: 'My description',
          title: 'My Title',
          social: {
            twitter: '',
          },
        },
      },
    }));

    // Act
    const container = render(<Bio />);

    // Assert
    expect(container).toMatchSnapshot();
  });
});
