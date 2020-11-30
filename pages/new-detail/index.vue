<template>
    <div>
        <Header></Header>
        <div class="newsDetail">
            <div class="newsLayout">
                <!-- 二级导航 ｜ 面包屑 和搜索框 -->
                <div class="searchKeyword">
                    <span>首页 > <span class="pathTitle hand" @click="searchNews" >新闻中心</span></span>
                    <div>
                        <el-input placeholder="请输入内容" v-model="newsKeyword">
                            <template slot="suffix">
                                <el-button id="searchButton" type="primary" icon="el-icon-search" @click="searchNews"></el-button>
                            </template>
                        </el-input>
                    </div>
                </div>
                <div class="newArea">
                    <div style="width: 70%;">
                        <div class="newTitle">
                            <h2>
                                {{newsData.newsTitle}}
                            </h2>
                            <span>
                                <i class="el-icon-price-tag"/>
                                <span style="margin-left: 5px" v-for="(item,index) in newsData.classifys">
                                    {{item.classifyName}}
                                </span>
                            </span>

                            <span style="margin-left: 20px">{{newsData.publishTime.toString().substr(0,10)}}</span>
                        </div>
                        <div class="ql-container ql-snow" style="border:none;height: auto"  v-if="newsData.content">
                            <div class="quill-editor">
                                <div class="ql-editor newContent" v-html="newsData.content.newsContent"></div>
                            </div>
                        </div>
                        <div class="newSwitch">
                            <el-row :span="24" type="flex" justify="space-between">
                                <el-col :span="11">
                                    <template v-if="preNews">
                                        <span>上一篇：</span>
                                        <span @click="detail(preNews.id)">{{preNews.newsTitle | formateContentFilter(25)}}</span>
                                    </template>
                                </el-col>
                                <el-col :span="11" :offset="2" style="text-align: right">
                                    <template v-if="nextNews">
                                        <span>下一篇：</span>
                                        <span @click="detail(nextNews.id)">{{nextNews.newsTitle | formateContentFilter(25)}}</span>
                                    </template>
                                </el-col>
                            </el-row>
                        </div>
                    </div>
                    <div style="width: 28%;margin-left: 2%">
                        <HotNewsNav :list="hotNews"></HotNewsNav>
                    </div>
                </div>
            </div>
        </div>
        <Footer :links="links"></Footer>
    </div>
</template>

<script>
    import Header from '~/components/Header';
    import HotNewsNav from '~/components/news/HotNewsNav'
    import {getNewsContent,getNews} from "~api/news/index";
    import {getHotNews} from "~api/news";
    import Footer from '~/components/footer';
    import { getlinks } from "~/api/getlinks";
    import { mapGetters } from 'vuex'
    if (process.client) {
         require('quill')
    }

    export default {
        name: "index",
        components: {
            Header,
            HotNewsNav,
            Footer
        },
        data() {
            return {
                content: '',
                hotNews: [],
                newsData: {},
                preNews: {},
                nextNews: {},
                newsKeyword: '',
                newsId:'',
                links:null,
            }
        },
        computed: {
            ...mapGetters([
            'getNewsId',
            ])
        },
        watch:{
            $route(){
              this.getNews();
            },
            newsId(){
                this.$nextTick(()=>{
                    document.body.scrollTop = document.documentElement.scrollTop = 0
                })
            }
        },
        async asyncData({app}) {
            try {
                let hotNewsList = await getHotNews(app);
                let hotNews = hotNewsList.data;

                let links = await getlinks(app)
                // return {hotNews:hotNews}
                // console.log(app)
                let newsId = app.context.route.query.id || app.store.getters.getNewsId || ''
                // console.log(app.context.route.query.id)
                // console.log(app.store.getters.getNewsId)
                let res = await getNews(app, newsId);
                return {links:links,hotNews:hotNews,newsData :res.data.contentNews,preNews: res.data.preNews,nextNews:res.data.nextNews}
            } catch (err) {
                console.log(err)
            }
        },
        filters: {
            formateDate(value) {
                return value.substring(0, 10)
            },
            formateContentFilter(value, length) {
                if (value && value.length > length)
                    return value.substr(0, length) + '...'
                return value
            }
        },
        created() {
            // this.getNews();
        },
        methods: {
            detail(value) {
                this.$router.push({
                    path: '/new-detail',
                    query: {
                        id: value
                    }
                })
            },
            searchNews(){
                this.$router.push({
                    path: '/news',
                    query: {
                        keyword: this.newsKeyword
                    }
                })
            },

            async getNews(){
                this.newsId = this.$route.query.id
                let res = await getNews(this,this.newsId);
                this.newsData = res.data.contentNews;
                this.preNews = res.data.preNews;
                this.nextNews = res.data.nextNews;
            }
        }
    }
</script>

<style lang="scss">
    @mixin text-overflow($line) {
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: $line;
        -webkit-box-orient: vertical;
    }

    @mixin space-between() {
        display: flex;
        justify-content: space-between;
    }

    .newSwitch{
        padding: 15px 0px;

        .el-col span{
            font-size:12px;
            font-family:SimSun;
            font-weight:400;
            line-height:30px;
            color:rgba(79,80,105,1);
        }

        .el-col span:first-child{
            color:#4f5069 !important;
        }
        .el-col span:last-child{
            cursor: pointer;
        }

        // .el-col span:last-child:hover{
        //     color: rgba(0,0,0,1);
        // }
    }

    .searchKeyword .el-input__suffix{
        right: 0px !important;

        .el-button{
            font-weight: bold !important;
        }
    }
    .newArea {
        width: 100%;
        height: auto;
        background: white;
        display: flex;
    }
    .newTitle{
        text-align: center;
        h2{
            font-size:24px;
            font-family:PingFang SC;
            font-weight:bold;
            color:rgba(51,51,51,1);
            line-height: 50px
        }
        span{
            line-height: 50px;
            font-weight:400;
            font-size:12px;

            icon{
                font-family:SimSun;
                color:#336BE3;
            }

            span{
                margin-left: 15px;
                font-family:Microsoft YaHei UI;
                color:rgba(123,133,176,1);
            }
        }
    }
    .newContent{
        border-bottom:1px solid rgba(233,236,252,1);
        padding: 0px !important;

        p{
            text-indent:2em;
            line-height:30px;
        }
        .ql-align-center{
            width: 840px;
            text-align: center;
        }

        img{
            max-width: 820px;
        }
    }

    //新闻页面布局
    .newsLayout {
        width: 1200px;
        margin: 0 auto;

        .searchKeyword {
            padding:15px 0 25px 0;
            display: flex;
            justify-content: space-between;
            @include space-between();

            span {
                height: 36px;
                line-height: 36px;
                font-size: 12px;
                font-family:SimSun;
                font-weight:400;
                color:rgba(79,80,105,1);

                .pathTitle{
                    color: #5689FF
                }
            }

            div {
                //   display: inline-block;
                width: 338px;
                height: 36px;

                input {
                    height: 36px;
                    border-radius: 2px;
                }
            }

            button{
                height: 36px;
            }
        }
    }
    .hand {
        cursor: pointer;
    }
    .el-col-11 span:hover{
        color: #5689FF;
            
    }
    #searchButton{
        height: 36px;
    }
    #searchButton .el-icon-search{
        top: -4px;
        position: relative;
    }
</style>