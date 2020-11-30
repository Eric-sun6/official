const path = require('path');
const webpack = require('webpack')
const merge = require('webpack-merge')
//环境配置
const environment = process.env.NODE_ENV === 'production' ? '.env.prod' : process.env.NODE_ENV === 'test' ? '.env.test' : '.env.dev'
require('dotenv').config({ path: environment })

process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
});

module.exports = {
    mode: 'universal',
    loading: {
        color: 'red',
        height: '10px'
    },
    /*
    ** Headers of the page
    */
    head: {
        // eslint-disable-next-line no-undef
        title: `【智全程】一站式物流_海外仓_第三方物流_国际海运_国际空运_集装箱运输_天津国际货运` || process.env.npm_package_name,
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            {
                hid: 'description',
                name: 'description',
                content: '运价,海运运价，海运出口，出口，外贸，整箱出口，物流运输，整箱进口，物流方案，智全程，物流全程，国际运输，物流跟踪'
            },
            {
                hid: 'keywords',
                name: 'keywords',
                content: `物流资讯,国际贸易,全程物流,一站式物流,海外仓,第三方物流,跨境物流,跨境运输,门到门运输,国际贸易术语,国际货代,国际海运,海外拖车,供应链管理,国际航线,港口,货代,国际空运,海运价格,集装箱运输,天津国际货运,报关`
            }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: false,
    /*
    ** Global CSS
    */
    css: [
        'element-ui/lib/theme-chalk/index.css',
        '~assets/css/reset.css',
        '~assets/css/main.css',
        'quill/dist/quill.snow.css',
        'quill/dist/quill.bubble.css',
        'quill/dist/quill.core.css'
    ],
    cssModules: {
        modules: true
    },
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        '@/plugins/swiper.js',
        { src: '@/plugins/utils.js', 'ssr': false },
        { src: "@/plugins/VueQuillEditor.js", ssr: false },
        //'@/plugins/share.js',
        '@/plugins/element-ui',
        '@/plugins/axios',
        { src: '@/plugins/bus.js', ssr: false }
        // '@/plugins/lottie'

    ],
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
    ],
    //针对home路由做缓存
    // serverMiddleware: [
    //     { path: '/', handler: '~/middleware/page-cache.js' },
    // ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/proxy',
        ['@nuxtjs/dotenv',
            { filename: environment }
        ]
    ],
    axios: {
        prefix: '/api',
        proxy: true
    },
    proxy: {
        '/api': {
            target: 'http://192.168.0.141:20310',// 'http://192.168.0.141:20310', //            changeOrigin: true,
            pathRewrite: { '^/api/': '' }
        },
        '/group1/**': {
            target: 'http://192.168.0.141:801',
        }
    },
    /*
    ** Build configuration
    */
    // buildDir: 'nuxt-dist',
    build: {
        babel: {        //配置按需引入规则
            plugins: [
                [
                    "component",
                    {
                        "libraryName": "element-ui",
                        "styleLibraryName": "theme-chalk"
                    }
                ]
            ]
        },

        optimizeCSS: true,

        vendor: ['axios', 'element-ui', 'vuex'],
        transpile: [/^element-ui/],
        analyze: true,
        noParse: /jquery/,
        // 提取css到单独link文件
        extractCSS: true,
        optimization: {
            runtimeChunk: 'single',
            minimize: undefined,
            minimizer: undefined,
            splitChunks: {
                chunks: 'all',
                automaticNameDelimiter: '.',
                name: undefined,
                cacheGroups: {}
            }
        },
        splitChunks: {
            layouts: false,
            pages: true,
            commons: true
        },
        //压缩css
        optimizeCSS: true,

        postcss: {
            plugins: {
                // Disable `postcss-url`
                'postcss-url': false,
                // Add some plugins
                'postcss-nested': {},
                'postcss-responsive-type': {},
                'postcss-hexrgba': {}
            },
            preset: {
                autoprefixer: {
                    grid: true
                }
            }

        },
        loaders: {
            file: {
                test: /\.(png|jpg|gif|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[path][name].[ext]',
                            limit: 8000, esModule: false
                        },
                    },
                    {
                        loader: 'image-webpack-loader',

                    },
                ]
            },
            fontUrl: { limit: 1000 },
            imgUrl: { limit: 8000, esModule: false },


        },
        plugins: [
            new webpack.IgnorePlugin(/\.\locale/, /moment/),

            // new MiniCssExtractPlugin(),
            // new ExtractCssChunks({
            //   // Options similar to the same options in webpackOptions.output
            //   // both options are optional
            //   filename: '[name].css',
            //   chunkFilename: '[name].css',
            // }),

            // new BundleAnalyzerPlugin(),
            // new webpack.ProvidePlugin({
            //   $: 'jquery'
            // }),
        ],

        // eslint-disable-next-line no-unused-vars
        extend (config, ctx) {
            config.resolve.alias['～assets'] = path.resolve(__dirname, 'assets');
            config.resolve.alias['~utils'] = path.resolve(__dirname, 'utils');
            config.resolve.alias['~api'] = path.resolve(__dirname, 'api');
            config.resolve.extensions = [".vue", ".js", ".json"]


        }
    }

};
