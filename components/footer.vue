<template>
    <div class="footer-container">
        <div class="footer-header-content">
            <div class="footer-content">
                <el-row :span="24" style="width: 1200px;">
                    <el-col :span="4">
                        <div class="seccond">平台服务</div>
                        <ul>
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="pushUrl('/quickOrder/index')"
                                >全程物流</a>
                            </li>
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="pushUrl('/freight')"
                                >海运运价</a>
                            </li>
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="jumpPath('/logisticsTracking')"
                                >物流追踪</a>
                            </li>
                            <!-- <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="pushUrl('/freight')"
                                >集装箱运输</a>
                            </li>-->
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="pushUrl('/abroad')"
                                >全球海外仓</a>
                            </li>
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="zscUrlLogin()"
                                    style="padding-bottom: 30px"
                                >智商城</a>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="4">
                        <div class="seccond">解决方案</div>
                        <ul>
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="jumpPath('/solution')"
                                >行业解决方案</a>
                            </li>
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="pushUrl('/solution/jsj')"
                                >结算解决方案</a>
                            </li>
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="jumpPath('/supplyChain')"
                                >助力方案</a>
                            </li>
                            <!-- <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="jumpPath('/solution?gotoIndex=1')"
                                >供应链管理解决方案</a>
                            </li>-->
                        </ul>
                    </el-col>
                    <el-col :span="4">
                        <div class="seccond">关于我们</div>
                        <ul>
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="pushUrl('/platformIntroduce')"
                                >平台介绍</a>
                            </li>
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="pushUrl('/commonProblem')"
                                >常见问题</a>
                            </li>
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="jumpPath('/aboutUs')"
                                >联系我们</a>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="4">
                        <div class="seccond">快捷入口</div>
                        <ul>
                            <li>
                                <a
                                    class="third2"
                                    href="javascript:;"
                                    @click="pushUrl('/check-info')"
                                >企业认证</a>
                            </li>
                            <li @click="userDialog(1)">
                                <a class="third2" href="javascript:;">个人注册</a>
                            </li>
                            <li @click="userDialog(0)">
                                <a class="third2" href="javascript:;">平台登录</a>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="4" :offset="1">
                        <div class="seccond">联系我们</div>
                        <ul>
                            <li>
                                <div class="third1">
                                    <span id="callMe">400-691-0567</span>
                                </div>
                            </li>
                            <li>
                                <div class="third1">工作日 9:00-18:00</div>
                            </li>
                        </ul>
                    </el-col>
                    <el-col :span="3">
                        <div class="seccond">关注我们</div>
                        <ul>
                            <li>
                                <div class="weixin">
                                    <img src="~assets/img/08_ewm.jpg">
                                </div>
                            </li>
                            <!-- <li>
                                <div class="third1">
                                    <img
                                        title="海智链-国内首家全程物流解决方案平台"
                                        alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                                        src="~assets/img/foot/24_dz.png"
                                        style="width: 15px;height: 16px"
                                    >&nbsp;&nbsp;
                                    <span>天津市和平区徐州道12号万通中心1601室</span>
                                </div>
                            </li>-->
                        </ul>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="business-scope">
            <div class="business-scope__content">
                <h2 class="business-scope__title">业务范围：</h2>
                <div class="content">
                    <span>
                        <strong>国际海运出口、</strong>
                        <strong>跨境物流运输、</strong>
                        <strong>天津港口清关、</strong>
                        <strong>一站式供应链、</strong>
                        <strong>海运物流仓储、</strong>
                        <strong>天津国际货运、</strong>
                        <strong>进口报关公司、</strong>
                        <strong>全球海外仓储、</strong>
                        <strong>天津海外仓储、</strong>
                        <strong>一站式物流解决方案、</strong>
                        <strong>海外仓储物流、</strong>
                        <strong>海外仓储公司、</strong>
                        <strong>物流拖车运输、</strong>
                        <strong>整箱出口业务、</strong>
                        <strong>整箱进口业务、</strong>
                        <strong>物流全程、</strong>
                        <strong>国际国内空运、</strong>
                        <strong>全程物流</strong>
                        <strong>集装箱运输</strong>
                        <strong>供应链管理解决方案</strong>
                    </span>
                </div>
            </div>
        </div>
        <div style="display: flex;justify-content: center;">
            <div class="footer-content" style="height: 39px;">
                <span class="app-content__left">
                    <span>
                        <img
                            title="海智链-国内首家全程物流解决方案平台"
                            alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                            src="~assets/img/foot/10_logoh.png"
                        >
                    </span>
                    <nuxt-link target="_self" to @click.native="pushUrl('/copyright')">
                        <span>版权声明</span>
                    </nuxt-link>|
                    <nuxt-link target="_self" to @click.native="pushUrl('/privacy')">
                        <span>隐私保护</span>
                    </nuxt-link>
                </span>
                <div class="app-content__left">
                    <span>
                        <p>&copy; Copyright 2020 海智链 All rights reserved.津ICP备18009714号-4</p>
                    </span>
                    <a
                        target="_blank"
                        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=12010102000417"
                        class="benianLink"
                    >
                        <img
                            title="海智链-国内首家全程物流解决方案平台"
                            alt="智全程-跨境物流运输一站式解决方案平台 全球 国际 国内 物流 运输 船运 陆运"
                            src="~assets/img/foot/wiser-bridge备案图标.png"
                            style="float:left;margin-top:8px"
                        >
                        <p style="margin-left: 5px; color:#939393;">津公网安备 12010102000417号</p>
                    </a>
                </div>
            </div>
        </div>
        <div class="link">
            <div class="link-content">
                <span>友情链接：</span>
                <span
                    @click="targetWeb(item.websiteUrl)"
                    v-for="item in links"
                    target="_Blank"
                >{{item.websiteName}}</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getlinks } from "~/api/getlinks";

