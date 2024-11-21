const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/Hyemin-Youn.github.io/' : '/'
  //publicPath: process.env.NODE_ENV === 'production' ? '/이곳에 경로를 적으시오./' : '/'
};