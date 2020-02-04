const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (folder, plugins) => {
  const files = fs.readdirSync(folder);

  if (folder[folder.length - 1] !== '/') {
    folder += '/';
  }

  return files
    .filter(file => file.indexOf('.html') > 1)
    .map(file => {
      const fileName = file.split('.')[0];

      return new HtmlWebpackPlugin({
        template: folder + file,
        filename: file,
        chucks: [
          'js/' + fileName
        ]
      });
    })
    .concat(plugins);
};