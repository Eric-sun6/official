<template>
    <div class="v-im-list">
        <div class="v-user-collapse">
            <div class="v-collapse-title none" @click="handleOnLineVisible">
                <p>
                    <span class="el-icon-caret-bottom" v-if="onLineVisible"></span>
                    <span class="el-icon-caret-right" v-else></span>
                    会话中({{onLinePersonLen}})
                </p>
            </div>
            <ul class="v-collapse-persons" v-show="onLineVisible">
                <template v-for="(item,key) in persons">
                    <li class="v-person-item" @click="handleClick(item)" v-if="item.online" :class="{active: key === currentPerson}">
                        <p class="name">{{item.name}}</p>
                        <p class="msg" v-if="item.message.length">
                            <span class="txt">{{item.message[item.message.length-1].content}}</span>
                            <span class="time">{{item.message[item.message.length-1].date | time}}</span>
                        </p>
                    </li>
                </template>
            </ul>
        </div>
        <div class="v-user-collapse">
            <div class="v-collapse-title" @click="handleOfflineLineVisible">
                <p>
                    <span class="el-icon-caret-bottom" v-if="offlineLineVisible"></span>
                    <span class="el-icon-caret-right" v-else></span>
                    已离线({{offlineLineLen}})</p>
            </div>
            <ul class="v-collapse-persons" v-show="offlineLineVisible">
                <template v-for="(item,key) in persons" >
                    <li class="v-person-item" @click="handleClick(item)" v-if="!item.online" :class="{active: key === currentPerson}">
                        <p class="name">{{item.name}}</p>
                        <p class="msg" v-if="item.message.length">
                            <span class="txt">{{item.message[item.message.length-1].content}}</span>
                            <span class="time">{{item.message[item.message.length-1].date | time}}</span>
                        </p>
                    </li>
                </template>
            </ul>
        </div>
    </div>
</template>

<script>
    // import {getNoteTakerList} from 'api/im/im'
    export default {
        data () {
          return {
              personList: [],
              onLineVisible: true,
              offlineLineVisible: true,
              onLinePersonLen: 0,
              offlineLineLen: 0
          }
        },
        props: {
            persons: Object,
            currentPerson: String
        },
        watch: {
            persons(items){
                this.onLinePersonLen = 0;
                this.offlineLineLen = 0;
                for(let i in items){
                    if(items[i].online){
                        this.onLinePersonLen++;
                    }else{
                        this.offlineLineLen++;
                    }
                }
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
        created(){
            // this.getNoteTakerList()
        },
        methods: {
            handleClick(item){
              this.$emit('changePerson',item.name)
            },
           // async getNoteTakerList () {
           //      let res = await getNoteTakerList();
           //     this.personList=res
           //     console.log(this.personList)
           //  },
            handleOnLineVisible () {
                this.onLineVisible = !this.onLineVisible;
            },
            handleOfflineLineVisible(){
                this.offlineLineVisible = !this.offlineLineVisible;
            }
        }
    }
</script>

<style scoped>
    .v-im-list {
        padding-left: 5px;
        flex: 0 0 260px;
        width: 260px;
        height: 100%;
        overflow-y: auto;
        background: #f9f9f9;
    }
    .v-im-list .v-user-collapse{
        margin-top: -1px ;
    }
    .v-im-list .v-collapse-title {
        height: 36px;
        line-height: 36px;
        font-size: 12px;
        background: #fff;
        border-top: 1px #dadada solid;
        border-bottom: 1px #dadada solid;
        user-select: none;
    }

    .v-im-list .v-collapse-title.none {
        border-top: none
    }

    .v-im-list .v-collapse-title p {
        display: inline-block;
        cursor: pointer;
        color:#000;
    }

    .v-im-list .v-collapse-persons {
    }

    .v-im-list .v-person-item {
        padding: 0 10px 0 12px;
        display: flex;
        flex-direction: column;
        min-height: 42px;
        cursor: pointer;
        border-bottom: 1px #e8e8e8 solid;
    }

    .v-im-list .v-person-item.active {
        background: #e1eefe;
    }

    .v-im-list .v-person-item .name {
        color:#333;
        font-size: 12px;
        line-height: 24px;
    }

    .v-im-list .v-person-item.active .name {
        font-weight: 600;
    }

    .v-im-list .v-person-item .msg {
        display: flex;
        justify-content: space-between;
        font-size: 10px;
        line-height: 1;
        color: #9499a0;
    }

    .v-im-list .v-person-item .msg .txt {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }
</style>
