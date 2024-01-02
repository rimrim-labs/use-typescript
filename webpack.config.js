/**
 *
 * JSX를 순수 React 코드로 트랜스파일링.
 * ES6 문법을 ES5로 변환.
 * 한 파일에 모든 모듈 번들링.
 */

import path from 'path';
import { fileURLToPath } from 'url';
import TerserPlugin from 'terser-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import ESLintWebpackPlugin from 'eslint-webpack-plugin';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const config = {
  entry: './src/index.tsx',
  output: {
    path: path.join(dirname, 'dist/assets'),
    filename: 'bundle.js',
    sourceMapFilename: 'bundle.map',
  },
  resolve: { extensions: ['.tsx', '.ts', '.js'] },
  devtool: 'eval-cheap-source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [/(node_modules)/, path.join(dirname, 'ssrc/react/jsx/')],
        use: ['babel-loader', 'ts-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  optimization: { minimize: true, minimizer: [new TerserPlugin()] },
  plugins: [
    // 이전 번들링 결과 제거.
    new CleanWebpackPlugin(),

    // eslint 적용.
    new ESLintWebpackPlugin(),
  ],
};

export default config;
