module.exports = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
    },
    {
        test: /\.hbs/,
        loader: 'handlebars-loader'
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=images/[hash].ext'
    },
    {
        test: /\.(svg|eot|ttf|woff|woff2)$/,
        loader: 'file-loader?name=fonts/[hash].ext'
    },
    {
        test: /\.s[ac]ss$/i,
        use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            'css-loader',
            // Compiles Sass to CSS
            'sass-loader'
        ]
    }
];
