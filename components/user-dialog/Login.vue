<template>
    <el-dialog
        title="用户登录"
        width="437px"
        :before-close="closeEvent"
        class="user-dialog"
        :visible.sync="pcLoginVisible"
        :close-on-click-modal="false"
        :lock-scroll="false"
    >
        <div class="form-container">
            <el-form :model="ruleForm" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input
                        type="text"
                        ref="username"
                        class="user-dialog-form-input"
                        v-model="ruleForm.username"
                        placeholder="手机号或用户名"
                    >
                        <template slot="prefix">
                            <img src="~assets/img/user/phone.png" width="22px">
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        autocomplete="new-password"
                        class="user-dialog-form-input"
                        v-model="ruleForm.password"
                        placeholder="密码"
                    >
                        <template slot="prefix">
                            <img src="~assets/img/user/password.png" width="22px">
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item v-if="lsmValidSwitch">
                    <validate @success="validateSucess"></validate>
                </el-form-item>
                <p class="link-read" style="text-align: right" @click="pushUrl('/choice')">
                    <span style="color:#9C9DB2">忘记密码？</span>
                    <a href="javascript:;">
                        <span style="color:#FA4545;">点击找回</span>
                    </a>
                </p>
                <div class="login-btn">
                    <div @click="submitForm" class="version-two-button form-submit">登&emsp;&emsp;录</div>
                </div>
                <p class="link-container" style="text-align: right">
                    <span style="color:#9C9EB2;">没有账号，</span>
                    <a href="javascript:;" @click="userDialog(1)">
                        <span style="color:#2E46CA;font-size: 14px">点击注册</span>
                    </a>
                </p>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import { setToken } from '~utils/auth'
import { corporateInvitation, login, operation } from '~api/user/login'
import Validate from './LuoSiMaoValidate'

export default {
    inject: ['reload'],
    components: {
        Validate
    },
    props: {
        pcLoginVisible: {
            default: false,
            type: Boolean
        }
    },
    data () {
        return {
            // loading: false,
            ts: '',
            tsDate: {},
            ruleForm: {
                username: "",
                password: ""
            },
            validDateStatus: false,
            lsmToken: '',
            lsmValidSwitch: process.env.ENV_DOMAIN === '.wiser-bridge.com'
        }
    },
    mounted () {
        //this.$refs.username.focus()
    },
    created () {
    },
    methods: {
        closeEvent () {
            this.$emit('closeLogin')
        },
        userDialog (type) {
            this.closeEvent()
            this.$bus.$emit('showUserDialog', type)
        },
        pushUrl (url) {
            //this.$router.push(url);
            if (url == '/quickOrder/index') {
                this.$util.cookie.setCookie('quickOrderQuerys', {})
            }
            this.$emit('closeLogin')
            window.open(process.env.ENV_SITE + url, "_self")
        },
        validateSucess (response) {
            this.lsmToken = response
            this.validDateStatus = true
        },
        async submitForm () {

            if (this.ruleForm.username === "" || this.ruleForm.username == null) {
                this.$message.error("请输入手机号")
                return
            }
            if (this.ruleForm.password === "" || this.ruleForm.password == null) {
                this.$message.error("请输入密码")
                return
            }

            if (this.lsmValidSwitch && !this.validDateStatus) {
                this.$message.error("未完成图形验证")
                return
            }


            let res = await login(this, this.ruleForm.username, this.encode64(this.ruleForm.password), this.lsmToken)
            if (res.code == "200") {
                // this.loading = true
                this.closeEvent()
                const tokenStr = res['front-token']
                this.$store.commit('setToken', tokenStr)
                setToken(tokenStr)
                localStorage.personName = res.personName
                this.comsd()
                console.log(2)
                this.reload()
                // this.loading = false
            } else {
                console.log(3)
                this.$message({
                    showClose: true,
                    message: res.message,
                    type: "error"
                })
            }

        },
        async comsd () {
            let res = await corporateInvitation(this)
            if (res.personEnterprise != null) {
                this.tsDate = res.personEnterprise
                this.ts = res.personEnterprise.enterpriseName
                this.$confirm(this.ts + '企业,邀请您加入', '企业邀请函', {
                    confirmButtonText: '同意',
                    cancelButtonText: '拒绝',
                }).then(async () => {
                    let data = {
                        id: this.tsDate.id,
                        personId: this.tsDate.personId,
                        enterpriseId: this.tsDate.enterpriseId,
                        personStatus: "01"
                    }
                    let res = await operation(this, data)
                    if (res.code == 200) {
                        this.$message.success("操作成功")
                    } else {
                        this.$message.error("操作失败")
                    }
                }).catch(async () => {
                    let data = {
                        id: this.tsDate.id,
                        personId: this.tsDate.personId,
                        enterpriseId: this.tsDate.enterpriseId,
                        personStatus: "04"
                    }
                    let res = await operation(this, data)
                    if (res.code == 200) {
                        this.$message.success("操作成功")
                    } else {
                        this.$message.error("操作失败")
                    }
                })
            }
        },
        encode64 (input) {
            var keyStr = "ABCDEFGHIJKLMNOP" + "QRSTUVWXYZabcdef" + "ghijklmnopqrstuv"
                + "wxyz0123456789+/" + "="
            var output = ""
            var chr1, chr2, chr3 = ""
            var enc1, enc2, enc3, enc4 = ""
            var i = 0
            do {
                chr1 = input.charCodeAt(i++)
                chr2 = input.charCodeAt(i++)
                chr3 = input.charCodeAt(i++)
                enc1 = chr1 >> 2
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4)
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6)
                enc4 = chr3 & 63
                if (isNaN(chr2)) {
                    enc3 = enc4 = 64
                } else if (isNaN(chr3)) {
                    enc4 = 64
                }
                output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2)
                    + keyStr.charAt(enc3) + keyStr.charAt(enc4)
                chr1 = chr2 = chr3 = ""
                enc1 = enc2 = enc3 = enc4 = ""
            } while (i < input.length)

            return output
        },
    }
}
</script>

<style scoped>
.login-banner .mask {
  width: 100%;
  height: 100%;
}
.form-container {
}

.login-btn {
  text-align: center;
  margin-bottom: 10px;
  width: 100%;
  height: 48px;
  margin-top: 64px;
}

.form-submit {
  width: 100%;
  height: 38px;
  line-height: 38px;
  color: rgba(254, 254, 254, 1);
  border-radius: 2px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
}

.link-container {
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: right;
  font-family: Source Han Sans CN;
  font-weight: 400;
}

.user-dialog-form-input:focus,
.form-submit:focus {
  outline: none;
}

.ms-content {
  padding: 30px 30px;
}
</style>
