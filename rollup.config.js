import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import postcss from 'rollup-plugin-postcss';
import { terser } from 'rollup-plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

const plugins = [url(), svgr({ removeViewBox: false }), scss(), postcss({ extract: false }), terser()];

export default [
  {
    input: 'src/lib/index.ts',
    output: {
      dir: 'cjs',
      format: 'cjs'
    },
    plugins: [typescript({ tsconfig: 'tsconfig.cjs.json' }), ...plugins, nodeResolve({ browser: true }), commonjs()]
  },
  {
    input: 'src/lib/index.ts',
    output: {
      dir: 'dist',
      format: 'esm'
    },
    plugins: [typescript({ tsconfig: 'tsconfig.esm.json' }), ...plugins]
  }
  // {
  //   input: 'src/lib/index.ts',
  //   output: {
  //     name: 'lc-component-library',
  //     dir: 'umd',
  //     format: 'umd'
  //   },
  //   plugins: [typescript({ tsconfig: 'tsconfig.umd.json' }), ...plugins]
  // }
];
