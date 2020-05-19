module.exports = {
  plugins: [
    { resolve: `@egonoid/gatsby-theme-common`, options: {} },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
      },
    },
  ],
};
