const path = require('path');
const pathToInlineSvg = path.resolve(__dirname, '../static/assets/');

module.exports = {
  stories: ['../**/*.stories.tsx', '../../themes/**/*.stories.tsx'],
  addons: [
    '@storybook/addon-knobs',
    '@storybook/addon-actions',
    '@storybook/addon-links',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
  ],
  webpackFinal: async (config) => {
    // Include parents packages to prevent Gatsby components from crashing Storybook, as we're using Yarn Workspaces
    config.module.rules[0].include = require('path').resolve('../..');

    // Transpile Gatsby module because Gatsby includes un-transpiled ES6 code.
    config.module.rules[0].exclude = [/node_modules\/(?!(gatsby)\/)/];

    // use installed babel-loader which is v8.0-beta (which is meant to work with @babel/core@7)
    config.module.rules[0].use[0].loader = require.resolve('babel-loader');

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve('@babel/preset-react'),
      require.resolve('@babel/preset-env'),
    ];

    config.module.rules[0].use[0].options.plugins = [
      // use @babel/plugin-proposal-class-properties for class arrow functions
      require.resolve('@babel/plugin-proposal-class-properties'),
      // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
      require.resolve('babel-plugin-remove-graphql-queries'),
    ];

    // Prefer Gatsby ES6 entrypoint (module) over commonjs (main) entrypoint
    config.resolve.mainFields = ['browser', 'module', 'main'];

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve('babel-loader'),
      options: {
        presets: [['react-app', { flow: false, typescript: true }]],
        plugins: [
          require.resolve('@babel/plugin-proposal-class-properties'),
          // use babel-plugin-remove-graphql-queries to remove static queries from components when rendering in storybook
          require.resolve('babel-plugin-remove-graphql-queries'),
        ],
      },
    });

    config.resolve.extensions.push('.ts', '.tsx');

    // Scss support
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname),
    });

    // Add SCSS Modules support
    config.module.rules.push({
      test: /\.module.scss$/,
      loaders: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
            modules: true,
          },
        },
        require.resolve('sass-loader'),
      ],
    });

    // svg with @svgr
    const fileLoaderRule = config.module.rules.find((rule) => rule.test.test('.svg'));
    fileLoaderRule.exclude = pathToInlineSvg;
    config.module.rules.push({
      test: /\.svg$/,
      include: pathToInlineSvg,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            icon: false,
          },
        },
      ],
    });

    return config;
  },
};
