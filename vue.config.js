const path = require('path')
const fs = require('fs')

// Generate pages object
const pages = {}
const copyFiles = [
  {
    from: 'src/manifest.json',
    to: 'dist/manifest.json',
  },
  {
    from: 'public/',
    to: 'dist/',
  },
  {
    from: 'src/assets',
    to: 'dist/assets',
  },
]

function getEntryFile(entryPath) {
  const files = fs.readdirSync(entryPath)
  return files
}

const chromeName = getEntryFile(path.resolve('src/entry'))

function getFileExtension(filename) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined
}

chromeName.forEach((name) => {
  const fileExtension = getFileExtension(name)
  const fileName = name.replace(`.${fileExtension}`, '')
  pages[fileName] = {
    entry: `src/entry/${name}`,
    template: 'public/index.html',
    filename: `${fileName}.html`,
  }
})

const isDevMode = process.env.NODE_ENV === 'development'

module.exports = {
  pages,
  filenameHashing: false,
  chainWebpack: (config) => {
    config
      .plugin('copy')
      .use(require('copy-webpack-plugin'),
        [
          {
            patterns: copyFiles.map(setting => ({
              from: path.resolve(setting.from),
              to: path.resolve(setting.to),
            })),
          },
        ])
  },
  configureWebpack: {
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
    },
    devtool: isDevMode ? 'inline-source-map' : false,
  },
  css: {
    extract: false, // Make sure the css is the same
  },
}
