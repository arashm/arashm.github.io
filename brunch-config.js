// See http://brunch.io for documentation.
module.exports = {
  paths: {
    watched: ["app/"],
    public: './dist'
  },
  conventions: {
    assets: /static\//
  },
  files: {
    javascripts: {
      joinTo: {
        'js/vendor.js': /^(?!dist)/, // Files that are not in `app` dir.
        'js/app.js': /^dist/
      }
    },
    stylesheets: {joinTo: 'css/app.css'},
  },
  plugins: {
    sass: {
      sourceMapEmbed: true
    },
    postcss: {
      processors: [
        require('autoprefixer')(['last 4 versions']),
      ]
    }
  }
};

exports.plugins = {
  babel: {presets: ['latest']}
};
