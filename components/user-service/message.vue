<template>
    <div class="v-im-message">
        <div class="v-im-message-content" v-scroll-bottom="list">
            <ul>
                <li v-for="(item,index) in list" :key="index" :class="{ self: item.self }">
                    <div class="v-msg-main">
                        <img class="avatar" width="30" height="30" src="./images/2.png">
                        <p class="v-message" v-html="formatterMsg(item.content)"></p>
                    </div>
                    <div class="v-msg-time">{{ item.date | time }}</div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
            }
        },
        filters: {
            time(date) {
                if (!date) return;
                date = new Date(date);
                let h = date.getHours();
                h = h < 10 ? '0' + h : h;
                let m = date.getMinutes();
                m = m < 10 ? '0' + m : m;
                return h + ':' + m;
            }
        },
        props: {
            list: Array
        },
        directives: {
            'scroll-bottom': {
                componentUpdated(el) {
                    el.scrollTop = el.scrollHeight - el.clientHeight;
                }
            }
        }
    }
</script>

<style scoped>
    .v-im-message {
        padding: 10px;
        flex: 1;
        height: 360px;
    }

    .v-im-message .v-msg-main {
        display: flex;
    }

    .v-im-message .v-im-message-content {
        height: 100%;
        overflow-y: auto;
    }

    .v-im-message .v-message {
        display: inline-block;
        position: relative;
        padding: 0 10px;
        max-width: calc(100% - 40px);
        min-height: 30px;
        line-height: 2.5;
        font-size: 12px;
        text-align: left;
        word-break: break-all;
        background-color: #ddedfa;
        border-radius: 4px;
        color: #333;
    }
    .v-im-message li{
        padding: 5px 0;
    }
    .v-im-message .v-msg-time {
        margin: 5px 0;
        font-size: 10px;
        color: #ccc;
        text-align: left;
        transform: scale(0.9);
    }

    .v-im-message .self .v-msg-main {
        flex-direction: row-reverse;
    }

    .v-im-message .self .v-msg-main .v-message {
        background: #ebebeb
    }

    .v-im-message .self .v-msg-time {
        text-align: right;
    }
</style>
