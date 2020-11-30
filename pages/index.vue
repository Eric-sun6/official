<template>
    <div class="container">
       <!-- 小程序推广弹窗 -->
        <transition>
          <div class="wechatWarpBack" v-if="showWechat">
          </div>
        </transition>
        <transition name="wachatWarpimg">
            <div class="wechatWarp" v-if="showWechat">
              <div id="close" @click="closeWechat"></div>
              <img src="../assets/img/wechatPop.png" alt="">
            </div>
        </transition>

        <!-- 微信小程序按钮 -->
        <div class="wechatButtonWrap" v-if="!headFixed">
          <div class="wechatButton" 
                @mouseenter="()=>this.isShowWechatQR = true"
                @mouseleave="()=>this.isShowWechatQR = false">
            <img class="wechatico" src="../assets/img/wechatico.png" alt="">
          </div>
          <div  v-show="isShowWechatQR" class="wechatPop">
            <img src="../assets/img/wechat.png" alt="">
            <p id="firstP">掌上查 指尖定</p>
            <p id="secondP">手机一键查询更方便</p>
          </div>
        </div>

        <!-- 客服按钮 -->
        <div class="ysfButton" @click="openYSF" v-if="!headFixed">
          <img src="../assets/img/serve.png" alt="">
        </div>

        <TopNav ref="topNav" :headFixed="headFixed" :butFixed = false>
            <div slot="banner">
                <div class="contentWrap firstBanner">
                    <!-- banner fade -->
                    <swiper
                        @click="stopFirstSwiper"
                        @focus="stopFirstSwiper"
                        ref="firstBanner"
                        class="firstBannerSwiper swiper-no-swiping"
                    >
                        <swiper-slide class="firstBanner5">
                            <div class="partner">
                                <span>清晰的业务流程管控</span>
                                <span>·</span>
                                <span>超高的业务提成</span>
                                <span>·</span>
                                <span>自主选择供应商</span>
                                <span>·</span>
                                <span>船东直供的电商资源</span>
                            </div>
                        </swiper-slide>
                        <swiper-slide class="firstBanner2">
                            <div class="lookContent">
                                <div class="lookLeft">
                                    <img class="lookText" src="~assets/img/01_zz01.png" alt="">
                                    <h2>覆盖主流船东&nbsp;&nbsp;精准追踪物流动态</h2>
                                    <div class="searchOrder">
                                        <img class="sIcon" src="~assets/img/01_zz02.png" alt="">
                                        <input  maxlength="40" value="" @input="typeInOrder"   @click="stopFirstSwiper"
                        @focus="stopFirstSwiper" placeholder="请输入提单号"></input>
                                        <span @click="triggerGOtoTrackPage">查询</span>
                                    </div>
                                </div>
                                <div class="lookRight">
                                   <img class="caleLook" src="~assets/img/01_zz03.png" alt="">
                                   <img class="lineDashed" src="~assets/img/01_zz04.png" alt="">
                                </div>
                            </div>
                         
                            
                        </swiper-slide>
                        <swiper-slide class="firstBanner7">
                            <div>
                                <div class="index-banner__solution">
                                    <h1>国内首家全程物流解决方案平台</h1>
                                    <h2>整合各节点优质资源，实时追踪货物状态
                                        <br>完善供应链管理解决方案，提供门到门的集装箱运输
                                        <br>可视化物流让您更安心！
                                    </h2>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide class="firstBanner6">
                            <el-row :span="24">
                                <el-col :span="14">
                                    <img src="~assets/img/04_cdbt.png">
                                    <div>
                                        <h1>对接各大船东电商源头运价 保舱保量</h1>
                                        <p>省心、 透明、 便捷</p>
                                        <button class="hand" @click="pushUrl('/freight')">立即查询</button>
                                    </div>
                                </el-col>
                                <el-col :span="10">
                                    <img src="~assets/img/04_cdtu.png">
                                </el-col>
                            </el-row>
                        </swiper-slide>
                        <swiper-slide class="firstBanner1">
                            <div>
                                <div class="calcOnline">
                                    <h1>在线结算</h1>
                                    <h2>在线全币种支付，免去线下汇款烦恼
                                        <br>依托中国银行强大可靠的技术支持，确保资金流安全可靠
                                    </h2>
                                    <button class="hand" @click="pushUrl('/solution/jsj')">立即入驻</button>
                                </div>
                            </div>
                        </swiper-slide>
                        <!-- <swiper-slide class="firstBanner2">
                            <div>
                                <div class="cooperation">
                                    <h1>多方协作的物流SAAS系统</h1>
                                    <h2>减少各方数据传递次数，提高工作效率
                                        <br>提升企业信息化程度，降低管理成本
                                    </h2>
                                    <button class="hand" @click="pushUrl('/check-info')">立即入驻</button>
                                </div>
                            </div>
                        </swiper-slide>-->
                      
                        <div class="swiper-pagination" slot="pagination"></div>
                    </swiper>
                </div>
            </div>
        </TopNav>
        <!-- 二级banner -->
        <div class="secondBanner swiper-container">
            <swiper ref="secondBanner" :options="secondBannerOptions">
                <swiper-slide class="secondSwiperSlide">
                    <span class="prev" @click.stop="gotoNews"></span>
                    <div
                        class="newsItem firstNewsItem clearfix"
                        @click.stop="gotoNews"
                        v-if="NewsNews.length > 0"
                    >
                        <span class="newsItemImg">
                            <i :style="{background:`url(${NewsNews[0].coverUrl})`}"></i>
                        </span>
                        <div>
                            <p>
                                <nuxt-link to="/news">{{NewsNews[0].newsTitle}}</nuxt-link>
                            </p>
                            <p class="clearfix">
                                <span>{{NewsNews[0].publishTime| formateDate}}</span>
                                <nuxt-link to="/news">
                                    <i class="checkDetail">查看详情</i>
                                </nuxt-link>
                            </p>
                        </div>
                    </div>
                    <div
                        class="newsItem clearfix"
                        @click.stop="gotoNews"
                        v-if="NewsNews.length > 1"
                    >
                        <span class="newsItemImg">
                            <i :style="{background:`url(${NewsNews[1].coverUrl})`}"></i>
                        </span>
                        <div>
                            <p>
                                <nuxt-link to="/news">{{NewsNews[1].newsTitle}}</nuxt-link>
                            </p>
                            <p class="clearfix">
                                <span>{{NewsNews[1].publishTime| formateDate}}</span>
                                <nuxt-link to="/news">
                                    <i class="checkDetail">查看详情</i>
                                </nuxt-link>
                            </p>
                        </div>
                    </div>
                    <div
                        class="newsItem lastNewsItem clearfix"
                        @click.stop="gotoNews"
                        v-if="NewsNews.length > 2"
                    >
                        <span class="newsItemImg">
                            <i :style="{background:`url(${NewsNews[2].coverUrl})`}"></i>
                        </span>
                        <div>
                            <p>
                                <nuxt-link to="/news">{{NewsNews[2].newsTitle}}</nuxt-link>
                            </p>
                            <p class="clearfix">
                                <span>{{NewsNews[2].publishTime| formateDate}}</span>
                                <nuxt-link to="/news">
                                    <i class="checkDetail">查看详情</i>
                                </nuxt-link>
                            </p>
                        </div>
                    </div>
                    <span class="next" @click.stop="gotoNews"></span>
                </swiper-slide>
            </swiper>
        </div>
        <div class="contentWrap excellentWrap">
            <div class="content">
                <div class="excellentWrap_title">为什么选择智全程</div>
                <div class="excellentWrap_content">
                    <el-row :span="24">
                        <el-col :span="12" class="excellentWrap_point">
                            <div class="excellentWrap_point-img">
                                <img src="~assets/img/index/excellent/03_tb01.png" width="118px">
                            </div>
                            <div class="excellentWrap_point-text">
                                <div>操作服务&客服团队</div>
                                <span>7X24小时贴身客服，20年+国际贸易操作经验！
                                    <br>管家式操作流程！让你每一票货都操作无忧！
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="12" class="excellentWrap_point">
                            <div class="excellentWrap_point-img">
                                <img src="~assets/img/index/excellent/03_tb03.png" width="118px">
                            </div>
                            <div class="excellentWrap_point-text">
                                <div>订单管理&快捷支付</div>
                                <span>清晰的业务流程管控！
                                    <br>客户电子支付0秒到账，无延迟电子发票快速存档！
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="12" class="excellentWrap_point">
                            <div class="excellentWrap_point-img">
                                <img src="~assets/img/index/excellent/03_tb02.png" width="118px">
                            </div>
                            <div class="excellentWrap_point-text">
                                <div>金融助力&超长账期</div>
                                <span>平台赋能解决超长账期，
                                    <br>业务轻松接
                                </span>
                            </div>
                        </el-col>
                        <el-col :span="12" class="excellentWrap_point">
                            <div class="excellentWrap_point-img">
                                <img src="~assets/img/index/excellent/03_tb04.png" width="118px">
                            </div>
                            <div class="excellentWrap_point-text">
                                <div>海量资源&船东直供</div>
                                <span>海量供应商资源和真实运价，门到门运输专家！
                                    <br>为您提供一站式物流方案，一键轻松订舱！
                                </span>
                            </div>
                        </el-col>
                    </el-row>
                </div>
                <!-- <div class="excellentWrap_tips">招聘地址： 天津、北京、西安、太原、保定、唐山、衡水、济南、潍坊、聊城、青岛、石家庄</div> -->
            </div>
        </div>
        <div class="contentWrap partenerPlan">
            <div class="excellent-content__title">
                <p>合伙人计划</p>
                <div>
                    <button></button>
                </div>
            </div>
            <div class="ourPartener">
                <div class="partenerRule">
                    <img src="~assets/img/01_fwzs.jpg" class="palanIcon" alt="">
                    <h3>服务至上</h3>
                    <h4>丰富的供应链管理操作经验，适合做直客专业平台</h4>
                </div>
                <div class="partenerRule">
                    <img src="~assets/img/02_zyfc.jpg" class="palanIcon secPlanIcon" alt="">
                    <h3>资源扶持</h3>
                    <h4>船东直供的电商资源，完善的海外仓网络
                        <br>提供资金、资源扶持
                    </h4>
                </div>
                <div class="partenerRule">
                    <img src="~assets/img/03_glrtc.jpg" class="palanIcon thirdPlanIcon" alt="">
                    <h3>高利润提成</h3>
                    <h4>零投资赚佣金 ，最高75%的利润分成
                        <br>带你走向光明“钱”途
                    </h4>
                </div>
            </div>
            <div class="joinUsAddress">
                <p>招募人员：从事国际货代的业务精英、小企业主！</p>
                <p>招募地址： 天津、北京、西安、太原、保定、唐山、衡水、济南、潍坊、聊城、青岛、石家庄</p>
            </div>
            <div class="huLine"></div>
        </div>
        <div class="contentWrap">
            <div class="excellent-content__title">
                <p>我们的优势</p>
                <div>
                    <button></button>
                </div>
            </div>
        </div>
        <!-- 省力 -->
        <div class="contentWrap saveEffortWrap" ref="saveEffort">
            <div class="content saveEffort">
                <div class="saveEffortLeft wow fadeInUp" data-wow-delay="0s">
                    <h2 class="wow fadeIn" data-wow-delay="0s">省力</h2>
                    <h3 class="wow fadeIn" data-wow-delay="0.2s">还在为门到门运输四处拼凑服务？</h3>
                    <h6 class="wow fadeIn" data-wow-delay=".6s">
                        优质资源整合，
                        <br>专业
                        <span>供应链管理解决方案</span>，
                        <br>专属客服，在每个节点给您贴心的指导，
                        <br>消灭选择纠结和不确定性风险，
                        <br>真正帮您提升获客能力！
                    </h6>
                    <p class="knowMore">
                        <button class="hand" @click="pushUrl('/quickOrder/index')">了解更多</button>
                    </p>
                </div>
                <div class="saveEffortRight wow fadeInUp">
                    <div data-anim-loop="true" class="wow fadeInUp" id="lottieSaveEffort"></div>
                </div>
            </div>
        </div>
        <!-- 省事 -->
        <div class="contentWrap convenientWrap">
            <div class="content convenient">
                <div class="convenientLeft wow fadeInUp" data-wow-delay="0s">
                    <img
                        class="earthIn"
                        src="~assets/earthIn.gif"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="earthOut"
                        src="~assets/img/earthOut.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <a href="javascript:;" class="wow zoomInUP" data-wow-delay=".5s">
                        <img
                            class="tip1 tipUpDown"
                            src="~assets/img/tip1.png"
                            title="海智链-国内首家全程物流解决方案平台"
                            alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                        >
                    </a>
                    <a href="javascript:;" class="wow fadeInUp" data-wow-delay="1.5s">
                        <img
                            class="tip2 tipUpDown"
                            src="~assets/img/tip2.png"
                            title="海智链-国内首家全程物流解决方案平台"
                            alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                        >
                    </a>
                    <a href="javascript:;" class="wow fadeInUp" data-wow-delay="2.5s">
                        <img
                            class="tip3 tipUpDown"
                            src="~assets/img/tip3.png"
                            title="海智链-国内首家全程物流解决方案平台"
                            alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                        >
                    </a>
                    <a href="javascript:;" class="wow fadeInUp" data-wow-delay="3.5s">
                        <img
                            class="tip4 tipUpDown"
                            src="~assets/img/tip4.png"
                            title="海智链-国内首家全程物流解决方案平台"
                            alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                        >
                    </a>
                </div>
                <div class="convenientRight wow fadeInUp" data-wow-delay="0.5s">
                    <h2 class="wow fadeIn" data-wow-delay="0s">省事</h2>
                    <h3 class="wow zoomIn" data-wow-delay=".2s">海外交付，忐忑不安？</h3>
                    <h6 class="wow fadeIn" data-wow-delay="0.6s">
                        完善的
                        <span>海外仓网络</span>和
                        <br>丰富的海外拖车资源，
                        <br>服务至上的理念，
                        <br>能够迅速响应客户需求，
                        <br>触手可及的操作管理系统，
                        <br>随时随地掌握货物情况！
                    </h6>
                    <p class="knowMore">
                        <button class="hand" @click="pushUrl('/abroad')">了解更多</button>
                    </p>
                </div>
            </div>
        </div>
        <!-- 省时 -->
        <div class="contentWrap saveTimeWrap">
            <div class="content saveTime">
                <div class="saveTimeLeft wow fadeInUp" data-wow-delay=".5s">
                    <h2 class="wow fadeIn" data-wow-delay="0s">省时</h2>
                    <h3 class="wow zoomIn" data-wow-delay=".2s">一杯咖啡的时间搞定订舱!</h3>
                    <h6 class="wow fadeIn" data-wow-delay="0.6s">国际航线价格精准透明，
                        <br>集装箱运输价格实时查询，
                        <br>
                        <span>拒绝中间商赚差价！</span>
                        <br>跨境运输不用愁！
                        <br>专属客服指导下单，
                        <br>有效降低沟通成本！
                    </h6>
                    <p class="knowMore">
                        <button class="hand" @click="pushUrl('/freight')">了解更多</button>
                    </p>
                </div>
                <div class="saveTimeRight wow fadeInUp" data-wow-delay="0.5s">
                    <div data-anim-loop="true" class="wow fadeInUp" id="lottie"></div>
                </div>
            </div>
        </div>
        <!-- 省心 -->
        <div class="contentWrap freeWorryWrap">
            <div class="content freeWorry">
                <div class="freeWorryLeft wow fadeInUp" data-wow-delay="0.5s">
                    <div id="lottieFreeWorry" class="wow fadeInUp"></div>
                    <!-- <img
                        src="~assets/img/freeWorry.gif"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >-->
                </div>
                <div class="freeWorryRight wow fadeInUp" data-wow-delay="0.5s">
                    <h2 class="wow fadeIn" data-wow-delay="0s">省心</h2>
                    <h3 class="wow zoomIn" data-wow-delay=".2s">
                        资金压力暴涨，扩张新业务
                        难上加难？
                    </h3>
                    <h6 class="wow fadeIn" data-wow-delay="0.6s">
                        多种
                        <span>融资方案</span>灵活组合，
                        <br>超长账期不愁周转，
                        <br>扩张业务超轻松！
                    </h6>
                    <p class="knowMore">
                        <button class="hand" @click="jumpPath('/supplyChain')">了解更多</button>
                    </p>
                </div>
            </div>
        </div>
      
        <!-- 合作伙伴 -->
        <div class="contentWrap partenerWrap">
            <div class="partener">
                <h3>合作伙伴</h3>
                <p>
                    <img
                        class="partenerLogo1"
                        src="~assets/img/OCOL.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo20"
                        src="~assets/img/OO.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo2"
                        src="~assets/img/COSCO.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo4"
                        src="~assets/img/MAER.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo7"
                        src="~assets/img/LONE.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo5"
                        src="~assets/img/HMM.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo8"
                        src="~assets/img/DE.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo3"
                        src="~assets/img/ONE.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                </p>
                <p>
                    <img
                        class="partenerLogo11"
                        src="~assets/img/ZIM.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo9"
                        src="~assets/img/APL.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo10"
                        src="~assets/img/CMA.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo12"
                        src="~assets/img/HAM.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <!-- <img
                        class="partenerLogo14"
                        src="~assets/img/EL.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >-->
                    <img
                        class="partenerLogo15"
                        src="~assets/img/CAL.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo13"
                        src="~assets/img/HAPA.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo16"
                        src="~assets/img/WELL.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                    <img
                        class="partenerLogo6"
                        src="~assets/img/PIL.png"
                        title="海智链-国内首家全程物流解决方案平台"
                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                    >
                </p>
            </div>
        </div>
        <Footer :links="links"></Footer>
    </div>
