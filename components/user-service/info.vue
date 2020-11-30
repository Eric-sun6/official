<template>
    <div class="v-im-info">
        <div class="v-im-info-tab">
             <p>用户信息</p>
        </div>
        <div class="v-im-info-item">
            <div class="v-info-title">
                <span class="imicon icon-yonghu"></span>用户信息
            </div>
            <div class="v-info-list">
                <p>
                    <span class="text-label">姓名</span>
                    <span class="text-value">Guest</span>
                </p>
                <p>
                    <span class="text-label">手机</span>
                    <span class="text-value">123456789</span>
                </p>
                <p>
                    <span class="text-label">邮箱</span>
                    <span class="text-value">1111@qq.com</span>
                </p>
            </div>
        </div>
        <div  class="v-im-info-item">
            <div class="v-info-title">
                <span class="imicon icon-xinxi"></span>访问信息
            </div>
            <div class="v-info-list">
                <p>
                    <span class="text-label">来源渠道</span>
                    <span class="text-value">直接访问</span>
                </p>
                <p>
                    <span class="text-label">IP地址</span>
                    <span class="text-value">天津 天津</span>
                </p>
                <p>
                    <span class="text-label">来源终端</span>
                    <span class="text-value">Mac OS 10.14.3-Safarl</span>
                </p>
                <p>
                    <span class="text-label">会话页面</span>
                    <span class="text-value"><a href="javascript:;" class="link">未知页面名称</a></span>
                </p>
                <p>
                    <span class="text-label">行为轨迹<span class="icon el-icon-warning"></span></span>
                    <span class="text-value">展开详情<span class="icon el-icon-caret-bottom"></span></span>
                </p>
            </div>
        </div>
    </div>


</template>

<script>
    export default {
        methods: {

        }
    }

</script>

<style scoped>
.v-im-info{
    flex: 0 0 260px;
    width: 260px;
    box-sizing: border-box;
}
.v-im-info .v-im-info-tab{
    padding:0 10px;
    height: 35px;
    font-size: 14px;
    line-height:35px;
    color:#69abe4;
    border-bottom: 1px #e5e5e5  solid;
}
.v-im-info .v-im-info-item{
    padding:5px 10px;
}
.v-im-info .v-info-title{
    font-size: 14px;
    line-height: 30px;
    color:#808080;
}
.v-im-info .v-info-title .imicon{
    margin-right: 5px;
    font-size: 13px;
    color:#959698;
}
.v-im-info .v-info-list p{
    font-size:12px;
    color:#8c8c8c;
    min-height: 30px;
    display: flex;
    align-items: center;
}
.v-im-info .v-info-list p .text-label{
    flex: 0 0 70px;
}
.v-im-info .v-info-list p .icon{
    margin-left:2px;
    font-size: 12px;
    color:#8c8c8c;
}
.v-im-info .v-info-list p .link{
    color:#69a7e3;
}
</style>
