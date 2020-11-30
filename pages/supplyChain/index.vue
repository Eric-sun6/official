<template>
    <div>
        <Header></Header>
        <div class="financing-header_img">
            <div>
                <img src="~assets/img/supplyChain/01_rzbanner-.png" width="707px" height="263px">
            </div>
        </div>
        <div class="financing-recommend">
            <div class="financing-recommend_title">
                <div class="title_content">智全程融资方案推荐</div>
                <canvas id="recommend_title" width="632px" height="100px"></canvas>
            </div>
            <div class="financing-recommend_options">
                <div class="recommend_option">
                    <img src="~assets/img/supplyChain/04_tu1.png">
                    <h1>知名金融机构</h1>
                    <i class="el-icon-caret-bottom"></i>
                    <p>银行机构实名认证
                        <br>资金信息真实可靠
                    </p>
                </div>
                <div class="recommend_option" style="left: 455px">
                    <img src="~assets/img/supplyChain/04_tu2.png">
                    <h1>融资高效</h1>
                    <i class="el-icon-caret-bottom"></i>
                    <p>流程简单、迅速
                        <br>让天下没有难融的资金
                    </p>
                </div>
                <div class="recommend_option" style="left: 910px">
                    <img src="~assets/img/supplyChain/04_tu3.png">
                    <h1>专业服务</h1>
                    <i class="el-icon-caret-bottom"></i>
                    <p>专业投融资服务经理
                        <br>全方位、全流程专业咨询与指导
                    </p>
                </div>
                <canvas
                    id="recommend"
                    class="financing-recommend_canvas"
                    width="1200px"
                    height="670px"
                ></canvas>
            </div>
        </div>
        <div class="financing-options">
            <div class="financing-options_content">
                <div class="options_content-title">您的难处
                    <br>都有
                    <span>方案</span>
                </div>
                <span style="left: 93px;top: 107px;">账期太长</span>
                <img src="~assets/img/supplyChain/08_tb10.png" style="left: 263px;top: 178px;">
                <span style="left: 946px;top: 78px;">业务周转</span>
                <img src="~assets/img/supplyChain/08_tb12.png" style="left: 830px;top: 140px;">
                <span style="left: 190px;top: 324px;">企业经营</span>
                <img src="~assets/img/supplyChain/08_tb11.png" style="left: 370px;top: 400px;">
                <span style="left: 915px;top: 280px;">信用度低</span>
                <img src="~assets/img/supplyChain/08_tb13.png" style="left: 835px;top: 345px;">
                <div class="options_content-font">智全程作为一家供应链解决方案提供商
                    <br>致力于给融资难的中小企业提供一站式靠谱可行的融资服务解决方案
                </div>
                <canvas id="canvas" class="financing-options_canvas" width="1200px" height="710px"></canvas>
            </div>
        </div>
        <div class="intelligenceWrap">
            <div class="intelligenceTop">
                <div class="intelligenceDot"></div>
                <div class="intelligenceLine"></div>
                <div class="intelligenceText">融资助力企业资质要求</div>
                <div class="intelligenceLine lineRight"></div>
                <div class="intelligenceDot dotRight"></div>
            </div>
            <div class="intelligenceTitle">
                <div class="title1">企业资质</div>
                <div class="intelligenceTitleLine"></div>
                <div class="title2">企业在中国境内注册并具有独立法人资格</div>
                <div class="title1">经营年限</div>
                <div class="intelligenceTitleLine"></div>
                <div class="title2">公司实际经营在1年以上</div>
                <div class="title1">企业信誉</div>
                <div class="intelligenceTitleLine"></div>
                <div class="title2">公司具有依法纳税和缴纳社会保障资金的良好记录</div>
            </div>
            <div class="intelligenceImage">
                <img src="~assets/img/woshou.png" alt="">
            </div>
        </div>
        <div class="financing-options_after">
            <span>便捷操作&nbsp;&nbsp;&nbsp;轻松解决</span>
            <img src="~assets/img/supplyChain/06_sj.png">
        </div>
        <div class="financing-step">
            <div class="financing-step_item">
                <img src="~assets/img/supplyChain/07_h1.png">
                <br>
                <div>注册平台</div>
            </div>
            <arrow id="arrowOne"></arrow>
            <div class="financing-step_item">
                <img src="~assets/img/supplyChain/07_h2.png">
                <br>
                <div>联系我们</div>
            </div>
            <arrow id="arrowTwo"></arrow>
            <div class="financing-step_item">
                <img src="~assets/img/supplyChain/07_h3.png">
                <br>
                <div>企业基本信息</div>
            </div>
            <arrow id="arrowThree"></arrow>
            <div class="financing-step_item">
                <img src="~assets/img/supplyChain/07_h4.png">
                <br>
                <div>融资方案设计</div>
            </div>
            <arrow id="arrowFour"></arrow>
            <div class="financing-step_item">
                <img src="~assets/img/supplyChain/07_h5.png">
                <br>
                <div>融资成功</div>
            </div>
        </div>
        <div class="financing-link_button">
            <button @click="officialUrl('/aboutUs')">如有需求，请点击咨询</button>
        </div>
        <div class="supply-chain-foot">
            <div class="supply-chain-foot-content">
                <el-row type="flex" justify="center">
                    <el-col :span="15">
                        <p class="supply-chain-foot-content_title">入驻平台&nbsp;即刻享有全部服务</p>
                        <div class="supply-chain-foot-content_wish">我们的愿景是帮助物流企业降本、提效、赋能、增信
                            <br>并致力于打造集智慧物流解决方案、大数据分析于一体的第四方物流平台
                        </div>
                    </el-col>
                    <el-col :span="5">
                        <el-button
                            type="primary"
                            class="supply-chain-foot-button supply-chain-foot-button_first"
                            @click="userDialog(1)"
                        >个人注册</el-button>
                        <br>
                        <el-button
                            type="primary"
                            class="supply-chain-foot-button version-two-button"
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
import Arrow from '~/components/supply-chain/arrow';

