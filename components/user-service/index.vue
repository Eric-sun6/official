<template>
    <transition name="fade">
        <div class="v-im-modal" @click.self="minimizeEvent">
            <div class="v-im-container">
                <v-list
                    :persons="persons"
                    :currentPerson="currentPerson"
                    @changePerson="changePerson"
                    @closePerson="closePerson"
                ></v-list>
                <div class="v-im-content">
                    <v-card :name="currentName">
                        <template slot="btn">
                            <span class="el-icon-minus"  @click.stop="minimizeEvent"></span>
                            <span class="el-icon-close" @click.stop="closeIm"></span>
                        </template>
                    </v-card>
                    <v-message :list="list"></v-message>
                    <v-text :person="currentPersonObj" :list="list" :online="online" :name="currentName"  :cToken="cToken" @showHisEvent="showHisEvent" @sendMessage="sendMessage"></v-text>
                </div>
                <v-history v-if="showHistory" :history="historyList"></v-history>
            </div>
        </div>
    </transition>
</template>

<script>
    import vList from './list';
    import vCard from './card';
    import vMessage from './message';
    import vText from './text';
    import vHistory from './history';
    import {getToken} from "~utils/auth";
    import { mapGetters,mapMutations } from 'vuex'

    export default {
        data() {
            return {
                persons: {},
                currentPerson: '',
                currentPersonObj: {},
                list: [],
                wsOpen: false,
                online: false,
                token: '',
                cToken: '',
                ws: null,
                currentName: '',
                showHistory: false,
                historyList: []
            }
        },
        props: {
            name: String
        },
        watch: {
            webSocketStatus(status) {
                if (status) {
                    this.openWs();
                }
            },
            currentPerson(person) {
                if (this.persons[person]) {
                    let _person = this.currentPersonObj =  this.persons[person];
                    _person.new = false;
                    this.list = _person.message;
                    this.online = _person.online;
                    this.currentName = this.persons[person].name
                }
            }
        },
        methods: {
            ...mapMutations({
                setImShow: 'SET_IMSHOW',
                setWsStatus: 'SET_WSSATTUS'
            }),
            showHisEvent(val,show){
                if(val){
                    this.historyList = val;
                }
                if(show){
                    this.showHistory = false;
                }else{
                    this.showHistory = true;
                }
            },
            minimizeEvent() {
                this.$emit('closeIm',true)
            },
            // 打开 websocket
            openWs() {
                if (this.ws != null) return;
                let token = this.token = getToken();
                this.ws = new WebSocket(`ws://${process.env.QYKF_SITE + ':' + process.env.QYKF_PORT}/ws/${token}`);
                this.ws.onopen = () => {
                    console.log("连接成功...");
                };
                this.ws.onmessage = evt => {
                    console.log("数据已接收...", evt);
                    this.receiveData(evt.data)
                };
                this.ws.onclose = () => {
                    this.ws = null;
                    this.setWsStatus(false)
                    console.log("连接已关闭...");
                };
                this.ws.onerror = () => {
                    this.setWsStatus(false)
                }
            },
            closeIm() {
                if (this.ws != null) {
                    this.ws.close()
                }
                this.$emit('closeIm')
                this.setWsStatus(false)
            },
            // 接受数据
            receiveData(content) {
                this.handleData(content, false)
            },
            // 发送数据
            sendMessage(content) {
                if (this.ws === null) return;
                let len = Object.keys(this.persons);
                if (len.length === 0) return;
                let data = {
                    header: {'content-type': 'request'},
                    body: {
                        token: this.token,
                        to: this.persons[this.currentPerson].token,
                        content: content,
                        from: this.token
                    }
                };
                let msg = JSON.stringify(data);
                this.ws.send(msg);
                this.handleData(content, true)
            },
            // 处理数据
            handleData(content, self) {
                // 如果是自己  直接显示数据
                if (self) {
                    this.persons[this.currentPerson].message.push({
                        self: self,
                        date: new Date().getTime(),
                        content: content,
                        token: this.persons[this.currentPerson].token
                    });
                    this.list = this.persons[this.currentPerson].message
                } else {
                    let _content = JSON.parse(content);
                    let head = _content.header;
                    let body = _content.body;
                    let token = body.token;
                    let name = '';
                    let from = name = head.userName;
                    this.cToken =token;
                    // 判断类型

                     if (head['content-type'] === 'cOffline' || head['content-type'] === 'sOffline' ) {
                        this.persons[name]['online'] = false;
                    }else if ( head['content-type'] === 'cOnline' || head['content-type'] === 'no-server-session') {
                        let cHistory = _content.sHistory;
                        let cOnline = _content.sOnline;
                        let _persons = {};
                        for(let _person in cHistory){
                            let _name = cHistory[_person];
                            //客户端下线后再次上线，客户端聊天信息保留
                            let tempMessage = [];
                            if(this.persons[name]){
                                tempMessage = this.persons[name].message;
                            }
                            _persons[_name] = {
                                name: _name,
                                online: false,
                                message: tempMessage
                            }
                        }
                        for(let item in cOnline){
                            let _name = cOnline[item];
                            if(_persons[_name]){
                                _persons[_name].online = true;
                                _persons[_name].token = item;
                            }
                        }
                        this.persons = Object.assign(this.persons ,_persons)
                    }
                    else {
                        if (name !== this.currentPerson) {
                            if (this.persons[name]) {
                                this.persons[name].new = true
                            }
                        }
                        // 如果没有当前用户
                        if (!this.persons[name]) {
                            this.persons[name] = {
                                name: name,
                                online: true,
                                new: false,
                                message: [],
                                token:token
                            };
                            if (body.content) {
                                this.persons[name].message.push({
                                    self: false,
                                    date: new Date().getTime(),
                                    content: body.content
                                })
                            }
                        } else {
                            if(!this.persons[name]['online']){
                                this.persons[name]['online'] = true;
                            }
                            this.persons[name].token = token;
                            if (body.content) {
                                this.persons[name].message.push({
                                    self: false,
                                    date: new Date().getTime(),
                                    content: body.content
                                })
                            }
                        }
                    }

                    if(this.persons[this.currentPerson]){
                        this.list = this.persons[this.currentPerson].message;
                    }
                    if (this.persons[name] && this.persons[name]['online'] === false) {
                        if (Object.keys(this.persons).length === 0) {
                            this.currentName = ""
                        }
                    }
                    this.persons = JSON.parse(JSON.stringify(this.persons));
                    if(this.persons[this.currentPerson]){
                        this.currentPersonObj = this.persons[this.currentPerson];
                    }
                }
            },
            changePerson(person) {
                this.currentPerson = person;
            },
            closePerson(person) {
                this.persons = JSON.parse(JSON.stringify(this.persons))
                if (person === this.currentPerson) {
                    // 获取剩余人数
                    let keys = Object.keys(this.persons);
                    // 如果剩余人数为0
                    if (keys.length === 0) {
                        this.list = [];
                    } else {
                        // 如果当前人数大于零，展示最后一个人的信息
                        this.currentPerson = keys[keys.length - 1]
                    }
                }
            }
        },
        computed: {
            ...mapGetters(["showIm", "webSocketStatus"])
        },
        components: {
            vList,
            vCard,
            vMessage,
            vText,
            vHistory
        },
    }
</script>

<style scoped>
    .v-im-modal {
        position: fixed;
        left: 0;
        top: 0;
        right: 0;
        z-index:999;
        bottom: 0;
        padding: 2% 15%;
        background: rgba(0, 0, 0, 0.5);
    }

    .v-im-container {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        height: 600px;
        width: 840px;
        display: flex;
        background: #fff;
    }

    .v-im-container .v-im-content {
        flex: 1;
        display: flex;
        flex-direction: column;
        min-height: 600px;
        border-left: 1px #e5e5e5 solid;
        border-right: 1px #e5e5e5 solid;
    }
</style>
