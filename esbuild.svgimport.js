module.exports = () => ({
  name: 'svgimport',
  setup(build) {
    const fs = require('fs');

    build.onLoad({ filter: /\.tsx$/ }, async (args) => {
      console.log('svgimport');

      const file = await fs.promises.readFile(args.path, 'utf8');
      const svgImports = /(import\s?{\sReactComponent\sas\s.*}\s?from\s['"].*)\.svg(['"])/gm;
      const contents = file.replace(svgImports, "$1.js$2");

      return {
        contents,
        loader: 'tsx',
      };
    });
  },
});
