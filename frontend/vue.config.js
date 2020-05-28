module.exports = {
    pwa: {
        manifestPath: './manifest.json',
        workboxPluginMode: 'InjectManifest',
        workboxOptions: {
            swSrc: 'src/sw.js',
          }
    }
  }