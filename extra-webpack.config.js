
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  plugins: [
    new CopyPlugin({
        patterns: [
            {
                from: "**/16/*.svg",
                to: "./[name].[ext]",
            },
            {
                from: "**/24/*.svg",
                to: "./[name].[ext]",
            },
        ],
    }),
  ],
  module: {
      rules: [
          {
              test: /\.(svg|png|jpe?g|gif)$/i,
              loader: "file-loader",
              options: {
                  emitFile: false,
                  name(resourcePath, resourceQuery) {
                      // `resourcePath` - `/absolute/path/to/file.js`
                      // `resourceQuery` - `?foo=bar`

                    //   let fileContent = fs.readFileSync(resourcePath);
                    //   let hash = crypto.createHash('md4').update(fileContent).digest('hex').substr(0, 20);

                      return `./[name].[ext]`;
                  },
              },
          },
      ],
  },

  resolve: {
    fallback: {
        fs: false,
    }
  }
};