</template>

<script>
import Swiper from 'swiper'
import 'animate.css'
import Logo from '~/components/Logo'
import TopNav from '~/components/topNav'
if (process.browser) { // 在这里根据环境引入wow.js
    var { WOW } = require('wowjs')
}
import { quicklyBeginInit, quicklyEndInit, quickOrderBeginSite, quickOrderEndSite, setLogForHomePage } from "~api/portSearch";

import lottie from 'lottie-web'

import Footer from '~/components/footer';

import { getlinks } from "~/api/getlinks";
import * as animationData from '~/assets/img/data.json'
import * as animationSaveEffort from '~/assets/img/dataSaveEffort.json'
import * as animationFreeWorry from '~/assets/img/dataFreeWorry.json'
import { getHotNews, getShowNewNews } from "~api/news";

import { removeToken, getToken, setZscToken } from "~utils/auth";
// import LRU from 'lru-cache'
// const CACHED = new LRU({
//     max: 100, // 缓存队列长度	
//     maxAge: 1000 * 600 // 缓存时间	
// })
export default {
    components: {
        Logo,
        TopNav,
        Footer
    },
    filters: {
        formateDate (value) {
            return value.substr(0, 10)
        },
    },
    data () {
        const self = this
        return {
            isShowWechatQR : false,
            showWechat: false,
            data: null,
            startPosY: 0,
            directionY: '',
            startPort: '',
            // satartData: null,
            // endData: null,
            endPort: '',
            departureList: [],
            destinationList: [],
            initDepartureList: null,
            initDestinationList: null,//目的地
            hotNews: [],
            NewsNews: [],
            scrollHeight: 0,
            screenHeight: 0,
            activeIndex: 0,
            firstBannerSwiper: null,
            thirdBannerOptions: {
                autoplay: false,
                direction: 'horizontal',
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',

                    hideOnClick: true,
                },
            },
            secondBannerOptions: {
                autoplay: false,
                direction: 'horizontal',
                // navigation: {
                //     nextEl: '.swiper-button-next',
                //     prevEl: '.swiper-button-prev',
                // },
            },
            headFixed: false,
            saveEffortTop: 0,
            lootieSearchPort: {},
            lootieSearchPortTop: 0,
            lottieSaveEffort: null,
            lottieFreeWorry: null,
            links: null,
            typeInOrderNum:''

        }
    },

    //服务端渲染首屏幕数据
    async asyncData ({ app }) {
        try {
            let satartData, endData, hotNews, links
            await setLogForHomePage(app)
            links = await getlinks(app)
          

            satartData = await quicklyBeginInit(app)
            endData = await quicklyEndInit(app)
            //获取热门新闻
            /*let hotNewsList = await getHotNews(app);
            hotNews = hotNewsList.data;*/
            //获取最新新闻
            let showNewNews = await getShowNewNews(app);
            let NewsNews = showNewNews.data.list;
            // 将数据写入缓存	
            // await CACHED.set('portData', JSON.stringify({ satartData: satartData, endData: endData }))

            // }

            //处理数据，始发地数据列表处理
            let seaportList = satartData.bbiSeaportList.map(item => {
                return {
                    seaportType: '港口',
                    seaPortName: `${item.seaportEng}(${item.seaportChn})`,
                    value: item.id,
                    country: '',
                    type: Number(item.seaportType),
                    alias: item.seaportAlias,
                    label: `${item.seaportEng}(${item.seaportChn})`,
                }
            })

            let countryList = satartData.bbiChinaDivisionList.map(item => {
                return {
                    seaportType: '城市',
                    seaPortName: `${item.fullName}`,
                    country: '中国',
                    value: item.id,
                    type: 0,
                    alias: '',
                    label: item.fullName
                }
            })
            let departureList = [...seaportList, ...countryList]
            //处理数据，目的地数据列表处理
            let seaportListEnd = endData.bbiSeaportList.map(item => {
                return {
                    seaportType: '港口',
                    seaPortName: `${item.seaportEng}(${item.seaportChn})`,
                    value: item.id,
                    type: Number(item.seaportType),
                    alias: item.seaportAlias,
                    label: `${item.seaportEng}(${item.seaportChn})`,
                }
            })
            let countryListEnd = endData.bbiForeignDivisionList.map(item => {
                return {
                    seaportType: '城市',
                    seaPortName: item.foreignDivisionName,
                    country: '',
                    value: item.id,
                    type: 3,
                    alias: '',
                    label: `${item.foreignDivisionName}`
                }
            })

            let destinationList = [...seaportListEnd, ...countryListEnd]
            //服务端需要渲染的返回数据
            return { links: links, hotNews: hotNews, departureList: departureList, initDepartureList: departureList, destinationList: destinationList, initDestinationList: destinationList, NewsNews: NewsNews }
        } catch (err) {
            console.log(err)
        }
    },
    
    computed: {

    },
    created(){
        this.typeInOrderNum = ''
    },
    mounted () {
        //控制弹窗的逻辑
        let date = new Date().getTime()
        // 如果当前获取到的时间比本次存储的上次登录时间多24小时
        if(date - localStorage.getItem('date') >= 24*60*60*1000){
          localStorage.setItem('date',date)
          localStorage.setItem('showState',true)
        }
        if(getToken()){   //如果用户已经登录
          this.showWechat = false
        }else{            //用户未登录
          // 通过获取localStorage中的showState不存在即第一次进入页面或showstate为真
          if(localStorage.getItem('showState') === null){
            this.showWechat = true 
          }else if(localStorage.getItem('showState') === 'false'){  //在获取的属性为字符串不能直接赋值
            this.showWechat = false
          }else{
            this.showWechat = true 
          }
        }
        
        //搜索站点港口动画
        this.lootieSearchPort = lottie.loadAnimation({
            container: document.getElementById('lottie'),
            speed: 1,
            loop: true,
            renderer: 'svg',
            autoplay: true,
            animationData: animationData.default   //如果有图片做动效,二者填其一即可
        })
        this.lootieSearchPort.setSpeed(1)
        //省力动画
        this.lottieSaveEffort = lottie.loadAnimation({
            container: document.getElementById('lottieSaveEffort'),
            speed: 1,
            loop: true,
            renderer: 'svg',
            autoplay: true,
            animationData: animationSaveEffort.default   //如果有图片做动效,二者填其一即可
        })
        this.lottieSaveEffort.setSpeed(1)
        //省心动画
        this.lottieFreeWorry = lottie.loadAnimation({
            container: document.getElementById('lottieFreeWorry'),
            speed: 1,
            loop: true,
            renderer: 'svg',
            autoplay: true,
            animationData: animationFreeWorry.default   //如果有图片做动效,二者填其一即可
        })
        this.lottieFreeWorry.setSpeed(1)

        // //滚动加载动画
        let self = this

        let scrollTop
        window.onscroll = function () {
            scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop >= (self.lootieSearchPortTop - 80)) {
                self.lootieSearchPort.play()

            }
            if (scrollTop >= 653) {
                self.headFixed = true
            } else {
                self.headFixed = false
            }
        }

        //  初始化首屏轮播图swiper
        this.firstBannerSwiper = new Swiper('.firstBannerSwiper', {
            loop: false,
            speed: 1600,
            slideToClickedSlide: false,
            // initialSlide: 2,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            autoplay: true,
            direction: 'horizontal',
            mousewheel: {
                releaseOnEdges: true,
                eventsTarged: '#screenSwiper',
            },

        })

        //页面刷新回到顶部
        window.onload = function () {
            window.scrollTo(0, 0)
            new WOW({
                live: false,
                offset: 0
            }).init()
        }
    },
    methods: {
        openYSF(){
          this.$refs.topNav.openYSF()
        },
        
        closeWechat(){
          this.showWechat = false
          let date = new Date().getTime()
          localStorage.setItem('showState',false)
        },
        
        userDialog (type) {
            this.$bus.$emit('showUserDialog', type)
        },

        typeInOrder(e){
            this.typeInOrderNum = e.target.value
           
        },
        triggerGOtoTrackPage(){
            // if( !getToken()){
            //    this.$message('您还未登录，请先登录在查询')
            //     let that = this
            //     setTimeout(function () { that.userDialog(0) }, 1000)

            //     return
            // }
            // if(!this.typeInOrderNum){
            //      this.$message('提单号不可为空');
            //      return
            // }
            this.pushUrl('/logistics?typeInOrderNum='+this.typeInOrderNum)
        //    this.jumpPath('/logisticsTracking')
        //      this.$util.cookie.setCookie('typeInOrderNum', this.typeInOrderNum)
            //  this.$util.cookie.setCookie('comeFromNav', false)
     
   },
        //搜索港口获得焦点，停掉自动轮播
        stopFirstSwiper () {
            this.firstBannerSwiper.autoplay.stop()
        },
        gotoNews () {
            this.$router.push({ path: '/news' })
        },

        //客户端：搜索出发地|出发港口
        searchStartPort (value) {
            //如果搜索词为空
            if (!value) {
                this.departureList = this.initDepartureList
                return
            }

            this.departureList = [{
                value: '',
                seaPortName: '查询中..'
            }]
            quickOrderBeginSite(this, value).then(res => {
                let seaportList = res.bbiSeaportList.map(item => {
                    console.log(item)
                    return {
                        seaportType: '港口',
                        seaPortName: `${item.seaportEng}(${item.seaportChn})`,
                        country: '',
                        value: item.id,
                        type: Number(item.seaportType),
                        alias: item.seaportAlias,
                        label: `${item.seaportEng}(${item.seaportChn})`,
                    }
                })

                let countryList = res.bbiChinaDivisionList.map(item => {
                    return {
                        seaportType: '城市',
                        seaPortName: `${item.fullName}`,
                        country: '中国',
                        value: item.id,
                        type: 0,
                        alias: '',
                        label: item.fullName
                    }
                })
                this.departureList = [...seaportList, ...countryList]
            })
        },

        //客户端：搜索目的地｜目的港口
        searchEndPort (value) {
            //如果搜索词为空
            if (!value) {
                this.destinationList = this.initDestinationList
                return
            }
            this.destinationList = [{
                value: '',
                seaPortName: '查询中..'
            }]
            quickOrderEndSite(this, value).then(res => {
                let seaportList = res.bbiSeaportList.map(item => {
                    return {
                        seaportType: '港口',
                        seaPortName: `${item.seaportEng}(${item.seaportChn})`,
                        value: item.id,
                        country: '',
                        type: Number(item.seaportType),
                        alias: item.seaportAlias,
                        label: `${item.seaportEng}(${item.seaportChn})`,
                    }
                })
                let countryList = res.bbiForeignDivisionList.map(item => {
                    return {
                        seaportType: '城市',
                        seaPortName: item.foreignDivisionName,
                        country: '',
                        value: item.id,
                        type: 3,
                        alias: '',
                        label: `${item.foreignDivisionName}`
                    }
                })
                this.destinationList = [...seaportList, ...countryList]
            })
        },
        //校验出发地
        verifyStartPort () {
            if (!this.startPort) {
                this.departureList = this.initDepartureList
                return
            }
        },
        //   校验出发地
        verifyEndPort () {
            if (!this.endPort) {
                this.destinationList = this.initDestinationList
                return
            }
        },
        searchEvent () {
            let cookieStartPortList, cookieEndPortListl, quickOrderQuerys
            cookieStartPortList = this.departureList.map(item => {
                return {
                    label: item.label,
                    alias: item.alias,
                    type: item.type,
                    country: item.country,
                    value: item.value
                }
            })
            cookieEndPortListl = this.destinationList.map(item => {
                return {
                    label: item.label,
                    alias: item.alias,
                    type: item.type,
                    country: item.country,
                    value: item.value
                }
            })
            quickOrderQuerys = {
                sourceFromOfficial: true,
                sPortId: this.startPort,
                dPortId: this.endPort,
                start: cookieStartPortList,
                end: cookieEndPortListl,
                period: [],
                check20GP: true,
                check40GP: false,
                check40HC: false,
                smStack: false,
                smClear: false,
                dmClear: false,
                page: 0
            }

            this.$util.cookie.setCookie('quickOrderQuerys', quickOrderQuerys)
            //window.location.href = 'http://localhost:8080/#/quickOrder/index'
            window.open(process.env.ENV_SITE + "/quickOrder/index", "_self")
        },
        jumpPath (path) {
            this.$router.push(path)
        },
        pushUrl (url) {
            //this.$router.push(url);
            if (url == '/quickOrder/index') {
                this.$util.cookie.setCookie('quickOrderQuerys', {})
            }
            window.open(process.env.ENV_SITE + url, "_self")
        },
    }
}

