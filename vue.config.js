const webpack = require('webpack')
const path = require("path");
const resolve = dir => path.join(__dirname, dir);
module.exports = {
    publicPath: './',
    devServer: {
        port: 10080,
        open: false, // 项目启动时是否自动打开浏览器，我这里设置为false,不打开，true表示打开
    },

    // 输出文件目录
    outputDir: 'dist',
    assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)

    css: {
        loaderOptions: {
            // 全局scss
            sass: {
                data: `@import "@/assets/style/_variables.scss";`,
                prependData: `@import "@/assets/style/variables.scss";`
            },
            scss: {
                prependData: `@import "@/assets/style/variables.scss";`
            },
        },
    },
    chainWebpack: config => {
        config.resolve.alias.set("@", resolve("src"))
            .set("@static", resolve('./src/assets/static'))
        //public js
        config.plugin('provide').use(webpack.ProvidePlugin, [{
            $: 'jquery',
            'axios': 'axios',
            'echarts': 'echarts',
        }])
    }
}