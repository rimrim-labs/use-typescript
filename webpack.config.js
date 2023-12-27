/**
 *
 * JSX를 순수 React 코드로 트랜스파일링.
 * ES6 문법을 ES5로 변환.
 * 한 파일에 모든 모듈 번들링.
 */

import webpack from 'webpack';
import path from 'path';
import { fileURLToPath } from 'url';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: 'bundle.js',
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /(node_modules)/,
        use: ['babel-loader', 'ts-loader'],
      },
    ],
  },
  plugins: [
    // 자주 사용하는 모듈 미리 등록.
    new webpack.ProvidePlugin({
      React: 'react',
    }),

    // 이전 번들링 결과 제거.
    new CleanWebpackPlugin(),
  ],
};

export default config;
