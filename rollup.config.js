import typescript from '@rollup/plugin-typescript';
import scss from 'rollup-plugin-scss';
import url from 'rollup-plugin-url';
import svgr from '@svgr/rollup';
import postcss from 'rollup-plugin-postcss';

export default {
  input: 'src/lib/index.ts',
  output: {
    dir: 'dist',
    format: 'cjs',
  },
  plugins: [
    typescript({ tsconfig: 'tsconfig.library.json' }),
    url(),
    svgr(),
    scss(),
    postcss(),
  ],
};
