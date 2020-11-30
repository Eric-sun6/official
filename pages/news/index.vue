<template>
    <div>
        <Header></Header>
        <div class="header-graphic">
            <div class="header-graphic-block">
                <div class="header-graphic-symbol">
                    <button></button>
                    <span>
                        NEWS
                    </span>
                </div>
                <div class="header-graphic-title">
                    新闻资讯
                </div>
            </div>
        </div>
        <div class="container">
            <div class="newsLayout">
                <!-- 二级导航 ｜ 面包屑 和搜索框 -->
                <div class="searchKeyword">
                    <span>首页 > <span class="pathTitle">新闻中心</span></span>
                    <div>
                        <el-input placeholder="请输入内容" v-model="newsKeyword">
                            <template slot="suffix">
                                <el-button type="primary" id="el-icon-search" icon="el-icon-search" @click="searchNews"></el-button>
                            </template>
                        </el-input>
                    </div>
                </div>
                <div class="newsWrap">
                    <!-- 左:置顶新闻 -->
                    <div class="topNews">
                        <div class="exposure">
                            <div class="topExposure" v-if="NewsNews.length > 0">
                                <div>
                                    <nuxt-link :to="{path: 'new-detail', query: {id: NewsNews[0].id}}">
                                        <h3>
                                            {{NewsNews[0].newsTitle }}
                                        </h3>
                                        <h4>{{NewsNews[0].newsSummary}}</h4>
                                        <p>
                                            <span>
                                                了解详情>
                                            </span>
                                            <!--<a href="jacascript:;">了解详情></a>-->
                                            <span class="publishTime">{{NewsNews[0].publishTime | formateDate}}</span>
                                        </p>
                                    </nuxt-link>
                                </div>
                                <nuxt-link :to="{path: 'new-detail', query: {id: NewsNews[0].id}}">
                                    <h6 class="topNewsImg">
                                        <span class="topImg" :style="{background:`url(${NewsNews[0].coverUrl})`}"></span>
                                        <!-- <img :src="hotNews[0].coverUrl" title="海智链-国内首家全程物流解决方案平台" alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"> -->
                                    </h6>
                                </nuxt-link>
                            </div>
                            <div>
                                <div class="secondExposure"  v-if="NewsNews.length > 1">
                                    <nuxt-link :to="{path: 'new-detail', query: {id: NewsNews[1].id}}">
                                        <span class="coverImg" :style="{background:`url(${NewsNews[1].coverUrl})`}"></span>
                                        <!-- <img :src="hotNews[1].coverUrl" title="海智链-国内首家全程物流解决方案平台" alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"> -->
                                        <h5>{{NewsNews[1].newsTitle}}</h5>
                                    </nuxt-link>
                                </div>

                                <div class="secondExposure"  v-if="NewsNews.length > 2">
                                    <nuxt-link :to="{path: 'new-detail', query: {id: NewsNews[2].id}}">
                                        <span class="coverImg" :style="{background:`url(${NewsNews[2].coverUrl})`}"></span>
                                        <!-- <img :src="hotNews[2].coverUrl" title="海智链-国内首家全程物流解决方案平台" alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"> -->
                                        <h5>{{NewsNews[2].newsTitle}}</h5>
                                    </nuxt-link>
                                </div>
                            </div>
                        </div>
                        <div class="newsContent">
                            <div
                                    class="typeNav"
                                    ref="typeNav"
                                    :class="[topNavFixed==true? 'typeNavFixed': '']"
                            >
                                <h6 @click="newsShow(0)">新闻中心</h6>
                                <ul>
                                    <!-- <li @click="newsShow(0)">{{typeNavTop}}</li> -->
                                    <li v-for="(item, index) in newsClassifyList" @click="newsShow(item.id)">
                                        {{item.classifyName}}
                                    </li>
                                </ul>
                            </div>
                            <div class="newsList">
                                <ul ref="newslabel">
                                    <li v-for="(item,index) in newsList" class="list-item clearfix" @click="setNewsId(item.id)">
                                        <nuxt-link :to="{path: 'new-detail', query: {id: item.id, classifyId: item.classifyId}}">
                                            <p class="newsImgWrap">
                                                <img :src="item.coverUrl">
                                            </p>
                                        </nuxt-link>
                                        <div class="newDetail">
                                            <h3>
                                                <nuxt-link :to="{path: 'new-detail', query: {id: item.id, classifyId: item.classifyId}}">
                                                    {{item.newsTitle }}
                                                </nuxt-link>
                                            </h3>
                                            <p class="new-classify">
                                                <i class="el-icon-price-tag" />
                                                <template v-for="(record, sort) in item.classifys">
                                                    {{record.classifyName + (sort+1 === item.classifys.length ? '' : '、')}}
                                                </template>
                                            </p>

                                            <p class="detail-link" @click="detail(item)">
                                                {{item.newsSummary}}
                                               
                                            </p>
                                            <p class="new-publish-time">
                                                <span>{{item.publishTime | formateDate}}</span>
                                                 <span  @click="detail(item)">了解详情>></span>
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                                <div v-show="!newsList.length" class="emptyContent">
                                    <p v-show="showSearch">有关<span>【{{emptyKeyword}}】</span>的搜索结果</p>
                                    <h5>抱歉，暂无相关资讯</h5>
                                </div>
                            </div>
                        </div>
                        <div class="pagination">
                            <el-pagination
                                    background
                                    @current-change="handleCurrentChange"
                                    @size-change="handleSizeChange"
                                    :pager-count="7"
                                    layout="prev, pager,sizes, next,total"
                                    :total="pagination.count"
                                    :page-count="pagination.pages"
                                    :page-sizes="[10, 20, 50, 100, 500, 1000]"
                                    :page-size="10"
                                    :current-page="pagination.pageNumber"
                            >
                            </el-pagination>
                        </div>
                    </div>
                    <HotNewsNav :list="hotNews" v-if="hotNews.length > 0"></HotNewsNav>
                </div>
            </div>
        </div>

        <Footer :links="links"></Footer>
    </div>
