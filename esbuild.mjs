import glob from 'glob';
import { build } from 'esbuild';
import postCssPlugin from "./esbuild.postcss.js";
import svgr from 'esbuild-plugin-svgr';
import syntax from 'postcss-scss';
import cssImport from 'postcss-import';
import cssStripComments from 'postcss-strip-inline-comments';
import precss from 'precss';
import cssFunctions from 'postcss-functions';
import cssUtil from './util/index.js';
import cssUrl from 'postcss-url';
import cssFocusVisible from 'postcss-focus-visible';
import tailwindcss from 'tailwindcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import purgecss from '@fullhuman/postcss-purgecss';



const allSrcFiles = glob.sync('./src/**/*+(.ts|.tsx|.css)');
const documentationFiles = glob.sync('./src/**/*documentation*/*');
const typeDefinitionFiles = glob.sync('./src/**/*+(.d.ts)');
const excludeFiles = [...documentationFiles, ...typeDefinitionFiles];
const entryPoints = allSrcFiles.filter(item => !excludeFiles.includes(item));


const options = {
  entryPoints,
  outdir: './dist',
  outbase: './src',
  format: 'esm',
  tsconfig: 'tsconfig.json',
  logLevel: 'info',
  minify: true,
  sourcemap: true,
  // bundle: true,
  plugins: [
    postCssPlugin({
      inject: false,
      syntax,
      plugins: [cssImport, cssStripComments, precss, cssFunctions({ functions: { hexToRgb: cssUtil.hexToRGB } }),
        cssUrl({
          url: 'copy',
          maxSize: 10 * 1024, // inline files < 10k, copy files > 10k
          fallback: 'copy',
          optimizeSvgEncode: true,
          assetsPath: 'dist/assets',
        }),
        cssFocusVisible,
        tailwindcss,
        autoprefixer,
        cssnano({
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          }]
        }),
        purgecss({
          content: ['./src/**/!(*documentation)/**/*[!*.d].{ts,tsx}']
        })
      ]
    }),
    svgr({
      template: (
        { template },
        opts,
        { imports, interfaces, componentName, props, jsx, exports },
      ) => {
        const plugins = ['jsx']
        if (opts.typescript) {
          plugins.push('typescript')
        }
        const typeScriptTpl = template.smart({ plugins })
        return typeScriptTpl.ast`${imports}
          ${interfaces}
          export function ReactComponent (${props}) {
            return ${jsx};
          }
          `
      }
    }),
  ],
}

build(options).catch(() => process.exit(1));