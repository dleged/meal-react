module.exports = {
  plugins: [
    [
      'transform-es2015-modules-commonjs',
      'babel-plugin-transform-react-jsx',
      'babel-plugin-module-resolver',
      {
        alias: {
          components: './src/components',
        }
      },
    ],
    //["import",{libraryName: "antd", style: true}] // antd按需加载
  ]
};
