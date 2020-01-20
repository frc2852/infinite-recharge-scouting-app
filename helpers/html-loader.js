const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (folder, plugins) => {
    const files = fs.readdirSync(folder);

    if (folder[folder.length - 1] !== '/') {
        folder += '/';
    }

    return files
        .map(file => {
            return new HtmlWebpackPlugin({ template: folder + file, filename: 'app/' + file });
        })
        .concat(plugins);
};
