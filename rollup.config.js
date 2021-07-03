// see https://remarkablemark.org/blog/2019/07/12/rollup-commonjs-umd/

import commonjs   from '@rollup/plugin-commonjs'
import resolve    from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser'

export default {
  input:    './src/tinted-bitmap.ts',
  external: ['javascript-interface-library'],
  output: [
    { 
      file:      './dist/tinted-bitmap.js',
      format:    'umd', // builds for both Node.js and Browser
      name:      'tintedBitmap', // required for UMD modules
      globals:   { 'javascript-interface-library':'JIL' },
      noConflict:true,
      sourcemap: true,
      plugins: [terser({ format:{ comments:false, safari10:true } })],
    }
  ],
  plugins: [
    resolve(), commonjs(), typescript(),
  ],
};
