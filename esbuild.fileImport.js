module.exports = () => ({
  name: 'fileImport',
  setup(build) {
    const fs = require('fs');

    build.onLoad({ filter: /\.tsx$/ }, async (args) => {
      const file = await fs.promises.readFile(args.path, 'utf8');
      const fileImportsRegEx = /(import\s[a-zA-Z0-9]*?\sfrom\s?['"].*)\.(jpg|jpeg|png|gif)(['"])/gm;
      const svgImportsRegEx = /(import\s?{\sReactComponent\sas\s.*}\s?from\s['"].*)\.svg(['"])/gm;

      const contents = file.replace(fileImportsRegEx, '$1.js$3').replace(svgImportsRegEx, '$1.js$2');

      return {
        contents,
        loader: 'tsx',
      };
    });
  },
});