</template>

<script>
    import { mapMutations } from 'vuex'
    import Header from '~/components/Header';
    import {getHotNews, getNewNewsList, getNewsByClassify, getNewsClassify,searchNews,getShowNewNews} from "~api/news";
    import HotNewsNav from '~/components/news/HotNewsNav';


    import Footer from '~/components/footer';

    import { getlinks } from "~/api/getlinks";
    export default {
        components: {
            Header,
            HotNewsNav,
            Footer
        },
        data() {
            return {
                newsShowIndex: 0,
                newsShowClassifyId: 0,
                count: 10,
                loading: false,
                typeNavDefaultTop: null,
                topNavFixed: null,
                pageSize: 10,
                pagination: {
                    count: 0,
                    pageNumber: 0,
                    pageSize: 0,
                    pages: 1
                },
                newsClassifyList: [],
                newsList: [],
                hotNews: [],
                NewsNews: [],
                newsKeyword: '',
                newslabelTop: 0,
                emptyKeyword: '',
                showSearch:false,
                links:null,
            }
        },

        //服务端渲染首屏幕数据
        async asyncData({app}) {
            try {
                let links = await getlinks(app)
                //获取新闻分类
                let newsClassify = await getNewsClassify(app);
                let newsClassifyList = newsClassify.data;
                //获取最新新闻列表
                let newNewsList = await getNewNewsList(app, 1, 10);
                let newNews = newNewsList.data;
                let newsList = newNewsList.data.list;
                let pagination = {
                    count: newNews.count,
                    pageNumber: newNews.pageNumber,
                    pageSize: newNews.pageSize,
                    pages: newNews.pages
                };
                console.log(pagination)
                //获取热门新闻
                let hotNewsList = await getHotNews(app);
                let hotNews = hotNewsList.data;
                //获取最新新闻
                let showNewNews = await getShowNewNews(app);
                let NewsNews = showNewNews.data.list;
                //服务端需要渲染的返回数据
                return {
                    links: links,
                    newsClassifyList: newsClassifyList,
                    newsList: newsList,
                    hotNews: hotNews,
                    NewsNews: NewsNews,
                    pagination: pagination
                }
            } catch (err) {
                console.log(err)
            }
        },
        computed: {
            swiper() {
                return this.$refs.mySwiper.$swiper
            },
            noMore() {
                return this.count >= 20
            },
            disabled() {
                return this.loading || this.noMore
            }
        },
        mounted() {
            this.newslabelTop = this.$refs.newslabel.offsetTop
            this.typeNavDefaultTop = this.$refs.typeNav.offsetTop
            let self = this
            window.onscroll =
                this.$util.throttle(function () {
                    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
                 
                    if (scrollTop >= self.typeNavDefaultTop) {
                        self.topNavFixed = true
                    } else {
                        self.topNavFixed = false
                    }
                }, 10)
        },
        filters: {
            formateDate(value) {
                return (value && value.substr(0, 10)) || ''
            },
        },
        created(){
            if (this.$route.query.keyword != null && this.$route.query.keyword != ''){
                this.newsKeyword = this.$route.query.keyword
                this.searchNews();
            }
        },
        methods: {
            ...mapMutations([
                'setNewsId', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      
            ]),
            // gotoDetail(id){
            //     console.log('0'+id)
            //      this.$store.commit('setNewsId',id)
            // },
            newsShow(classifyId) {
                // this.newsShowIndex = index
                this.newsShowClassifyId = classifyId;
                this.requestSearch(1, this.pageSize);
            },
            async searchNews(){
                this.emptyKeyword = this.newsKeyword
                let data={
                    currentPage: this.page,
                    pageSize: this.pageSize,
                    searchContent: this.newsKeyword
                };
                let res = await searchNews(this,data)
                // console.log(res)
                if(res || res.data.count !=0 ){
                    window.scrollTo(0,this.newslabelTop)
                }
                if (res.data.list.length < 1){
                    this.showSearch = true;
                }
                this.newsList = res.data.list;
                this.pagination = {
                    count: res.data.count,
                    pageNumber: res.data.pageNumber,
                    pageSize: res.data.pageSize,
                    pages: res.data.pages
                };
            },
            async requestSearch(page, pageSize) {
                let newsList;
                if (this.newsShowClassifyId == 0) {
                    newsList = await getNewNewsList(this, page, pageSize);
                } else {
                    newsList = await getNewsByClassify(this, this.newsShowClassifyId, page, pageSize);
                }
                // console.log(JSON.stringify(newsList.data))
                this.newsList = newsList.data.list;
                // console.log(JSON.stringify(res.data));
                this.pagination = {
                    count: newsList.data.count,
                    pageNumber: newsList.data.pageNumber,
                    pageSize: newsList.data.pageSize,
                    pages: newsList.data.pages
                };
            },
            handleCurrentChange(page) {
                this.requestSearch(page, this.pageSize);
                // console.log(`当前页: ${val}`);
            },
            handleSizeChange(pageSize) {
                this.pageSize = pageSize;
                // alert(this.pageSize)
                this.requestSearch(1, this.pageSize)
            },
            load() {
                this.loading = true
                setTimeout(() => {
                    this.count += 2
                    this.loading = false
                }, 2000)
            },
            detail(item) {
                this.$router.push({
                    path: '/new-detail',
                    query: {
                        id: item.id
                    }
                })
                this.$store.commit('setNewsId',item.id)
                this.$util.cookie.setCookie('newsId', item.id)
            },
            /*            searchNews(){
                            this.$router.push({
                                path: '/news',
                                query: {
                                    keyword: this.newsKeyword
                                }
                            })
                        }*/
        }
    }

