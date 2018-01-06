var path = require('path');
var reactDomLibPath = path.join(__dirname, "./node_modules/react-dom/lib");
var alias = {};
["EventPluginHub", "EventConstants", "EventPluginUtils", "EventPropagators",
 "SyntheticUIEvent", "CSSPropertyOperations", "ViewportMetrics"].forEach(function(filename){
    alias["react/lib/"+filename] = path.join(__dirname, "./node_modules/react-dom/lib", filename);
});
var webpack = require('webpack');

module.exports = {
  entry: {
    host: ["babel-polyfill", "./host/index.js"],
    participant: ["babel-polyfill", "./participant/index.js"],
  },
  output: {
    path: "./",
    filename: "[name].js"
  },
  module: {
    exprContextCritical: false,
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel-loader"
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false,
        sequences: true,
        properties:true,
        dead_code: true,
        conditionals: true,
        comparisons: true,
        booleans: true,
        loops: true,
        unused: true,
        if_return: true,
        join_vars: true,
        cascade: true,
        collapse_vars: true,
        drop_console: true,
        drop_debugger: true,
      },
      output: {comments: false}
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ],
  resolve: {
    root: [
      path.resolve('./')
    ],
    extensions: [
      "", ".js"
    ],
    modulesDirectories: [
      "node_modules",
    ],
    alias: alias
  }
};