</script>

<style lang="scss" >
.ysfButton{
  position: fixed;
  right: 25px;
  bottom:120px;
  margin-top: 84px;
  // left: 1421px;
  width: 70px;
  height: 74px;
  background: #2774EF;
  border-radius: 6px;
  overflow: hidden;
  z-index: 90;
}
.ysfButton:hover{
  cursor: pointer;
}

.wechatButtonWrap{
  z-index: 2000 !important;
  position: fixed;
  // top: 71%;
  // left: 95%;
  right: 25px;
  bottom: 205px;
  width: 70px;
  height: 74px;
}
.wechatButton{
  width: 70px;
  height: 74px;
  background: #2774EF;
  border-radius: 6px;
  overflow: hidden;
}
.wechatButton:hover{
  cursor: pointer;
}
.wechatButton > .wechatico{
  width: 100%;
  height: 100%;
}
.wechatButtonWrap{
  .wechatPop{
    position: relative;
    top: -120px;
    left: -179px;
    p{
      position: absolute;
      top: 109px;
      left: 0;
      text-align: center;
    }
    #firstP{
      width: 179px;
      height: 16px;
      font-size: 16px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #314CCD;
      line-height: 27px;
    }
    #secondP{
      padding-top: 30px;
      width: 179px;
      height: 12px;
      font-size: 14px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #314CCD;
      line-height: 27px;
    }
  }
}
.wachatWarpimg-leave-active,.v-leave-active,.v-enter-active,.wachatWarpimg-enter-active{
  transition: all 1s ease;
}
.v-enter{
  background-color:rgba($color: #000000, $alpha: 0) !important;
}
.wachatWarpimg-enter{
  width: 70px !important;
  height: 74px !important;
  border-radius: 6px !important;
  top: 50% !important;
  left: 92.9% !important;
  opacity: 0;
}
.v-leave-to{
  background-color:rgba($color: #000000, $alpha: 0) !important;
}
.wachatWarpimg-leave-to{
  width: 70px !important;
  height: 74px !important;
  border-radius: 6px !important;
  top: 50% !important;
  left: 92.9% !important;
  opacity: 0;
}
.wechatWarpBack{
  width: 100%;
  height: 100vh;
  background-color: rgba($color: #000000, $alpha: 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 4100 !important;
}
.wechatWarp {
  margin: auto;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 542px;
  width: 398px;
  z-index: 4200;
}
.wechatWarp> img{
  width: 100%;
  height: 100%;
}
.wechatWarp> #close{
  width: 28px;
  height: 28px;
  border-radius: 50%;
  position: absolute;
  top: 2px;
  left: 367px;
  z-index: 4201 !important;
}
.wechatWarp> #close:hover{
  cursor: pointer;
}


.weiBankButton {
  border: none;
  outline: none;
  &:hover {
    background: #eaa620;
  }
}
.content button.hand:hover {
  background: #38a8ac;
}
.portCase {
  width: 810px;
  // background: white;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  color: #bbc0d9;
  padding: 10px 0;
  font-size: 14px;
  span:before {
    content: '·';
    color: #bbc0d9;
    padding: 0 5px;
  }
  span:last-child {
    margin-right: 5px;
  }
}
@mixin text-overflow($line) {
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: $line;
  -webkit-box-orient: vertical;
}
html,
body {
  width: 100%;
  height: 100%;
}
.swiper-pagination-bullet {
  width: 40px;
  height: 3px;
  border-radius: 2px;
  cursor: pointer;
  background: #fff;
  border: none;
  outline: none;
}
.swiper-pagination-bullet-active {
  width: 40px;
  height: 3px;
  border-radius: 2px;
  background: white;
  cursor: pointer;
}
.container {
  margin: 0 auto;
  //   min-height: 100vh;
  //   background: red;
  text-align: center;

  .firstBanner {
    .swiper-slide {
      height: 653px;
      width: 100%;

      background-size: cover;
      background-position: 50% 50%;
    }
    height: 653px;
    background-size: contain;
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
.bannerClient {
  min-width: 1200px;
  height: 653px;
  text-align: center;
}
.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.contentWrap {
  //   overflow-x: hidden;
  position: relative;
  display: block;
  //   width: 100vw;
  //   height: 100vh;
  text-align: center;
  .content {
    width: 1200px;
    // background: pink;
    position: relative;
    margin: 0 auto;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: justify;
    -webkit-justify-content: space-between;
    -ms-flex-pack: justify;
    justify-content: space-between;
    .transportleft {
      display: block;
      width: 50vw;
      background: yellow;
    }
    //二级banner
    .swiper-container {
      --swiper-theme-color: #ff6600; /* 设置Swiper风格 */
      --swiper-navigation-color: #00ff33; /* 单独设置按钮颜色 */
      --swiper-navigation-size: 30px; /* 设置按钮大小 */
      outline: none;
    }
  }
}
.saveEffortWrap,
.convenientWrap,
.saveTimeWrap,
.freeWorryWrap,
.usersaidWrap,
.excellentWrap {
  min-width: 1200px;

  overflow: hidden;
}
.freeWorryWrap {
  padding-top: 150px;
  padding-bottom: 50px;
}
.freeWorryLeft {
  position: relative;
  .blueWatch,
  .redWatch {
    position: absolute;
    left: 0;
  }
  .tabelShow {
    width: 241px;
    height: 255px;
    position: absolute;
    z-index: 2;
    top: -45px;
    left: 450px;
  }
  .redWatch {
  }
  .point {
    position: absolute;
    // top: 14%;
    height: 180px;
    // transform-origin: 100% 100%;
    width: 20px;
    // transform: rotate(-112deg);
  }
  .watch {
    position: absolute;
    left: 60px;
    top: 58px;
  }
}
.convenientWrap {
  padding-bottom: 90px;
}
.usersaidWrap {
  .content {
    width: 1200px;
    margin: 0 auto;
    padding-top: 100px;
  }
  h3 {
    color: #3b426b;
    font-size: 36px;
    padding-bottom: 80px;
  }
}
.excellentWrap {
  height: 896px;
  margin-top: 60px;
  background: url('~assets/img/01_bj12.png') no-repeat center;
  background-size: cover;

  .content {
    width: 1200px;
    display: block !important;

    .excellentWrap_title {
      text-align: left;
      width: 100%;
      margin-top: 146px;
      font-size: 48px;
      font-family: lianmengqiyilushuaizhengruiheiti;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      line-height: 56px;
      letter-spacing: 3px;
    }

    .excellentWrap_content {
      width: 100%;
      font-family: Source Han Sans CN !important;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      margin-top: 135px;

      .excellentWrap_point {
        display: flex;
        justify-content: flex-start;
        height: 242px;

        .excellentWrap_point-img {
          width: 118px;
        }

        .excellentWrap_point-text {
          margin-left: 44px;
          text-align: left;

          div {
            font-size: 36px;
            margin-bottom: 24px;
            letter-spacing: 2px;
          }

          span {
            font-size: 16px;
            line-height: 36px;
            letter-spacing: 1px;
          }
        }
      }
    }

    .excellentWrap_tips {
      font-size: 14px;
      font-family: SimSun;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      letter-spacing: 2px;
      text-align: left;
    }
  }
}

.excellent-content__title {
  height: 153px;
  padding-top: 73px;
  text-align: center;

  p {
    font-size: 48px;
    font-family: Source Han Sans CN;
    font-weight: 700;
    color: rgba(59, 66, 107, 1);
    letter-spacing: 4px;
  }

  div {
    width: 100%;
    margin-top: 33px;

    button {
      width: 218px;
      height: 6px;
      background: linear-gradient(
        90deg,
        rgba(12, 179, 183, 1) 0%,
        rgba(14, 92, 231, 1) 100%
      );
      border-radius: 4px;
      cursor: default;
    }

    button:focus {
      outline: none;
    }
  }
}

.firstBanner1 {
  background: url('~assets/img/firstBanner1.jpg');
  button {
    background: #15b7b9;
  }
}
.firstBanner2 {
  background: url('~assets/img/01_zz05.jpg');
  button {
    background: #3754d3;
  }
}
/*.firstBanner3 {
  background: url('~assets/img/firstBanner3.jpg');
  .searchPort {
    padding-top: 200px;
  }
  .slogan {
    font-size: 48px;
    color: #fff;
    padding-bottom: 40px;
  }
  .portSearch {
    width: 790px;
    height: 62px;
    background: #d2d8ec;
    margin: 0 auto;
    border-radius: 5px;
    padding: 20px;
    display: flex;
    justify-content: space-between;
  }
  .selectPort {
    width: 630px;
    display: flex;
    justify-content: space-between;
    background: white;
    border-radius: 5px;
    overflow: hidden;
    position: relative;
  }
  .searchBtn {
    width: 142px;
    height: 60px;
    background: #15b7b9;
    border: none;
    font-size: 20px;
    &:hover {
      background: #38a8ac;
    }
  }
  .el-select {
    width: 300px;
    position: relative;
    input.el-input__inner {
      height: 60px;
      padding-left: 51px;
      border: none;
    }
    width: 300px;
  }
  .iconStart::before,
  .iconEnd::before {
    position: absolute;
    left: 20px;
    top: 20px;
    display: inline-block;
    width: 20px;
    height: 24px;
    background-size: 20px 24px;
    content: '';
    z-index: 1;
  }
  .iconStart::before {
    background: url('~assets/start.png');
  }
  .iconEnd::before {
    background: url('~assets/img/end.png');
  }
}*/
.firstBanner4 {
  background: url('~assets/img/firstBanner4.jpg');
  .weiBankTitle {
    display: flex;
    width: 610px;
    height: 100px;
    flex-direction: row;
    padding-top: 404px;
  }
  button {
    width: 160px;
    height: 50px;
    color: #fff;
    font-size: 16px;
    background: #ffb400;
    border: none;
  }
  h3 {
    color: #c45102;
    font-size: 24px;
  }
  h3:not(first-child) {
    margin-left: 25px;
  }
  img {
    width: 25px;
    height: 25px;
    margin-left: 25px;
  }
}

.firstBanner5 {
  background: url('~assets/img/firstBanner5.jpg');
  .partner {
    width: 100%;
    height: 58px;
    text-align: center;
    position: relative;
    top: 521px;
    font-size: 24px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    font-style: italic;
    color: rgba(255, 255, 255, 1);
    line-height: 58px;

    span:nth-child(2) {
      padding-left: 25px;
      padding-right: 31px;
    }

    span:nth-child(4) {
      padding-left: 38px;
      padding-right: 43px;
    }

    span:nth-child(6) {
      padding-left: 29px;
      padding-right: 27px;
    }
  }
}

.firstBanner6 {
  position: relative;
  z-index: -1;
  background: url('~assets/img/firstBanner6.jpg');
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;

  .el-row {
    width: 1200px;
    height: 498px;
    padding-top: 155px;

    div {
      text-align: left !important;

      h1 {
        margin-top: 45px;
        font-size: 24px;
        font-weight: 400;
        letter-spacing: 4px;
      }

      p {
        margin-top: 26px;
        font-size: 16px;
        font-weight: 500;
        letter-spacing: 6px;
      }

      button {
        margin-top: 38px;
        width: 159px;
        height: 47px;
        background: rgba(21, 183, 185, 1);
        color: rgba(255, 255, 255, 1);
        letter-spacing: 1px;
        font-size: 16px;

        button:hover {
          background: rgba(21, 183, 185, 0.8);
        }
      }
    }

    .el-col-14 {
      padding-left: 45px;

      img {
        margin-top: 70px;
      }
    }

    .el-col-10 img {
      margin-left: 20px;
    }
  }
}

.firstBanner7 {
  background: url('~assets/img/firstBanner7.jpg');
  font-family: Source Han Sans CN;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  text-align: center;
}

.swiper-slide {
  > div {
    width: 1200px;
    height: 470px;
    margin: 0 auto;
  }
}
.calcOnline {
  width: 480px;
  height: 260px;
  position: relative;
  top: 50%;
  margin-top: -130px;
  button:hover {
    background: #38a8ac;
  }
}
.index-banner__solution {
  width: 600px;
  height: 260px;
  position: relative;
  top: 50%;
  margin-top: -130px;
  letter-spacing: 2px;
  button:hover {
    background: #38a8ac;
  }
}
.cooperation {
  width: 480px;
  height: 260px;
  position: relative;
  top: 50%;
  margin-top: -130px;
  button:hover {
    background: #2041d1;
  }
}
.calcOnline,
.index-banner__solution,
.cooperation {
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 120px;
  h1 {
    font-size: 40px;
    text-align: left;
    padding-bottom: 30px;
  }
  h2 {
    text-align: left;
    font-size: 18px;
    position: relative;
    top: -25px;
    line-height: 2.5;
  }
  button {
    font-size: 16px;
    color: #fff;
    width: 160px;
    height: 46px;
    outline: none;
    border: none;
  }
}
.secondBanner {
  cursor: pointer;
  padding-top: 20px;
  padding-bottom: 60px;
  .swiper-container {
    overflow: inherit;
  }
  height: 223px;
  width: 1200px;
  margin: 0 auto;
  position: relative;
  overflow: inherit;
  .buttonPre,
  .buttonNext {
    position: absolute;
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #cccccc;
    div {
      height: 35px;
      color: #fff;
      text-align: center;
      &::after {
        font-size: 28px;
        position: relative;
      }
    }
  }
  .buttonPre {
    left: -12px;
    top: 106px;
    div::after {
      left: -3px;
      top: 7px;
    }
  }
  .buttonNext {
    right: 12px;
    top: 106px;
    div::after {
      left: 3px;
      top: 5px;
    }
  }

  .swiper-button-prev {
    display: inline-block;
  }
}
.secondSwiperSlide {
  height: 223px;
  //   background: blue;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //   padding: 0 50px;
  .newsItem {
    width: 314px;
    height: 107px;
    padding: 26px 15px;
    border-radius: 6px;
    background: white;
    box-shadow: 0px 0px 8px #cbd0ee;
    overflow: hidden;
    margin: 0 15px;
    -webkit-transform: scale(1);
    transform: scale(1);
    transition: all 0.8s ease-in-out;
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    .newsItemImg {
      border-radius: 6px;
      float: left;
      display: inline-block;
      width: 80px;
      height: 97px;
      margin-right: 20px;
      overflow: hidden;

      i {
        height: 100%;
        display: inline-block;
        width: 100%;
        background-size: cover !important;
        background-position: center !important;
      }
    }
    p {
      text-align: left;
      color: #63608e;
      font-size: 14px;
      line-height: 2;
      position: relative;

      span {
        color: #63608e;
        font-size: 12px;
      }
    }
    p:first-child {
      top: -10px;
      height: 60px;
      @include text-overflow(2);
    }
    p:last-child {
      overflow: inherit;
      i {
        color: #15387f;
        font-size: 14px;
        position: absolute;
        right: 0;
        bottom: -5px;
        width: 80px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border-radius: 5px;
        background: #eaf0f7;
      }
    }
  }
  .newsItem:hover {
    -webkit-transform: scale(1.02);
    transform: scale(1.02);

    transition: all 0.8s ease-in-out;
    -webkit-transition: opacity 0.35s, -webkit-transform 0.35s;
    .checkDetail {
      background: #d7e1ed;
    }
  }
  .firstNewsItem {
    margin-left: 80px;
  }
  .lastNewsItem {
    margin-right: 80px;
  }
}
.prev,
.next,
.thirdBanner .swiper-button-prev,
.thirdBanner .swiper-button-next {
  position: absolute;
  width: 50px;
  height: 50px;
  background: #cccccc;
  border-radius: 50%;
}
.prev,
.thirdBanner .swiper-button-prev {
  margin-right: 10px;
  left: 0px;
}
.next,
.thirdBanner .swiper-button-next {
  right: 0px;
  margin-left: 10px;
}
.prev:before,
.thirdBanner .swiper-button-prev:before {
  content: '';
  display: inline-block;
  border-top: 2px solid;
  border-right: 2px solid;
  width: 18px;
  height: 18px;
  border-color: #fff;
  transform: rotate(-135deg);
  position: relative;
  top: 15px;
  left: 4px;
}
.next:before,
.thirdBanner .swiper-button-next:before {
  content: '';
  display: inline-block;
  border-top: 2px solid;
  border-right: 2px solid;
  width: 18px;
  height: 18px;
  border-color: #fff;
  transform: rotate(45deg);
  position: relative;
  top: 15px;
  left: -2px;
}
.thirdBanner .next {
  margin-left: 10px;
  top: 150px;
  right: 0px;
}

.thirdBanner .prev {
  left: 0px;
  top: 150px;
}

.thirdBanner .swiper-button-prev,
.thirdBanner .swiper-button-next {
  top: 182px;
  outline: none;
}
.thirdBanner .swiper-button-prev:after,
.thirdBanner .swiper-button-next:after {
  content: '';
}
.thirdBanner .swiper-button-prev:before,
.thirdBanner .swiper-button-next:before {
  top: 0;
}
.opacityShow {
  opacity: 1 !important;
}
//省力
.saveEffort {
  //   padding-top: 30px;
}
.saveEffortLeft,
.convenientRight,
.saveTimeLeft,
.freeWorryRight {
  letter-spacing: 1px;
  //   opacity: 0;
  //   animation-iteration-count: 1;
  //   animation: forwards;
  .knowMore {
    text-align: left;
    border-radius: 4px;
  }
  h2 {
    color: #474374;
    font-size: 36px;
    text-align: left;
    padding: 90px 0 25px 0;
    -webkit-animation-delay: 1.5s; //延迟执行动画
    animation-delay: 1.5s;
    font-weight: bold;
  }
  h3 {
    font-weight: bold;
    // 延迟时间
    -webkit-animation-delay: 0.6s; //延迟执行动画
    animation-delay: 0.6s;
    //执行时间
    // -webkit-animation-duration: 0.3s;
    // animation-duration: 0.3s; // 动画执行时间
    color: #474374;
    font-size: 20px;
    text-align: left;
    padding-bottom: 50px;
  }
  h6 {
    color: #63608e;
    font-size: 18px;
    text-align: left;
    line-height: 2.5;
    padding-bottom: 65px;
  }
  span {
    font-size: 24px;
    color: #ee5c60;
    margin-left: -3px;
    margin-right: 2px;
  }
  button {
    width: 180px;
    height: 52px;
    color: #fff;
    font-size: 18px;
    background: #15b7b9;
    outline: none;
    border: none;
  }
}
.convenientRight h2 {
  padding-top: 60px;
}
.saveEffortRight {
  //   opacity: 0;
  position: absolute;
  width: 850px;
  right: -40px;
  top: 20px;
  //   .saveEffortRightPath {
  //     position: absolute;
  //     width: 864px;
  //     height: 576px;
  //     right: -6px;
  //     background: #fff;
  //     z-index: 2;
  //     img {
  //       width: 804px;
  //       height: 388px;
  //       border-radius: 10px;
  //       box-shadow: 0 0 10px #cbd0ee;
  //       // top: 143px;
  //       position: relative;
  //       right: -7px;
  //     }
  //   }
  //   .saveEffortRightSearch {
  //     position: absolute;
  //     right: 0;
  //     z-index: 1;
  //   }
}
.saveEffortLeft h2 {
  padding: 20px 0 25px 0;
}
.saveEffortLeft h6 {
  width: 345px;
}
.animSearch {
  margin-top: 8px;
  width: 680px;
  height: 50px;
  box-shadow: 0 0 6px #cbd0ee;
  border-radius: 5px;
  padding: 25px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  > div {
    border: 1px solid #e0e0ec;
    border-radius: 5px;
    width: 545px;

    display: flex;
    flex-direction: row;
    align-items: center;
  }
  p {
    color: #6f849e;
    font-size: 14px;
    // display: inline-block;
    width: 260px;
    padding: 0 0 0 20px;
    text-align: left;

    align-items: center;
    display: flex;
  }
  p:first-child {
    border-right: 1px solid #e0e0ec;
  }
  button {
    display: block;
    background: #15b7b9;
    color: #fff;
    padding: 0 15px;
    border: none;
    width: 122px;
  }
  .animIconStart,
  .animIconEnd {
    display: inline-block;
    width: 20px;
    height: 24px;
    background-size: 20px 24px;
    background: url('~assets/start.png');
    margin-right: 15px;
  }
  .animIconEnd {
    background: url('~assets/img/end.png');
  }
}
.animPort {
  width: 714px;
  display: flex;
  justify-content: space-between;
  padding: 15px 0 40px 0;
  p {
    color: #220077;
    font-size: 14px;
    span {
      padding: 5px 0;
    }
  }
}
.animPath {
  width: 810px;
  height: 270px;
  padding: 60px 20px;
  box-shadow: 0 0 6px #cbd0ee;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  .pathDetail {
    display: flex;
    justify-content: space-between;
    width: 810px;
    border: 1px solid #e4e6ed;
    border-radius: 5px;
    background: #fdfdff;
    height: 122px;
  }

  .pathLeft {
    width: 616px;
    padding: 21px 15px;
    border-right: 1px dashed #8d78c1;
    > div {
      display: flex;
      justify-content: space-between;
    }
    p {
      color: #70859f;
      font-size: 12px;
      display: flex;
      flex-direction: column;
      span {
        padding: 5px 0;
        text-align: center;
      }
    }
  }
  .line {
    position: relative;
    padding-top: 35px;
    width: 616px;
    text-align: center;
    a {
      display: inline-block;
      margin-left: 50px;
      width: 516px;
      height: 1px;
      background: linear-gradient(to right, #4434bc, #15b7b9);
    }
    i {
      position: absolute;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: red;
    }
    .idot1 {
      bottom: -4px;
      left: 44px;
      background: #4434bc;
    }
    .idot2 {
      bottom: -4px;
      left: 200px;
      background: #4434bc;
    }
    .idot3 {
      bottom: -4px;
      left: 379px;
      background: #15b7b9;
    }
    .idot4 {
      bottom: -4px;
      left: 562px;
      background: #15b7b9;
    }
  }
  .pathRight {
    padding: 21px 35px;
    p {
      color: #220077;
      font-size: 14px;
      padding-bottom: 10px;
      span {
        color: #ff1b6e;
      }
    }
    button {
      background: #ee5c60;
      width: 100px;
      height: 30px;
      border-radius: 5px;
      color: #fff;
      border: none;
    }
  }
}
.convenient {
  padding-top: 150px;
}

.convenientLeft {
  //   opacity: 0;
  width: 661px;
  height: 526px;
  position: relative;
  top: 130px;
  left: 40px;
  img {
    position: absolute;
  }
  .tip1 {
    left: 10px;
    top: 86px;
  }
  .tip2 {
    top: -78px;
    left: 118px;
  }
  .tip3 {
    left: 264px;
    top: 163px;
  }
  .tip4 {
    top: 10px;
    left: 373px;
  }
}
.saveTime {
  padding-top: 140px;
  position: relative;
  height: 530px;
  padding-bottom: 80px;
  .saveEffortLeft {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }
  #lottie {
    width: 1200px;
    visibility: visible;
    height: 650px;
    top: -140px;
    right: -201px;
  }
}

.freeWorryLeft {
  width: 650px;
  height: 490px;
}
.saveTimeLeft {
  h2 {
    padding-top: 0;
  }
}
.saveTimeRight {
  //   opacity: 0;
  padding-top: 30px;

  position: relative;
  //   background: red;
  width: 830px;
  top: 70px;
}
.coffee {
  width: 837px;
  height: 235px;
  position: absolute;
  right: 0;
  bottom: 50px;
  z-index: 99;
}
.quote1 {
  position: absolute;
  left: -16px;
  bottom: 423px;
  transform: rotate(-13deg);
  z-index: 1;
}
.quote2 {
  position: absolute;
  left: 2px;
  bottom: 297px;
  transform: rotate(10deg);
  z-index: 2;
}
.quote3 {
  position: absolute;
  left: 184px;
  bottom: 544px;
  transform: rotate(9deg);
  z-index: 2;
}
.quote4 {
  position: absolute;
  right: 0px;
  bottom: 415px;
  transform: rotate(10deg);
  z-index: 4;
  position: absolute;
}
.quote5 {
  //   opacity: 0;
  position: absolute;
  right: 100px;
  bottom: 345px;
  transform: rotate(-7deg);
  z-index: 5;
}
.earthIn {
  left: 0px;
  width: 682px;
  height: 604px;
  top: -127px;
  opacity: 0.7;
}
.earthOut {
  left: 0;
  width: 652px;
  height: 412px;
}
//合作伙伴
.partenerWrap {
  min-width: 1200px;
  padding-top: 75px;
}
.partener {
  width: 1200px;
  height: 400px;
  background: #f1f5ff;
  border-top-left-radius: 50px;
  border-top-right-radius: 50px;
  margin: 0 auto;
  h3 {
    color: #3b426b;
    font-size: 36px;
    padding-top: 30px;
  }
  p {
    padding-top: 70px;
    display: flex;
    justify-content: space-between;
    img {
      width: 130px;
    }
    img:first-child {
      margin-left: 90px;
    }
    img:last-child {
      margin-right: 90px;
    }
  }
  .partenerLogo1 {
    width: 50px;
    height: 48px;
    // position: relative;
    margin-top: -7px;
  }
  .partenerLogo2 {
    width: 66px;
    height: 42px;
  }
  .partenerLogo3 {
    width: 63px;
    height: 29px;
    margin-top: 5px;
  }
  .partenerLogo4 {
    width: 123px;
    height: 28px;
    // position: relative;
    margin-top: 3px;
  }
  .partenerLogo5 {
    width: 113px;
    height: 23px;
    margin-top: 5px;
  }
  .partenerLogo6 {
    width: 70px;
    height: 26px;
    margin-top: 12px;
  }
  .partenerLogo7 {
    width: 92px;
    height: 43px;
    margin-top: -3px;
  }
  .partenerLogo8 {
    width: 87px;
    height: 28px;
    margin-top: -5px;
  }
  .partenerLogo9 {
    width: 63px;
    height: 41px;
  }
  .partenerLogo10 {
    width: 78px;
    height: 48px;
  }
  .partenerLogo11 {
    width: 42px;
    height: 40px;
  }
  .partenerLogo12 {
    width: 120px;
    height: 21px;
  }
  .partenerLogo13 {
    width: 142px;
    height: 22px;
  }
  .partenerLogo14 {
    width: 43px;
    height: 40px;
  }
  .partenerLogo15 {
    width: 152px;
    height: 40px;
  }
  .partenerLogo16 {
    width: 82px;
    height: 21px;
  }
  .partenerLogo8,
  .partenerLogo12,
  .partenerLogo13,
  .partenerLogo16 {
    position: relative;
    top: 10px;
  }
  .partenerLogo2 {
    position: relative;
    top: -5px;
  }
}
.usersaidWrap {
  .userSaidContent {
    padding-bottom: 80px;
    display: flex;
    justify-content: space-between;
  }
  .userSaidDetail {
    height: 210px;
    border-radius: 10px;
    &:first-child {
      margin-left: 110px;
    }
    &:last-child {
      margin-right: 110px;
    }
    position: relative;
    width: 330px;
    padding: 100px 40px 40px 70px;
    box-shadow: 0 0 10px #cbd0ee;
    .dot {
      position: absolute;
      top: 40px;
      left: 70px;
    }
    .userIcon {
      position: absolute;
      width: 80px;
      height: 80px;
      display: inline-block;
      border-radius: 50%;
      overflow: hidden;
      left: -40px;
      top: 130px;
      img {
        position: relative;
        top: -10px;
        left: -30px;
      }
    }

    h5 {
      color: #63608e;
      font-size: 14px;
      line-height: 2.5;
      text-align: left;
    }
    h4 {
      color: #63608e;
      font-size: 16px;
      line-height: 1.5;
      text-align: left;
      padding-top: 20px;
      font-weight: bold;
    }
  }
}
.hand {
  cursor: pointer;
  border: none;
  outline: none;
}
.el-icon-search:before {
  font-size: 19px;
  top: 0 !important;
}
.el-select-dropdown__item {
  span:first-child {
    border: 1px solid #858c99;
    border-radius: 3px;
    padding: 3px;
  }
}
.verticalline {
  border-left: 1px solid #d2d8ec;
  width: 2px;
  height: 34px;
  /* background: palevioletred; */
  position: absolute;
  top: 14px;
  left: 300px;
}

//lottie动画
.saveEffortWrap {
  position: relative;
}
.saveEffortLeft {
  position: relative;
  z-index: 1;
}
#lottie {
  position: absolute;
  z-index: 0;
  padding: 10px;
  width: 72%;
  right: 0;
}
.partener .partenerLogo20 {
  width: 86px;
  height: 35px;
}
.partener .partenerLogo16 {
  width: 110px;
  height: 30px;
}
.partenerPlan {
  background: #f1f5ff; //
  height: 821px;
  margin-bottom: 10px;
  position: relative;
}
.ourPartener {
  margin-top: 23px;
  display: flex;
  flex-direction: row;
  justify-content: center;

  .partenerRule {
    width: 382px;
    height: 390px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 3px 0px 98px 11px rgba(15, 37, 187, 0.09);
    border-radius: 4px;
    &:nth-child(2) {
      margin: 0 27px;
    }
    .palanIcon {
      width: 118px;
      height: 130px;
      margin: 57px 0 47px 0;
    }
    .secPlanIcon {
      width: 146px;
      height: 130px;
    }
    .thirdPlanIcon {
      width: 130px;
      height: 130px;
    }
    h3 {
      font-size: 24px;
      font-family: Source Han Sans SC;
      font-weight: bold;
      color: rgba(71, 67, 116, 1);
      margin-bottom: 35px;
    }
    h4 {
      font-size: 14px;
      font-family: SimSun;
      font-weight: 400;
      color: rgba(71, 67, 116, 1);
      line-height: 30px;
    }
  }
}
.joinUsAddress {
  display: flex;
  width: 1200px;
  margin: 0 auto;

  margin-top: 59px;
  flex-direction: row;
  justify-content: space-between;
  p {
    font-size: 14px;
    font-family: SimSun;
    font-weight: 400;
    color: rgba(71, 67, 116, 1);
    line-height: 36px;
  }
}
.huLine {
  background: url('~assets/img/04_hux.png') no-repeat;
  height: 57px;
  width: 100%;
  background-size: cover;
  background: origin;
  position: absolute;
  bottom: -52px;
}
.searchOrder{
    margin-top: 64px;
    width:600px;
    height:70px;
    line-height: 70px;
    background:rgba(255,255,255,1);
    border-radius:35px;
    position: relative;
    input{
        outline: none;
        width: 230px;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #303030;//#b2bcd5;
        height: 59px;
        left: -43px;
        border: none;
        border-left: 1px solid #0088ff;
        opacity: 0.38;
        margin-left: 131px;
        position: relative;
        top: 0px;
        padding-left: 24px;

    }
    span{
        position: absolute;
        right: 6px;
        top: 5px;
        width:150px;
        height:60px;
        display: inline-block;
        line-height: 60px;
        background:rgba(21,183,185,1);
        border-radius:30px;
        font-size:24px;
        text-align: center;
        font-family:PingFang SC;
        font-weight:400;
        color:rgba(255,255,255,1);
            color: white;
    cursor: pointer;
  }
}
.lookContent{
    position: relative;
}
.lookLeft{
    width: 600px;
    position: relative;
    top: 188px;
    left: 0;
    text-align: left;
    h2{
            letter-spacing: 4px;
        font-size:24px;
        font-family:PingFang SC;
        font-weight:300;
        color:rgba(187,202,250,1);
       margin-left: 93px;
        padding-top: 35px;
    }
}
.lookText{
    display: inline-block;
    width: 533px;
    height:144px;
    margin-left: 35px;
}
.lookRight{
    width: 665px;
    height: 326px;
    position: absolute;
    right: -41px;
    top: 164px;
}
.sIcon{
    width: 24px;
    height: 24px;
    display: inline-block;
    top: 6px;
    left: 59px;
    position: relative;
}
.lineDashed{
    position: absolute;
    bottom: 54px;
    right: -194px;
}
.caleLook{
    display: inline-block;
    width: 665px;
    height: 326px;
}
</style>
