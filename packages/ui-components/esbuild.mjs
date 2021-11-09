import glob from 'glob';
import { build } from 'esbuild';
import postCssPlugin from './esbuild.postcss.js';
import fileImport from './esbuild.fileImport.js';
import svgr from 'esbuild-plugin-svgr';
import syntax from 'postcss-scss';
import cssImport from 'postcss-import';
import cssNested from 'postcss-nested';
import cssSimpleVars from 'postcss-simple-vars';
import cssMixins from 'postcss-mixins';
import cssStripComments from 'postcss-strip-inline-comments';
import cssFunctions from 'postcss-functions';
import cssUtil from './util/index.js';
import cssUrl from 'postcss-url';
import cssFocusVisible from 'postcss-focus-visible';
import tailwindcss from 'tailwindcss';
import tailwindConfig from './tailwind.config.js';
import autoprefixer from 'autoprefixer';

const allSrcFiles = glob.sync('./src/**/*+(.ts|.tsx|.css|.svg|.png|.jpg|.jpeg|.gif)');
const documentationFiles = glob.sync('./src/**/*documentation*/*');
const typeDefinitionFiles = glob.sync('./src/**/*+(.d.ts)');
const excludeFiles = [...documentationFiles, ...typeDefinitionFiles];
const entryPoints = allSrcFiles.filter(item => !excludeFiles.includes(item));

const options = {
  entryPoints,
  outdir: './dist',
  outbase: './src',
  format: 'esm',
  tsconfig: './tsconfig.lib.json',
  logLevel: 'info',
  minify: true,
  sourcemap: true,
  target: ['esnext', 'node12.22.0'],
  loader: { '.png': 'dataurl' },
  plugins: [
    fileImport(),
    postCssPlugin({
      inject: false,
      syntax,
      plugins: [
        cssImport(),
        cssStripComments,
        cssNested,
        cssMixins,
        cssSimpleVars(),
        cssFunctions({ functions: cssUtil }),
        cssUrl({
          url: 'copy',
          maxSize: 10 * 1024, // inline files < 10k, copy files > 10k
          fallback: 'copy',
          optimizeSvgEncode: true,
          assetsPath: 'dist/assets'
        }),
        cssFocusVisible,
        tailwindcss(tailwindConfig),
        autoprefixer
      ]
    }),
    svgr({
      template: ({ template }, opts, { imports, interfaces, componentName, props, jsx, exports }) => {
        const plugins = ['jsx'];
        if (opts.typescript) {
          plugins.push('typescript');
        }
        const typeScriptTpl = template.smart({ plugins });
        return typeScriptTpl.ast`${imports}
          ${interfaces}
          export function ReactComponent (${props}) {
            return ${jsx};
          }
          `;
      }
    })
  ]
};

build(options).catch(() => process.exit(1));
