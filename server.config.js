const path = require("path");

module.exports = {
    entry: "./src/server/server.ts",
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [],
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"]
    },
    output: {
        filename: "server.js",
		path: path.resolve(__dirname, "dist/server")
    },
    target: "node"
};