</script>

<style lang="scss">
    .searchKeyword .el-input__suffix{
        right: 0px !important;
        .el-button{
            border-top-left-radius: 0 !important;
            border-bottom-left-radius: 0 !important;
        }
      
    }
    .el-icon-search:before {
        font-size: 19px;
        align-items: center;
    }
    #el-icon-search i {
        position: relative;
        top: -5px !important;
    }
</style>

<style lang="scss" scoped>
    @mixin space-between() {
        display: flex;
        justify-content: space-between;
    }

    @mixin text-overflow($line) {
        overflow: hidden;
        text-align: left;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: $line;
        -webkit-box-orient: vertical;
    }

    .header-graphic{
        height: 380px;
        width: 100%;
        min-width: 1200px;
        z-index: -1;
        margin-top: -68px;
        position: relative;
        background: url('~assets/img/news/news_banner.png');
        font-family:Source Han Sans CN;
        color:rgba(255,255,255,1);
        display: flex;
        justify-content: center;

        .header-graphic-block{
            width: 1200px;
            margin-top: 150px;

            .header-graphic-symbol{
                display: flex;
                align-items: center;

                button{
                    height: 6px;
                    width: 100px;
                    background: rgba(214,74,115,1);
                }

                span{
                    height: 16px;
                    width: 83px;
                    font-size: 22px;
                    font-weight: 100;
                    margin-left: 17px;
                    letter-spacing: 8px;
                }
            }

            .header-graphic-title{
                height: 55px;
                width: 400px;
                margin-top: 46px;
                font-size: 56px;
                letter-spacing: 30px;
                font-weight: 100;
            }
        }
    }

    .container {
        margin: 0 auto;
        min-height: 100vh;
        text-align: center;
        background: white;
    }
    .newDetail{
        a{
            @include text-overflow(1)
            color: #4F5069;
            line-height: 1.2;
        }
        .detail-link{
             @include text-overflow(2)
        }
    }
    .topExposure{
        h3{
             @include text-overflow(2)
        }
        h4{
             @include text-overflow(4)
        }
    }
    .title {
        font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
        'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        display: block;
        font-weight: 300;
        font-size: 100px;
        color: #35495e;
        letter-spacing: 1px;
    }

    .subtitle {
        font-weight: 300;
        font-size: 42px;
        color: #526488;
        word-spacing: 5px;
        padding-bottom: 15px;
    }

    .contentWrap {
        position: relative;
        display: block;
        width: 100vw;
        height: 100vh;
        text-align: center;

        .swiper-container {
            width: 100vw;
            height: 100vh;
            background: green;
        }

        .swiper-slide {
            width: 100vw;
            height: 100vh;
        }
    }

    //新闻页面布局
    .newsLayout {
        width: 1200px;
        margin: 0 auto;

        .searchKeyword {
            padding: 15px 0 25px 0;
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
                    height: 34px;
                    border-radius: 2px;
                }
            }
        }
    }

    /*.topNews {
        width: 792px;
    }*/

    .exposure {
        padding-bottom: 40px;
        @include space-between();
    }

    .topExposure {
        // margin-right: 22px;
        @include space-between();
        width: 500px;
        position: relative;
        //   height: 220px;
        background: linear-gradient(
                        0deg,
                        rgba(84, 136, 255, 1) 0%,
                        rgba(110, 161, 254, 1) 100%
        );

        > div {
            width: 228px;
            padding-left: 22px;
            padding-right: 22px;


            h3 {
                padding-top: 28px;
                font-size: 18px;
                color: white;
                margin-bottom: 20px;
                text-align: left;
                // height: 60px;

                font-family:Source Han Sans CN;
                font-weight:bold;
                line-height:30px;
            }

            h4 {
                line-height: 30px;
                color: white;
                text-align: left;
                font-size:14px;
                font-family:SimSun;
                line-height: 30px;
                font-weight:400;
                // height: 44px;
            }

            p {
                position: absolute;
                bottom: 32px;
                color: white;
                // margin-top: 21px;
                @include space-between();
                font-size: 14px;
                margin-right: 15px;


                a {
                    color: white;
                    font-size: 14px;
                }
               .publishTime{
                    margin-left:86px;
                }
            }
        }

        .topNewsImg{
            width: 228px;
            height: 288px;
            background: blue;
            overflow: hidden;
            span {
                width: 228px;
                height: 288px;
                display: block;
                background-position: center !important;
                background-size: cover!important;
                
            }
        }
        
    }

    .secondExposure {
        overflow: hidden;
        width: 319px;
        height: 140px;
        .coverImg{
            width: 100%;
            height: 100%;
            display: block;
            background-position: center !important;
            background-size: cover !important;
        }
       
        position: relative;
        // &:hover{
        //     .coverImg{
        //         background-position: center;
        //         background-size: contain;
        //         transform: scale(1.1);
        //         transition: transform 0.5s;
        //         width: 100%;
        //         height: 100%;
        //         display: block;
        //         background-position: center !important;
        //         background-size: cover !important;
        //     }
            
        // }
        h5 {
            padding: 0px 15px;
            width: 289px;
            height: 41px;
            bottom: 0px;
            text-align: left;
            position: absolute;
            font-size: 18px;
            background:rgba(0,0,0,0.5);
            color: white;
            line-height: 40px;
        }
    }

    .secondExposure:nth-child(1) {
        margin-bottom: 8px;

        img {
            background: pink;
        }
    }

    .newsContent {
        h6 {
            text-align: left;
            color: #4f5069;
            font-size: 22px;
            font-family:Source Han Sans CN;
        }

        h6::after {
            content: '';
            width: 28px;
            height: 4px;
            background: linear-gradient(
                            0deg,
                            rgba(84, 136, 255, 1) 0%,
                            rgba(110, 161, 254, 1) 100%
            );
            border-radius: 2px;
            display: block;
            margin-top: 21px;
        }

        h6:hover {
            cursor: pointer;
            color: black;
        }

        li {
            font-size: 18px;
            color: #4f5069;
            // padding-top: 35px;
            text-align: left;
        }

        li:hover{
            cursor: pointer;
            color: black;
        }

        //流量top新闻列表
        .newsList {
            background: white;
            width: 700px;
            text-align: left;
            margin-left: 137px;



            /*li:last-child {
                border-bottom: none;
            }*/

            li {
                @include space-between();
                padding: 30px 0;
                border-bottom: 1px #d7d7ed solid;
                &:hover{
                    background: #f0f3f9;
                    a{
                        color:#2968F7;
                    }
                }
            }

            .newsImgWrap {
                display: block;
                width: 183px;
                height: 160px;

                margin-right: 32px;
            }

            img {
                display: block;
                width: 183px;
                height: 160px;
            }

            h3 {
                width: 397px;
                font-size: 22px;
                font-family: Source Han Sans CN;
                font-weight: bold;
                color: rgba(79, 80, 105, 1);
                @include text-overflow(1);
                height: 40px;
            }

            .new-classify {
                font-size: 12px;
                font-family: SimSun;
                font-weight: 400;
                color: rgba(79, 80, 105, 1);
                line-height: 20px;
                display: block;
                padding-bottom: 27px;
                cursor: default;
            }

            .detail-link {
                width: 397px;
                font-size: 14px;
                line-height: 20px;
                height: 40px;
                color: #4f5069;
                font-family:SimSun;
                font-weight:400;

                span{
                    color: #2968F7 !important;
                }
            }

            .new-publish-time{
                width: 397px;
                font-size:12px;
                text-align: right;
                font-family:PingFang SC;
                font-weight:400;
                color:rgba(172,173,192,1);
                line-height:30px;
                @include space-between()
                span:last-child{
                    color:#2968F7;
                }
            }
        }
    }

    .pagination{
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    //分类导航
    .typeNav {
        float: left;
        width: 137px;

        li {
            padding-top: 35px;
        }
    }

    .typeNavFixed {
        position: fixed;
        top: 0;
        width: 119px;
        z-index: 1;
        padding: 15px 0 15px 0;
        border-radius: 5px;
        // box-shadow: 2px 2px 2px #dddddd;
        background: white;
    }

    .newsListActive {
        margin-left: 137px;
    }

    .loadingStatus {
        padding: 20px 0;
        color: #323232;
        text-align: center;
    }

    .newsWrap {
        @include space-between();
    }

    .hotNews {
        height: 600px;
        width: 338px;
        background: #f0f3f9;
        padding: 20px 22px;
        border-top: 2px #5689ff solid;

        h3 {
            color: #4f5069;
            font-size: 18px;
            font-weight: bold;
            padding-bottom: 30px;
            text-align: left;
        }

        div {
            display: flex;
            justify-content: flex-start;
            margin-bottom: 30px;

            img {
                display: block;
                width: 123px;
                height: 95px;
            }

            p:not(.advert) {
                font-size: 14px;
                color: #4f5069;
                margin-left: 14px;
                width: 196px;
                @include text-overflow(4);
                line-height: 23px;
            }
        }

        li {
            padding-bottom: 24px;
        }

        a:not(.3dbox) {
            color: #4f5069;
            font-size: 14px;
            @include text-overflow(1);

            &:before {
                content: '.';
                font-size: 14px;
                color: #4f5069;
                position: relative;
                top: -4px;
            }
        }
    }

    //hover动画
    div.topExposure .topImg {
        -webkit-transform: scale(1);
        transform: scale(1);
       
        transition: all 0.8s ease-in-out;
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    }

    .topExposure h3 {
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;
    }

    div.topExposure:hover {
        .topImg {
            -webkit-transform: scale(1.15);
            transform: scale(1.15);
           
            transition: all 0.8s ease-in-out;
            -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        }

        h3 {
            opacity: 1;
            -webkit-transform: scale(1.1);
            transform: scale(1.1);
        }
    }

    .secondExposure .coverImg {
        -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
        transition: opacity 0.35s, transform 0.35s;

    }

    .secondExposure:hover .coverImg {
        opacity: 0.8;
        -webkit-transform: scale(1.1);
        transform:scale(1.1);
        transition: opacity 0.35s, transform 0.35s;
    }

    .emptyContent{
        height:500px; 
        p{
            font-size:18px;
            color: #4f5069;
            padding:10px 30px;
            span{
                color: #f56c6c;
            }
        }
        h5{
            padding: 60px 0;
            font-size: 14px;
            color:  #f56c6c;
            text-align: center;
        }
    }
</style>
