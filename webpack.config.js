module.exports = {
    entry: './src/js/application.js',
    output: {
        filename: './build/build.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader',
                options: {
                   // eslint options (if necessary)
                },
            },
        ],
    },
};