export default {
    data () {
        return {
            // links: null
        }
    },
    props: {
        links: null
    },
    created () {
        // this.getlinks(this)
    },
    // asyncData ({ app }) {
    //     let links = this.getlinks(app)
    //     console.log(links)
    //     return { links: links }
    // },
    methods: {
        userDialog (type) {
            this.$bus.$emit('showUserDialog', type)
        },
        jumpPath (path) {
            this.$router.push(path)
        },
        pushUrl (url) {
            window.open(process.env.ENV_SITE + url, "_self")
        },
        zscUrlLogin () {
            window.open(process.env.ENV_ZSC_SITE + '/home', "_blank")
        },
        getlinks () {
            getlinks(this).then(res => {
                this.links = res
            })
        },
        targetWeb (url) {
            window.open(url, '_target')
        }
    }
}

</script>

<style>
.third1 #callMe {
  color: white !important;
  font-weight: bold;
}
.footer-content .el-col {
  text-align: left;
}
</style>
<style lang="scss" scoped>
.footer-header-content {
  width: 100%;
  height: 275px;
  line-height: 1;
  color: #999;
  font-size: 10px;
  box-sizing: border-box;
  background: #252d45;
  display: flex;
  justify-content: center;
}

.footer-header-content a {
  margin: 0px !important;
  font-size: 14px !important;
  font-family: Microsoft YaHei !important;
  line-height: 15px !important;
  color: white !important;
  opacity: 0.3;
}

.seccond {
  font-size: 14pt;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  margin-top: 60px;
  margin-bottom: 40px;
  text-align: left;
  height: 100%;
}

.third2 {
  margin-bottom: 10px;
  opacity: 0.3;
  text-align: left;
  font-size: 12pt;
  color: rgba(255, 255, 255, 1);
  display: grid;
  width: 100px;
}

.third1 {
  padding-bottom: 10px;
  text-align: center;
  font-size: 12pt;
  color: rgba(255, 255, 255, 1);
  display: flex;
}

.third2:hover {
  color: #fff;
  opacity: 1;
  font-size: 13pt;
}

.footer-container {
  position: relative;
  z-index: 999;
  width: 100%;
  min-width: 1200px;
  text-align: center;
  color: #999;
  font-size: 10px;
  box-sizing: border-box;
  background: rgba(17, 22, 35, 1);
  /*display: flex;
              justify-content: center;*/
}

.footer-content {
  width: 1200px;
  display: flex;
  justify-content: space-between;
}

.footer-content .content-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5px;
}

.footer-content .content-row span {
  display: flex;
  align-items: center;
}

.app-content__left {
  height: 39px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #939393;
}

.app-content__left a {
  padding-bottom: 0px !important;
}

.benianLink {
  height: 39px;
  display: flex;
  align-items: center;
  text-decoration: none;
  line-height: 39px;
  padding-bottom: 0px !important;
}

.footer-container a {
  display: inline-block;
  margin: 0 16px;
  font-size: 12px;
  color: #666666;
  white-space: nowrap;
  padding-bottom: 10px;
}

.footer-container p {
  color: #666;
  display: inline-block;
}

.third1,
.third1 span {
  color: #666b83 !important;
  cursor: pointer;
}

.third1:hover,
.third1 span:hover {
  color: white !important;
}

.business-scope {
  min-width: 1200px;
  width: 100%;
  background: #252d45;
  letter-spacing: 2px;
}

.business-scope__title {
  flex-wrap: nowrap;
  color: white;
  width: 80px;
  text-align: left;
  line-height: 20px;
}
.business-scope__content {
  width: 1200px;
  padding: 15px 0;
  border-top: 1px solid #666b83;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  .content {
    display: flex;
    flex-wrap: wrap;
    width: 1100px;
    line-height: 20px;

    span {
      color: white;
      opacity: 0.3;
      text-align: left;
      margin: 0;
      padding: 10px 0 !important 10px 0 !important;
    }
  }
}

.link {
  width: 100%;
  height: 26px;
  letter-spacing: 2px;
  background: rgba(255, 255, 255, 1);
  border-bottom: 3px solid rgba(15, 25, 37, 1);
  justify-content: center;

  font-size: 12px;
  font-family: SimSun;
  font-weight: 400;
  color: rgba(55, 63, 88, 1);

  .link-content {
    width: 98%;
    margin: 0 1%;
    height: 26px;
    line-height: 26px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    span {
      margin: 0;
      font-size: 12px;
      color: rgba(55, 63, 88, 1);
      cursor: default;

      &:nth-child(n + 2) {
        cursor: pointer !important;

        &::after {
          content: '|';
          display: inline-block;
          padding: 0 10px;
        }
      }

      &:last-child {
        &::after {
          content: '';
          display: inline-block;
          padding-left: 0px;
        }
      }
    }
  }
}
</style>
