<template>
    <div class="v-im-history">
        <div class="v-im-history-tab">
            <p>历史记录</p>
        </div>
        <div class="v-im-scroll">
            <ul>
                <template v-for="msg in history">
                    <li>
                        <p :class="{'is-self':msg.self}">
                            <span class="name">{{msg.name}}</span>
                            <span class="time">{{msg.time}}</span>
                        </p>
                        <p>
                            <span class="content" v-html="formatterMsg(msg.content)"></span>
                        </p>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            history: Array
        }
    }
</script>

<style scoped>
    .v-im-history{
        position: absolute;
        right:-260px;
        top:0;
        width: 260px;
        height:600px;
        background:#fff;
        box-sizing: border-box;
    }

    .v-im-history ul li{
        font-size: 14px;
        color:#333;
        line-height: 1.5;
    }
    .v-im-history ul li .name,
    .v-im-history ul li .time{
        color:blue;
        font-size: 12px;
    }
    .v-im-history ul li .is-self .name,
    .v-im-history ul li .is-self .time{
        color:green;
    }
    .v-im-history .v-im-history-tab{
        padding:0 10px;
        height: 35px;
        font-size: 14px;
        line-height:35px;
        color:#69abe4;
        border-bottom: 1px #e5e5e5  solid;
    }
    .v-im-history  .v-im-scroll {
        padding:0 10px;
        height:564px;
        overflow: hidden;
        overflow-y: auto;
    }
</style>
