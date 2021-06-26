import glob from 'glob';
import { build } from 'esbuild';
import postCssPlugin from "./esbuild.postcss.js";
import svgimport from "./esbuild.svgimport.js";
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
import tailwindConfig from './tailwind.config.js';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';




const allSrcFiles = glob.sync('./src/**/*+(.ts|.tsx|.css|.svg)');
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
  target: [
    'esnext',
    'node12.22.0',
  ],
  plugins: [
    svgimport(),
    postCssPlugin({
      inject: false,
      syntax,
      plugins: [
        cssImport,
        cssStripComments,
        precss,
        cssFunctions({ functions: cssUtil }),
        cssUrl({
          url: 'copy',
          maxSize: 10 * 1024, // inline files < 10k, copy files > 10k
          fallback: 'copy',
          optimizeSvgEncode: true,
          assetsPath: 'dist/assets',
        }),
        cssFocusVisible,
        tailwindcss(tailwindConfig),
        autoprefixer,
        cssnano({
          preset: ['default', {
            discardComments: {
              removeAll: true,
            },
          }]
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