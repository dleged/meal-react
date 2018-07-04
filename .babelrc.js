{
  "plugins": [
    ["import",{"libraryName": "antd", "style": true}],
    [
      "babel-plugin-module-resolver",
      {
        "alias": {
          "components": "./src/components",
        }
      }
    ]
  ],
  "presets": ["react", "es2015"],
  "env": {
      "development" : {
        "compact": false
      }
    }
}
