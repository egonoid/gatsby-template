import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addParameters } from '@storybook/react';
import '!style-loader!css-loader!sass-loader!./scss-loader.scss';

addParameters({
  options: {
    panelPosition: 'right',
  },
  viewport: { viewports: INITIAL_VIEWPORTS, defaultViewport: 'iphone6' },
});
