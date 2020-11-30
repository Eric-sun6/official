<template>
    <div>
        <Header></Header>
        <div class="solution">
            <div class="header-title">
                <h1>行业解决方案</h1>
                <h6>为我们的客户提供最落地的服务，用科技让物流更简单!</h6>
                <el-button class="version-two-button" @click="pushUrl('/check-info')">立即入驻</el-button>
            </div>
            <!-- 内容区域 -->
            <div class="solution-container">
                <div style="width: 1200px;">
                    <!-- 导航区域 -->
                    <ul class="navs" v-show="navShow">
                        <li
                            v-for="(item, index) in navArr"
                            :class="{active: active===index}"
                            @click="scrollTo(index)"
                        >
                            <img
                                src="~assets/svg/dian-bule.svg"
                                width="18px"
                                v-show="active===index"
                            >
                            <img src="~assets/svg/dian.svg" width="18px" v-show="active!==index">
                            {{item}}
                        </li>
                    </ul>
                    <div class="content">
                        <div class="content-block">
                            <div class="content-block-info">
                                <div class="content-block-info_left">
                                    <div class="item">
                                        <div class="item-title">
                                            <span style="width: 60px">
                                                <img
                                                    src="~assets/img/solution/02_icon1.png"
                                                    width="40px"
                                                >
                                            </span>
                                            <span>解决零售企业</span>
                                            <span style="color: red">海外仓管理及销售</span>
                                            <span>配套问题</span>
                                        </div>
                                        <div class="item-detail">
                                            <div class="item-font">实时了解全球海外仓库存情况以及在途商品的运输情况，
                                                <br>通过海外仓将产品布局到世界各地终端市场，快速响应市场需求。
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item-title">
                                            <span style="width: 60px">
                                                <img
                                                    src="~assets/img/solution/02_icon2.png"
                                                    width="40px"
                                                >
                                            </span>
                                            <span>平台直接发送出货指令，实现</span>
                                            <span style="color: red">一键销售、一件代发</span>
                                        </div>
                                        <div class="item-detail">
                                            <div class="item-font">平台统计中心可以掌握历史销售情况，为未来销售预期做出
                                                <br>强有力的辅助支持。
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-block-info_right">
                                    <img
                                        src="~assets/img/solution/02_word1.png"
                                        width="596px"
                                        style="margin-left: -90px;"
                                    >
                                </div>
                            </div>
                            <div class="content-block-message">
                                <div class="content-block-message_title">
                                    <span style="width: 60px">
                                        <img src="~assets/img/solution/02_icon3.png" width="40px">
                                    </span>
                                    <span>用户评价</span>
                                </div>
                                <div style="margin-top: 20px;position: relative">
                                    <div class="content-block-message_block" style="top: 62px">
                                        <div
                                            class="message_content"
                                            style="background:rgba(0,210,255,1);"
                                        >
                                            <div class="avatar">
                                                <div class="avatar_img">
                                                    <img
                                                        width="51px"
                                                        src="~assets/img/solution/02_tx1.png"
                                                    >
                                                </div>
                                                <!--<div class="avatar_point" style="border-color: rgba(0,210,255,1)"></div>-->
                                            </div>
                                            <div class="person_talk">
                                                原来没有海外仓库时我们的商品发往海外时效长，清关费用多，退换货麻烦...
                                                使用了智全程的“海外仓”服务后，商品存储于各国海外仓。时效性大幅增强。
                                            </div>
                                        </div>
                                        <div class="person_name">山东嘉顺家具厂张总</div>
                                        <span class="bot"></span>
                                        <span class="top"></span>
                                    </div>
                                    <div
                                        class="content-block-message_block"
                                        style="left: 265px;top: 195px;z-index: 2"
                                    >
                                        <div class="message_content">
                                            <div class="avatar">
                                                <div class="avatar_img">
                                                    <img
                                                        width="51px"
                                                        src="~assets/img/solution/02_tx2.png"
                                                    >
                                                </div>
                                                <!--<div class="avatar_point"></div>-->
                                            </div>
                                            <div
                                                class="person_talk"
                                                style="color:rgba(99,96,142,1);"
                                            >
                                                智全程的“海外仓”，很大程度上降低了我们的物流成本，进口关税在头程端就处理好，
                                                所以终端客户不会在遇到被要求先付关税、后拿货的情况。
                                            </div>
                                        </div>
                                        <div class="person_name">汇联商贸有限公司</div>
                                        <span class="bot"></span>
                                        <span class="top"></span>
                                    </div>
                                    <div
                                        class="content-block-message_block"
                                        style="left: 630px;top: 117px"
                                    >
                                        <div
                                            class="message_content"
                                            style="background:rgba(60,72,86,1);"
                                        >
                                            <div class="avatar">
                                                <div class="avatar_img">
                                                    <img
                                                        width="51px"
                                                        src="~assets/img/solution/02_tx3.png"
                                                    >
                                                </div>
                                                <!--<div class="avatar_point" style="border-color: rgba(60,72,86,1)"></div>-->
                                            </div>
                                            <div class="person_talk">
                                                智全程的“海外仓”业务减轻了我们的退货压力，终端买家不需要的商品可以退回海外仓，
                                                重新从海外仓发出一个客户需要的商品，完全没有物流和清关的压力。
                                            </div>
                                        </div>
                                        <div class="person_name">米兰进出口有限公司</div>
                                        <span class="bot"></span>
                                        <span class="top"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content-block">
                            <div class="content-block-info">
                                <div class="content-block-info_left">
                                    <div class="item">
                                        <div class="item-title">
                                            <span style="width: 60px">
                                                <img
                                                    src="~assets/img/solution/02_icon1.png"
                                                    width="40px"
                                                >
                                            </span>
                                            <span>解决制造业在</span>
                                            <span style="color: red">生产/运输/仓储环节</span>
                                            <span>问题</span>
                                        </div>
                                        <div class="item-detail">
                                            <div class="item-font">通过PC端以及线下硬件设备实现厂内运营、物流运输、终端交付
                                                <br>等三大环节的数据监控及操作，实现透明化的生产/供应/销售
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item-title" style="height: 90px">
                                            <span style="width: 60px">
                                                <img
                                                    src="~assets/img/solution/02_icon2.png"
                                                    width="40px"
                                                >
                                            </span>
                                            <span style="margin-top: 30px">
                                                具有
                                                <font style="color: red">超低入侵、超快实施、安全可靠、
                                                    <br>
                                                    <br>支持多系统对接
                                                </font>
                                                等特点
                                            </span>
                                        </div>
                                        <div class="item-detail">
                                            <div class="item-font">有依据判断订单交货周期，实时看到订单最终交付情况，
                                                <br>帮助客户准确掌握在产产品、在途产品与在库库存等情况
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-block-info_right">
                                    <img
                                        src="~assets/img/solution/03_gc.png"
                                        width="606px"
                                        style="margin-left: -100px;"
                                    >
                                </div>
                            </div>
                            <div class="content-block-message">
                                <div class="content-block-message_title">
                                    <span style="width: 60px">
                                        <img src="~assets/img/solution/02_icon3.png" width="40px">
                                    </span>
                                    <span>用户评价</span>
                                </div>
                                <div style="margin-top: 20px;position: relative">
                                    <div class="content-block-message_block" style="top: 100px">
                                        <div
                                            class="message_content"
                                            style="background:rgba(0,210,255,1);"
                                        >
                                            <div class="avatar">
                                                <div class="avatar_img">
                                                    <img
                                                        width="51px"
                                                        src="~assets/img/solution/04_tx4.png"
                                                    >
                                                </div>
                                                <!--<div class="avatar_point" style="border-color: rgba(0,210,255,1)"></div>-->
                                            </div>
                                            <div class="person_talk">
                                                作为一家制造商，我们一直没有专业的物流团队，与智全程合作后，只需在平台上提交需求，
                                                智全程就会给我们一套完整的运输方案。
                                            </div>
                                        </div>
                                        <div class="person_name">杭州春风摩托车配件黄总</div>
                                        <span class="bot"></span>
                                        <span class="top"></span>
                                    </div>
                                    <div
                                        class="content-block-message_block"
                                        style="left: 360px;top: 198px;z-index: 2"
                                    >
                                        <div class="message_content">
                                            <div class="avatar">
                                                <div class="avatar_img">
                                                    <img
                                                        width="51px"
                                                        src="~assets/img/solution/04_tx5.png"
                                                    >
                                                </div>
                                                <!--<div class="avatar_point"></div>-->
                                            </div>
                                            <div
                                                class="person_talk"
                                                style="color:rgba(99,96,142,1);"
                                            >
                                                我们的物流事宜，智全程的客服都会帮我们完成，让专业的人做专业的事，
                                                这样，我们可以把精力放在制造更好的产品上。
                                            </div>
                                        </div>
                                        <div class="person_name">湖北鄂丰模具厂</div>
                                        <span class="bot"></span>
                                        <span class="top"></span>
                                    </div>
                                    <div
                                        class="content-block-message_block"
                                        style="left: 630px;top: -4px"
                                    >
                                        <div
                                            class="message_content"
                                            style="background:rgba(60,72,86,1);"
                                        >
                                            <div class="avatar">
                                                <div class="avatar_img">
                                                    <img
                                                        width="51px"
                                                        src="~assets/img/solution/04_tx6.png"
                                                    >
                                                </div>
                                                <!--<div class="avatar_point" style="border-color: rgba(60,72,86,1)"></div>-->
                                            </div>
                                            <div class="person_talk">
                                                我们的主要人员都集中在技术生产部门、销售部门，并没有专业的物流团队，
                                                是智全程帮我们做好物流事宜，给到我们完成的运输方案。
                                            </div>
                                        </div>
                                        <div class="person_name">江苏澳凡家具有限公司</div>
                                        <span class="bot"></span>
                                        <span class="top"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="content-block">
                            <div class="content-block-info">
                                <div class="content-block-info_left">
                                    <div class="item">
                                        <div class="item-title">
                                            <span style="width: 60px">
                                                <img
                                                    src="~assets/img/solution/02_icon1.png"
                                                    width="40px"
                                                >
                                            </span>
                                            <span>解决物流行业</span>
                                            <span style="color: red">跨境运输问题</span>
                                        </div>
                                        <div class="item-detail">
                                            <div class="item-font">海量供应商运输资源，只需输入起运地和目的地，即可
                                                <br>获取最优报价，解决价格信息不透明，业务操作繁琐重复，
                                                <br>企业内业务数据不同步等问题
                                            </div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item-title">
                                            <span style="width: 60px">
                                                <img
                                                    src="~assets/img/solution/02_icon2.png"
                                                    width="40px"
                                                >
                                            </span>
                                            <span style="color: red">一键订舱</span>
                                            <span>，可视化业务流程节省人员精力</span>
                                        </div>
                                        <div class="item-detail">
                                            <div class="item-font">在线协同的企业SaaS系统，能够记录业务操作状态与信息，
                                                <br>实现多角色权限管理，多订单业务统计
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="content-block-info_right">
                                    <img
                                        src="~assets/img/solution/04_dn.png"
                                        width="669px"
                                        style="margin-left: -130px;"
                                    >
                                </div>
                            </div>
                            <div class="content-block-message">
                                <div class="content-block-message_title">
                                    <span style="width: 60px">
                                        <img src="~assets/img/solution/02_icon3.png" width="40px">
                                    </span>
                                    <span>用户评价</span>
                                </div>
                                <div style="margin-top: 20px;position: relative">
                                    <div class="content-block-message_block" style="top: 100px">
                                        <div
                                            class="message_content"
                                            style="background:rgba(0,210,255,1);"
                                        >
                                            <div class="avatar">
                                                <div class="avatar_img">
                                                    <img
                                                        width="51px"
                                                        src="~assets/img/solution/04_tx7.png"
                                                    >
                                                </div>
                                                <!--<div class="avatar_point" style="border-color: rgba(0,210,255,1)"></div>-->
                                            </div>
                                            <div class="person_talk">
                                                原来的财务人员每天总要留出固定的时间，外出去银行汇款，现在用了线上支付，
                                                只需10分钟即可完成线上支付及收发票，不仅节约了时间，也减轻了财务部门的工作。
                                            </div>
                                        </div>
                                        <div class="person_name">陕西腾辉国际物流赵总</div>
                                        <span class="bot"></span>
                                        <span class="top"></span>
                                    </div>
                                    <div
                                        class="content-block-message_block"
                                        style="left: 360px;top: 198px;z-index: 2"
                                    >
                                        <div class="message_content">
                                            <div class="avatar">
                                                <div class="avatar_img">
                                                    <img
                                                        width="51px"
                                                        src="~assets/img/solution/04_tx8.png"
                                                    >
                                                </div>
                                                <!--<div class="avatar_point"></div>-->
                                            </div>
                                            <div
                                                class="person_talk"
                                                style="color:rgba(99,96,142,1);"
                                            >
                                                智全程的服务与传统国际物流服务有很大的区别，每当货物运输进展到一个节点时，
                                                智全程系统都会发送实时的邮件提醒，从而帮助我们更好的了解、规划物流工作。
                                            </div>
                                        </div>
                                        <div class="person_name">青岛华展的李经理</div>
                                        <span class="bot"></span>
                                        <span class="top"></span>
                                    </div>
                                    <div
                                        class="content-block-message_block"
                                        style="left: 630px;top: -4px"
                                    >
                                        <div
                                            class="message_content"
                                            style="background:rgba(60,72,86,1);"
                                        >
                                            <div class="avatar">
                                                <div class="avatar_img">
                                                    <img
                                                        width="51px"
                                                        src="~assets/img/solution/04_tx9.png"
                                                    >
                                                </div>
                                                <!--<div class="avatar_point" style="border-color: rgba(60,72,86,1)"></div>-->
                                            </div>
                                            <div class="person_talk">
                                                智全程的SAAS系统，很大程度上提高了我们的物流效率，
                                                而且还能够记录每一步操作状态，这样管理起来更加方便。
                                            </div>
                                        </div>
                                        <div class="person_name">西安十方物流信息服务有限公司</div>
                                        <span class="bot"></span>
                                        <span class="top"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="solution-foot">
            <div class="solution-foot-content">
                <el-row type="flex" justify="center">
                    <el-col :span="15">
                        <p class="solution-foot-content_title">入驻平台&nbsp;即刻享有全部服务</p>
                        <div class="solution-foot-content_wish">我们的愿景是帮助物流企业降本、提效、赋能、增信
                            <br>并致力于打造集智慧物流解决方案、大数据分析于一体的第四方物流平台
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <el-button
                            type="primary"
                            class="solution-foot-button solution-foot-button_first"
                            @click="userDialog(1)"
                        >个人注册</el-button>
                        <br>
                        <el-button
                            type="primary"
                            class="solution-foot-button version-two-button"
                            style="margin-top: 24px"
                            @click="pushUrl('/check-info')"
                        >企业认证</el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <Footer :links="links"></Footer>
    </div>
