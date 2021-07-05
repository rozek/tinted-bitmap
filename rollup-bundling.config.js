// see https://github.com/rozek/build-configuration-study

import commonjs   from '@rollup/plugin-commonjs'
import resolve    from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'

export default {
  input:    './src/tinted-bitmap.ts',
  output: [
    { 
      file:      './dist/tinted-bitmap.bundled.js',
      format:    'umd', // builds for both Node.js and Browser
      name:      'tintedBitmap', // required for UMD modules
      noConflict:true,
      sourcemap: true,
      plugins: [terser({ format:{ comments:false, safari10:true } })],
    }
  ],
  plugins: [
    resolve(), commonjs(), typescript(),
  ],
};
