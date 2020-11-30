<template>
    <div class="v-im-text" :class="{'text-disabled':name.length==0}">
        <template v-if="name">
            <div class="tools">
                <span class="imicon icon-smile" v-if="!person.online" ></span>
                <span class="imicon icon-smile" v-else @click="showEmoji = !showEmoji"></span>
                <span class="imicon icon-tupian" @click="uploadImg"></span>
                <span class="imicon icon-shangchuanwenjian"  @click="uploadFile"></span>
                <span class="imicon icon-xiaoxi" :class="{'active':currentHistory}" @click="chatRecord"></span>
            </div>
            <div class="send-content">
                <el-input
                    class="send-textarea"
                    type="textarea"
                    :rows="4"
                    placeholder="按 Ctrl + Enter 发送"
                    v-model="content"
                    @keyup.native="onKeyupEvent">
                </el-input>
            </div>
            <div class="send-button">
                <el-button size="mini" :disabled="!person.online" @click="handleClick">发送</el-button>
            </div>
        </template>
        <transition name="fade" mode="">
            <div class="emoji-box" v-if="showEmoji">
                <el-button
                    class="pop-close"
                    :plain="true"
                    type="text"
                    size="mini"
                    icon="el-icon-close"
                    @click="showEmoji = false"></el-button>
                <vue-emoji
                    @select="selectEmoji">
                </vue-emoji>
                <span class="pop-arrow arrow"></span>
            </div>
        </transition>
    </div>
</template>

<script>
    import vueEmoji from './emoji/emoji.vue'
    import {chatRecord,uploadFileS,uploadImage} from '~api/user/im'
    import vInfo from './info';

    export default {
        data() {
            return {
                content: '',
                value: '',
                showEmoji: false,
                url:'',
                data: [],
                sChatRecord: [],
                cChatRecord: [],
                userName: '',
                currentHistory:false,
                imgUrl: ''
            }
        },
        props: {
            person: Object,
            list: {},
            cToken: String,
            name: String,
        },
        watch: {
            name(val){
                this.currentHistory = false
                this.$emit('showHisEvent',[],true)
            }
        },
        components: {
            vueEmoji
        },
        created (){
            this.userName = localStorage.getItem('userName');
        },
        methods: {
            async chatRecord() {
                if(this.currentHistory === false){
                    this.currentHistory = true
                    let res = await chatRecord(this, this.name);
                    this.sChatRecord = res.sChatRecord
                    this.cChatRecord = res.cChatRecord
                    let s = this.setMessage(this.sChatRecord,this.userName,true);
                    let c = this.setMessage(this.cChatRecord,this.name,false);
                    let sc = [...s,...c].sort((a,b)=>{
                        return new Date(a['time'])-new Date(b['time']);
                    });
                    this.$emit('showHisEvent',sc)
                }else{
                    this.$emit('showHisEvent',[],this.currentHistory)
                    this.currentHistory = false
                }

            },
            setMessage(list,name,self){
                   let msg = [];
                   list.forEach(item=>{
                       let _item = JSON.parse(item);
                       msg.push({
                           self:self,
                           name: name,
                           time: _item.body.time,
                           content: _item.body.content
                       })
                   });
                return msg;
            },
            uploadImg() {
                if(!this.person.online)  return;
                let oFile = document.createElement("input");
                oFile.setAttribute("type", "file");
                oFile.setAttribute("accept", "image/*");
                oFile.click();
                oFile.onchange = async (e)=> {
                    let formData = new FormData();
                    formData.append('file',e.target.files[0]);
                    let res = await uploadFileS(this, formData);
                    this.imgUrl = res.fileUrl
                    this.$emit('sendMessage',this.imgUrl)
                }
            },

            async uploadFile() {
                if(!this.person.online)  return;
                let oFile = document.createElement("input");
                oFile.setAttribute("type", "file");
                // oFile.setAttribute("accept", "image/*");
                oFile.click();
                oFile.onchange = async (e)=> {
                    event.preventDefault();
                    let formData = new FormData();
                    formData.append('file',e.target.files[0]);
                    // var index1= e.target.files[0].name.substring(e.target.files[0].name.lastIndexOf(".")+1);
                    // console.log(index1)
                    let res = await uploadFileS(this, formData);
                    res.uploadType = "file";
                    this.$emit('sendMessage',JSON.stringify(res))
                }

             },
            selectEmoji(code) {
                this.showEmoji = false
                this.content += code
            },

            onKeyupEvent(e) {
                if(!this.person.online)  return;
                if (e.ctrlKey && e.keyCode === 13) {
                    this.handleClick()
                }
            },
            handleClick() {
                if (this.content.length) {
                    this.$emit('sendMessage', this.content);
                    this.content = ''
                }
            }
        },
        components: {
            vInfo,
            vueEmoji
        },
    }
</script>

<style>
    .emoji-box {
        position: absolute;
        z-index: 10;
        left: -2px;
        top: 26px;
        box-shadow: 0 4px 20px 1px rgba(0, 0, 0, 0.2);
        background: white;
    }

    .emoji-box .el-button {
        position: absolute;
        border: none;
        color: #FF4949;
        right: 5px;
        top: -1px;
        z-index: 10;
    }

    .emoji-box .el-button {
        font-size: 20px;
    }

    .v-im-text {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 0 10px 10px;
        border-top: 1px #e5e5e5 solid;
        min-height: 140px;
    }

    .v-im-text.text-disabled {
        background: #f7f7f7;
    }

    .v-im-text .tools {
        display: flex;
        align-items: center;
        height: 30px;
    }

    .v-im-text .tools span {
        margin: 0 5px;
        font-size: 18px;
        cursor: pointer;
        color: #676666
    }
    .v-im-text .tools span.active{
        color:#0a53ff;
    }
    .v-im-text .send-content {
        flex: 1;
    }

    .v-im-text .send-content textarea {
        padding: 5px;
        resize: none;
        border: none;
        font-size: 14px;
    }

    .v-im-text .send-button {
        text-align: right;
    }

</style>