import { getlinks } from "~/api/getlinks";

export default {
    components: {
        Header,
        Footer,
        Arrow
    },
    props: {},
    data () {
        return {
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
        this.financingOptions();
        this.recommendTitle();
        this.recommend();
    },
    methods: {
        userDialog (type) {
            this.$bus.$emit('showUserDialog', type)
        },
        financingOptions () {
            let canvas = document.getElementById('canvas');
            if (canvas.getContext) {
                let ctx = canvas.getContext('2d');
                ctx.fillStyle = "#15B7B9";

                ctx.beginPath();
                //原点 圆心坐标 半径 弧度
                ctx.arc(274, 190, 4, 0, Math.PI * 2, true); // 绘制
                ctx.fill();

                ctx.strokeStyle = "#15B7B9"
                ctx.lineWidth = 3
                //线条起点坐标 +3.5 -1.5
                ctx.moveTo(270.5, 188.5);
                //线条拐点坐标 +20 -20
                ctx.lineTo(240.5, 168.5);
                //线条终点坐标 + 160
                ctx.lineTo(90.5, 168.5);
                ctx.stroke();


                ctx.beginPath();
                //原点 圆心坐标 半径 弧度
                ctx.arc(921, 163, 4, 0, Math.PI * 2, true); // 绘制
                ctx.fill();

                ctx.strokeStyle = "#15B7B9"
                ctx.lineWidth = 3
                ///线条起点坐标 +3.5 -1.5
                ctx.moveTo(921.5, 162.5);
                //线条拐点坐标 +20 -20
                ctx.lineTo(944.5, 142.5);
                //线条终点坐标 + 160
                ctx.lineTo(1104.5, 142.5);
                ctx.stroke();


                ctx.beginPath();
                //原点 圆心坐标 半径 弧度
                ctx.arc(376, 405, 4, 0, Math.PI * 2, true); // 绘制
                ctx.fill();

                ctx.strokeStyle = "#15B7B9"
                ctx.lineWidth = 3
                ///线条起点坐标 -3.5 -1.5
                ctx.moveTo(372.5, 403.5);
                //线条拐点坐标 -20 -20
                ctx.lineTo(342.5, 383.5);
                //线条终点坐标 - 160
                ctx.lineTo(192.5, 383.5);
                ctx.stroke();


                ctx.beginPath();
                //原点 圆心坐标 半径 弧度
                ctx.arc(890, 361, 4, 0, Math.PI * 2, true); // 绘制
                ctx.fill();

                ctx.strokeStyle = "#15B7B9"
                ctx.lineWidth = 3
                ///线条起点坐标 +3.5 -1.5
                ctx.moveTo(893.5, 359.5);
                //线条拐点坐标 +20 -20
                ctx.lineTo(913.5, 339.5);
                //线条终点坐标 + 160
                ctx.lineTo(1073.5, 339.5);
                ctx.stroke();
            }
        },
        recommendTitle () {
            let canvas = document.getElementById('recommend_title');
            if (canvas.getContext) {
                let ctx = canvas.getContext('2d');
                ctx.strokeStyle = "#474374"

                ctx.beginPath();
                ctx.lineWidth = 2
                //原点 圆心坐标 半径 弧度
                ctx.arc(8.5, 90.5, 7, 0, Math.PI * 2, true); // 绘制
                ctx.stroke();

                ctx.lineWidth = 1
                ctx.lineTo(99.5, 90.5);
                ctx.stroke();

                ctx.beginPath();
                ctx.lineWidth = 2
                //原点 圆心坐标 半径 弧度
                ctx.arc(623.5, 90.5, 7, Math.PI * 2, 0, true); // 绘制
                ctx.stroke();

                ctx.lineWidth = 1
                ctx.moveTo(532.5, 90.5);
                ctx.lineTo(617.5, 90.5);
                ctx.stroke();
            }
        },
        recommend () {
            let canvas = document.getElementById('recommend');
            if (canvas.getContext) {
                let ctx = canvas.getContext('2d');
                ctx.fillStyle = "#15B7B9";

                ctx.beginPath();
                ctx.moveTo(290, 200);
                ctx.lineTo(145, 160);
                ctx.lineTo(0, 200);
                ctx.lineTo(0, 587);
                ctx.lineTo(145, 627);
                ctx.lineTo(290, 587);
                ctx.fill();

                ctx.fillStyle = "#3752D2";
                ctx.beginPath();
                ctx.moveTo(745, 200);
                ctx.lineTo(600, 160);
                ctx.lineTo(455, 200);
                ctx.lineTo(455, 587);
                ctx.lineTo(600, 627);
                ctx.lineTo(745, 587);
                ctx.fill();

                ctx.fillStyle = "#15B7B9";
                ctx.beginPath();
                ctx.moveTo(1200, 200);
                ctx.lineTo(1055, 160);
                ctx.lineTo(910, 200);
                ctx.lineTo(910, 587);
                ctx.lineTo(1055, 627);
                ctx.lineTo(1200, 587);
                ctx.fill();
            }
        },
        pushUrl (url) {
            window.open(process.env.ENV_SITE + url, "_self")
        },
        officialUrl (url) {
            this.$router.push(url)
        }
    }
}
</script>

<style lang="scss" scoped>
.intelligenceWrap{
    width: 100%;
    min-width: 1200px;
    height: 648px;
    background: #F6FBFF;
    margin: 0 auto; 
    box-shadow: 0px 0px 70px 0px rgba(3, 15, 70, 0.11);
    overflow: hidden;
    position: relative;
}
.intelligenceTop{
   margin: 55px 0 0 33%;
   position: relative;
}
.intelligenceTop>.intelligenceDot{
    position: absolute;
    top: 12px;
    left: 0;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    border:2px solid #474374;
}
.intelligenceTop >.intelligenceLine{
    position: absolute;
    top: 19px;
    left: 15px;
    width: 97px;
    height: 13px;
    border-top: 2px solid #030F46;
}
.intelligenceTop >.intelligenceText{
    position: absolute;
    top: 0;
    left: 115px;
    height: 39px;
    font-size: 40px;
    font-family: Source Han Sans SC;
    font-weight: bold;
    color: #474374;
    line-height: 30px;
}
.intelligenceTop > .dotRight{
    left: 617px;
}
.intelligenceTop > .lineRight{
    left: 520px;
}
.intelligenceTitle{
    margin: 107px 0 0 462px;
    overflow: hidden;
}
.intelligenceTitle > .title1{
    margin-top: 52px;
    font-size: 30px;
    font-family: Source Han Sans SC;
    font-weight: 500;
    color: #333333;
}
.intelligenceTitle > .intelligenceTitleLine{
    width: 66px;
    height: 5px;
    margin-top: 15px;
    background: #F53341;
    border-radius: 3px;
}
.intelligenceTitle > .title2{
    margin-top: 28px;
    font-size: 18px;
    font-family: Source Han Sans SC;
    font-weight: 400;
    color: #333333;
}
.intelligenceImage{
    width: 945px;
    height: 630px;
    position: absolute;
    top: 84px;
    left: 743px;
}
.intelligenceImage>img{
  margin: auto;
  position: absolute;
  top: 0;
  left: 0;
  bottom:0;
  right:0;
}



.financing-header_img {
  width: 100%;
  min-width: 1200px;
  height: 451px;
  background: url('~assets/img/supplyChain/01_bannerj.jpg') no-repeat center;
  display: flex;
  justify-content: center;

  div {
    width: 1200px;
    height: auto;
    text-align: center;

    img {
      margin-top: 28px;
    }
  }
}

.financing-recommend {
  width: 100%;
  min-width: 1200px;
  height: 770px;

  .financing-recommend_title {
    width: 632px;
    height: 100px;
    display: flex;
    margin: 0 auto;
    justify-items: center;
    position: relative;

    .title_content {
      position: absolute;
      font-size: 40px;
      font-family: Source Han Sans SC;
      font-weight: bold;
      color: rgba(71, 67, 116, 1);
      left: 120px;
      top: 64px;
      letter-spacing: 4px;
    }
  }

  .financing-recommend_options {
    width: 1200px;
    height: 670px;
    margin: 0 auto;
    position: relative;

    .recommend_option {
      margin-top: 65px;
      position: absolute;
      z-index: 2;
      width: 290px;
      text-align: center;
      color: rgba(255, 255, 255, 1);

      h1 {
        margin-top: 52px;
        font-size: 30px;
        font-weight: bold;
        letter-spacing: 2px;
        font-family: Source Han Sans SC !important;
      }

      i {
        font-size: 16px;
        margin-top: 32px;
        color: #c5fbfc;
        transform: scale(1, 1.5);
      }

      .el-icon-caret-bottom:before {
        font-size: 25px !important;
      }

      p {
        margin-top: 31px;
        font-size: 18px;
        line-height: 36px;
        letter-spacing: 2px;
        font-family: Source Han Sans SC !important;
      }
    }

    .financing-recommend_canvas {
      position: absolute;
    }
  }
}

.financing-options {
  width: 100%;
  min-width: 1200px;
  background: url('~assets/img/supplyChain/02_bj1.jpg') no-repeat center;

  .financing-options_content {
    width: 1200px;
    height: 710px;
    position: relative;
    margin: 0 auto;
    font-family: Source Han Sans CN;

    .options_content-title {
      width: 200px;
      height: 100px;
      position: absolute;
      display: unset;
      left: 522px;
      top: 220px;
      font-size: 40px !important;
      font-weight: bold;
      color: rgba(28, 61, 145, 1);
      line-height: 60px;
      letter-spacing: 4px;

      span {
        font-weight: bold;
        color: #45ba1c;
      }
    }

    .options_content-font {
      width: 1200px;
      position: absolute;
      bottom: 40px;
      font-size: 16px;
      color: rgba(151, 234, 255, 1);
      line-height: 36px;
      text-align: center;
      letter-spacing: 4px;
    }

    .financing-options_canvas {
      height: 710px;
      background: url('~assets/img/supplyChain/05_dp.png') no-repeat center;
    }

    img {
      position: absolute;
    }

    > span {
      position: absolute;
      font-size: 36px;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      letter-spacing: 3px;
    }
  }
}

.financing-options_after {
  text-align: center;
  position: relative;

  span {
    position: absolute;
    width: 398px;
    top: 45px;
    font-size: 30px;
    font-family: Source Han Sans CN;
    font-weight: bold;
    color: rgba(24, 58, 134, 1);
    text-align: center;
    letter-spacing: 4px;
  }
}

.financing-step {
  width: 100%;
  min-width: 1200px;
  height: 320px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;

  .financing-step_item {
    height: 160px;
    width: 130px;
    padding-top: 70px;

    img {
      width: 88px;
      height: 88px;
    }

    div {
      font-size: 18px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: rgba(93, 97, 116, 1);
      margin-top: 28px;
      letter-spacing: 2px;
    }
  }
}

.financing-link_button {
  width: 100%;
  min-width: 1200px;
  height: 200px;
  display: flex;
  justify-content: center;

  button {
    margin-top: 36px;
    width: 464px;
    height: 86px;
    background: linear-gradient(
      -83deg,
      rgba(69, 126, 235, 1) 1%,
      rgba(15, 155, 253, 1) 100%
    );
    border-radius: 20px;
    letter-spacing: 2px;
    font-size: 30px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }

  button:hover {
    cursor: pointer;
  }

  button:active {
    background: linear-gradient(
      -83deg,
      rgba(69, 126, 235, 0.9) 1%,
      rgba(15, 155, 253, 0.9) 100%
    ) !important;
  }

  button:focus {
    outline: none;
  }
}

.supply-chain-foot {
  width: 100%;
  height: 230px;
  background: rgba(37, 45, 69, 1);
  display: flex;
  justify-content: center;

  .supply-chain-foot-content {
    width: 1200px;
    height: 140px;
    padding: 45px 0px 39px;
    border-bottom: 2px solid rgba(255, 255, 255, 0.15);
    font-family: Source Han Sans CN;
    font-weight: 400;
  }

  .supply-chain-foot-content_title {
    font-size: 36px;
    color: rgba(21, 183, 185, 1);
    line-height: 36px;
  }

  .supply-chain-foot-content_wish {
    margin-top: 42px;
    line-height: 30px;
    font-size: 16px;
    color: rgba(255, 255, 255, 1);
  }

  .supply-chain-foot-button {
    width: 248px;
    height: 60px;
    border: 2px solid rgba(21, 183, 185, 1);
    border-radius: 4px;
    font-size: 18px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    letter-spacing: 2px;
  }

  .supply-chain-foot-button_first {
    color: rgba(21, 183, 185, 1);
    border: 2px solid rgba(21, 183, 185, 1);
    border-radius: 4px;
    background-color: rgba(255, 255, 255, 0);
  }

  .supply-chain-foot-button_first:hover {
    color: rgba(21, 183, 185, 0.8) !important;
    border-color: rgba(21, 183, 185, 0.8) !important;
  }
}
</style>