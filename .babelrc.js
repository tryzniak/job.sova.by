module.exports = {
  "presets": [
    [
      "@babel/preset-env",
      {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": 2,
        "debug": true,
      }
    ]
  ],
  "plugins": [
    ["@babel/plugin-transform-runtime", {
      "corejs": 2
    }]
  ]
}
