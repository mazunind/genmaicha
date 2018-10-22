const path = require('path');
const autoprefixer = require('autoprefixer');

module.exports = [{
    mode: 'production',
    entry: ['./src/app.js', './src/app.scss'],
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'kisik.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node-modules/,
        },{
            test: /\.s?css$/,
            use: [
                {
                    loader: 'file-loader',
                    options: {
                        name: 'bundle.css'
                    }
                },
                {loader: 'extract-loader'},
                {loader: 'css-loader'},
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [autoprefixer()],
                      },
                },{
                    loader: 'sass-loader',
                    options: {
                      includePaths: ['./node_modules'],
                    },
                  }
            ]
        }
    ],
    },
}
]