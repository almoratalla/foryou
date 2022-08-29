const path = require("path");

const dotenv = require('dotenv')
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const getEnvFromDotEnvFile = dotenv.config()
let envKeys

if (getEnvFromDotEnvFile.error) {
  console.log('Getting environment variables from build args for production') // eslint-disable-line
  envKeys = {
    'process.env.NODE_ENV': JSON.stringify('production'),
  }
} else {
  envKeys = {
    'process.env.CLIENT_ID': JSON.stringify(getEnvFromDotEnvFile.parsed['CLIENT_ID']),
  }
}

module.exports = {
    entry: ["./src/client/index.tsx"],
    output: {
        path: path.resolve(__dirname, "../dist/client"),
        filename: "[name].[fullhash].bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.ts(x?)$/,
                loader: "ts-loader",
                exclude: /node_modules/
            },
            {
                test: /\.(woff(2)?|eot|ttf|otf)$/,
                type: "asset/inline"
            },
            {
                test: /\.md$/,
                type: "asset/source"
            },
            {
                test: /\.(?:ico|gif|png|jpg|jpeg|webp)$/i,
                type: "asset/resource"
            },
            {
                test: /\.svg$/,
                issuer: /\.[jt]sx?$/,
                use: ['@svgr/webpack'],
            }
        ]
    },
    resolve: {
        extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".md"],
        alias: {
            "@": path.resolve(__dirname, "../src/client"),
            "@components": path.resolve(__dirname, "../src/client/components"),
            "@resources": path.resolve(__dirname, "../src/resources"),
            "@server": path.resolve(__dirname, "../src/server"),
            "@api": path.resolve(__dirname, "../src/server/api"),
            "@utils": path.resolve(__dirname, "../src/utils/api"),
            stream: "stream-browserify",
            path: "path-browserify"
        }
    },
    stats: {
        errorDetails: true
    },
    plugins: [
        new webpack.DefinePlugin(envKeys),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "../public"),
                    globOptions: {
                        ignore: ["*.DS_Store", "favicon.ico", "template.html"]
                    }
                }
            ]
        }),
        new webpack.ProvidePlugin({
            process: "process/browser"
        })
    ]
};
