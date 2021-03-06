// see https://github.com/rozek/build-configuration-study

import commonjs   from '@rollup/plugin-commonjs'
import resolve    from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript';

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
    },{
      file:      './dist/tinted-bitmap.esm.js',
      format:    'esm',
      sourcemap: true,
    }
  ],
  plugins: [
    resolve(), commonjs(), typescript(),
  ],
};