</template>

<script>
import Header from '~/components/Header';
import Footer from '~/components/footer';
import { GetQueryValue } from '~utils/main'
import { getlinks } from "~/api/getlinks";

export default {
    components: {
        Header,
        Footer
    },
    props: {},
    data () {
        return {
            navArr: ['零售业', '制造业', '物流行业'],
            navShow: true,
            active: 0, // 当前激活的导航索引
            links: null
        }
    },
    //服务端渲染首屏幕数据
    async asyncData ({ app }) {
        try {
            let links = await getlinks(app)
            //服务端需要渲染的返回数据
            return { links: links }
        } catch (err) {
            console.log(err)
        }
    },
    mounted () {
        let gotoIndex
        gotoIndex = Number(GetQueryValue('gotoIndex'))
        if (gotoIndex) {
            this.scrollTo(gotoIndex)
        }

        // 监听滚动事件
        window.addEventListener('scroll', this.onScroll, false)
    },
    destroy () {
        // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
        window.removeEventListener('scroll', this.onScroll)
    },
    methods: {
        userDialog (type) {
            this.$bus.$emit('showUserDialog', type)
        },
        pushUrl (url) {
            window.open(process.env.ENV_SITE + url, "_self")
        },
        // 滚动监听器
        onScroll () {
            // 获取所有锚点元素
            const navContents = document.querySelectorAll('.content .content-block')
            // 所有锚点元素的 offsetTop
            const offsetTopArr = []
            navContents.forEach(item => {
                offsetTopArr.push(item.offsetTop)
            })
            // 获取当前文档流的 scrollTop
            const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            // 定义当前点亮的导航下标
            let navIndex = 0
            for (let n = 0; n < offsetTopArr.length; n++) {
                // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
                // 那么此时导航索引就应该是n了
                if (scrollTop >= offsetTopArr[n]) {
                    navIndex = n
                }
            }
            this.active = navIndex

            //滑动到底部，控制导航栏的显示隐藏
            let scrollBottom = this.getScrollHeight() - this.getClientHeight() - scrollTop
            if (scrollBottom < 400) {
                this.navShow = false
            } else {
                this.navShow = true
            }
        },
        // 跳转到指定索引的元素
        scrollTo (index) {

            // 获取目标的 offsetTop
            // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
            const targetOffsetTop = document.querySelector(`.content .content-block:nth-child(${index + 1})`).offsetTop
            // 获取当前 offsetTop
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
            // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
            const STEP = 50
            // 判断是往下滑还是往上滑
            if (scrollTop > targetOffsetTop) {
                // 往上滑
                smoothUp()
            } else {
                // 往下滑
                smoothDown()
            }

            // 定义往下滑函数
            function smoothDown () {
                // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
                if (scrollTop < targetOffsetTop) {
                    // 如果和目标相差距离大于等于 STEP 就跳 STEP
                    // 否则直接跳到目标点，目标是为了防止跳过了。
                    if (targetOffsetTop - scrollTop >= STEP) {
                        scrollTop += STEP
                    } else {
                        scrollTop = targetOffsetTop
                    }
                    document.body.scrollTop = scrollTop
                    document.documentElement.scrollTop = scrollTop
                    // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
                    requestAnimationFrame(smoothDown)
                }
            }

            // 定义往上滑函数
            function smoothUp () {
                if (scrollTop > targetOffsetTop) {
                    if (scrollTop - targetOffsetTop >= STEP) {
                        scrollTop -= STEP
                    } else {
                        scrollTop = targetOffsetTop
                    }
                    document.body.scrollTop = scrollTop
                    document.documentElement.scrollTop = scrollTop
                    requestAnimationFrame(smoothUp)
                }
            }
        },
        getClientHeight () {
            var clientHeight = 0;
            if (document.body.clientHeight && document.documentElement.clientHeight) {
                var clientHeight = (document.body.clientHeight < document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            } else {
                var clientHeight = (document.body.clientHeight > document.documentElement.clientHeight) ? document.body.clientHeight : document.documentElement.clientHeight;
            }
            return clientHeight;
        },
        getScrollHeight () {
            return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
        }
    }
}
</script>

<style lang="scss" scoped>
.solution {
  background: url('~assets/img/solution/01_bg1.jpg') no-repeat top;
  background-color: white;
  min-width: 1200px;
}

/* 导航栏的样式 */
.navs {
  position: fixed;
  top: 400px;

  li {
    height: 60px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgba(154, 152, 177, 1);
    cursor: pointer;
    display: flex;
    align-items: center;

    img {
      margin-right: 10px;
    }
  }

  i {
    margin-right: 10px;
  }
  /* 当导航被点亮后改变颜色 */
  .active {
    color: #3754d3;
  }
}

.header-title {
  text-align: center;
  height: 300px;
  font-family: Source Han Sans CN !important;
  color: rgba(71, 67, 116, 1);

  h1 {
    font-size: 40px;
    letter-spacing: 8px;
    line-height: 134px;
  }

  h6 {
    font-size: 16px;
    line-height: 36px;
    margin-top: -30px;
    margin-bottom: 20px;
  }

  button {
    color: white;
    margin-top: 20px;
    border-radius: 0px;
    width: 160px;
    height: 47px;
  }
}

.version-two-button:checked {
  color: white;
}

.solution-container {
  display: flex;
  justify-content: center;
}

/* 内容区的样式 */
.content {
  width: 1000px;
  padding-left: 200px;
  font-family: Source Han Sans CN;

  .content-block {
    height: 1020px;
  }

  .content-block-info {
    display: flex;
    justify-content: center;

    .content-block-info_left {
      width: 500px;
      z-index: 3;

      .item {
        height: 180px;
        color: #3b426b;

        .item-title {
          height: 60px;
          display: flex;
          align-items: center;

          span {
            font-size: 18px !important;
            font-weight: bold !important;
          }
        }

        .item-detail {
          margin-top: 20px;

          .item-font {
            margin-left: 60px;
            width: 420px;
            font-size: 14px;
            line-height: 30px;
          }
        }
      }
    }

    .content-block-info_right {
      width: 500px;

      img {
        z-index: 2;
      }
    }
  }

  .content-block-message {
    height: 640px;
    width: 100%;

    .content-block-message_title {
      height: 60px;
      display: flex;
      justify-items: center;
      align-items: center;
      color: #3b426b;

      span {
        font-size: 18px !important;
        font-weight: bold !important;
      }
    }

    .content-block-message_block {
      width: 379px;
      box-shadow: 0px 6px 11px 0px rgba(11, 10, 65, 0.19);
      background-color: white !important;
      border-radius: 10px;
      position: absolute;
      z-index: 1;

      .message_content {
        height: 138px;
        padding: 10px 15px 0px;
        border-radius: 10px 10px 0px 0px;
        font-size: 14px;
        font-family: SimSun;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
        display: inline-flex;

        .avatar {
          width: 51px;

          .avatar_img {
            width: 51px;
            height: 51px;
            margin-top: 35px;
            border-radius: 25px;
            position: relative;
          }

          .avatar_point {
            width: 11px;
            height: 11px;
            border: 5px solid;
            background: rgba(78, 255, 78, 1);
            border-radius: 50%;
            position: relative;
            margin-left: 29px;
            margin-top: -22px;
            z-index: 9;
          }
        }

        .person_talk {
          line-height: 32px;
          margin-left: 15px;
        }
      }

      .person_name {
        height: 45px;
        padding: 0px 15px;
        border-radius: 0px 0px 10px 10px;
        line-height: 36px;
        font-size: 16px;
        font-family: Source Han Sans CN;
        font-weight: 700;
        color: rgba(99, 96, 142, 1);
        letter-spacing: 1px;
      }

      span {
        width: 0;
        height: 0;
        font-size: 0;
        overflow: hidden;
        position: absolute;
      }

      .bot {
        border-width: 25px 20px;
        border-style: solid;
        border-color: rgba(11, 10, 65, 0.04) transparent transparent
          rgba(11, 10, 65, 0.04);
        box-shadow: -6px 0px 11px -6px rgba(11, 10, 65, 0.19);
        left: 0px;
        bottom: -49px;
      }

      .top {
        border-width: 25px 20px;
        border-style: solid;
        border-color: #ffffff transparent transparent #ffffff;
        left: 0px;
        bottom: -42px;
      }
    }
  }
}

.solution-foot {
  width: 100%;
  height: 230px;
  background: rgba(37, 45, 69, 1);
  display: flex;
  justify-content: center;

  .solution-foot-content {
    width: 1200px;
    height: 140px;
    padding: 45px 0px 39px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.15);
    font-family: Source Han Sans CN;
    font-weight: 400;
  }

  .solution-foot-content_title {
    font-size: 36px;
    color: rgba(21, 183, 185, 1);
    line-height: 36px;
  }

  .solution-foot-content_wish {
    margin-top: 42px;
    line-height: 30px;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
  }

  .solution-foot-button {
    width: 248px;
    height: 60px;
    border: 2px solid rgba(21, 183, 185, 1);
    border-radius: 4px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    letter-spacing: 2px;
  }

  .solution-foot-button_first {
    color: rgba(21, 183, 185, 1);
    border: 2px solid rgba(21, 183, 185, 1);
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0);
  }

  .solution-foot-button_first:hover {
    color: rgba(21, 183, 185, 0.8) !important;
    border-color: rgba(21, 183, 185, 0.8) !important;
  }
}
</style>