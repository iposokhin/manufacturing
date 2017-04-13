const path = require( "path" ),
      webpack = require( 'webpack' ),
      NODE_ENV = process.env.NODE_ENV,
      ExtractTextPlugin = require( "extract-text-webpack-plugin" );

module.exports = { 
    entry: "./dev/app.js",
    output: {
        path: path.resolve( __dirname, "prod/public/" ),
        filename: "app.js",
        sourceMapFilename: "sourcemaps/[file].map"
    },
  
    devtool: "source-map",
  
    resolve: {
      modules: [ "node_modules" ],
      extensions: [ ".js" ]
    },
  
    plugins: [
      new webpack.ProvidePlugin( {
        jQuery: 'jquery',
        $: 'jquery',
        _: 'underscore',
        Bb: 'backbone',
        Radio: 'backbone.radio',
        Syphon: 'backbone.syphon',
        Mn: 'backbone.marionette',
      } ),
  
      new ExtractTextPlugin( {
        filename: "style.css"
      } ) 
    ],

    watch: true,
    watchOptions: {
      aggregateTimeout: 100,
      ignored: "/node_modules/",
      poll: 1000
    },
  
    module: { 
      rules: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract( {
            fallbackLoader: "style-loader",
            loader: "css-loader"
          } )
        },
        {
          test: /\.(png|jpg|svg)$/,
          loader: 'file-loader?name=images/[ext]/[name].[ext]'
        },
        { 
          test: /\.(woff|woff2|ttf|eot)$/, 
          loader: 'file-loader?name=fonts/[ext]/[name].[ext]'
        },
        {
          test: /node_modules\/dist\/bootstrap\/js\//,
          loader: 'imports?jQuery=jquery'
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          options: {
            presets: [ 'es2015' ]
          },
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          loader: 'underscore-template-loader'
        }
      ]
    }
  };
  
if ( NODE_ENV == 'production' ) {
  module.exports.plugins.push(
    new webpack.optimize.UglifyJsPlugin( {
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
    } )
  );
}