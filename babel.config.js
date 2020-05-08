module.exports = {
  presets: [
    [
      '@vue/app', { "useBuiltIns": "entry" }
    ]
  ],
  "plugins": [
    ["component",
      {
        "libraryName": "mint-ui",
        "style": true
      }
    ],
    ['import', {
      libraryName: 'vant',
      libraryDirectory: 'es',
      style: true
    }, 'vant']
  ]
}
