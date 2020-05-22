// module.exports = {
//   outputDir: 'dist', // build输出目录
//   assetsDir: 'assets', // 静态资源目录（js, css, img）
//   lintOnSave: false,
//   devServer: {
//     open: true, // 是否自动弹出浏览器页面
//     https: false, // 是否使用https协议
//     hotOnly: false, // 是否开启热更新
//     proxy: {
//       '/api': {
//         target: 'http://192.168.1.202:10010',
//         ws: true,
//         changeOrigin: true,
//         pathRewrite: {
//           '^/api': ''
//         }
//       }
//     }
//   }
// }
module.exports = {
  lintOnSave: false,
  publicPath: ''
}
