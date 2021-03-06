const path = require('path');
module.exports = {
  output: {
    path: `${__dirname}/dist`,
    filename: 'tex-rules.js',
  },
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },
  target: 'node',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx|ts|tsx)$/,
        include: path.resolve('./src'),
        exclude: /(node_modules|dist)/,
        loader: 'eslint-loader',
      },
      {
        test: /\.(js|jsx|ts|tsx)$/,
        use: ['thread-loader', 'cache-loader', 'babel-loader'],
        include: path.resolve('./src'),
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    plugins: [],
  },
};
