<template>
    <el-dialog
        title="用户注册"
        width="437px"
        :before-close="closeEvent"
        class="user-dialog"
        :visible.sync="pcRegVisible"
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
                        v-model="ruleForm.mobile"
                        placeholder="请输入手机号"
                        @change="checkPattern(ruleForm.mobile,'MOBILE')"
                    >
                        <template slot="prefix">
                            <img src="~assets/img/user/phone.png" width="22px">
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="mobileCode">
                    <el-input
                        type="text"
                        class="user-dialog-form-input"
                        v-model="ruleForm.mobileCode"
                        placeholder="请输入手机验证码"
                    >
                        <template slot="prefix">
                            <img src="~assets/img/user/phoneCode.png" width="22px">
                        </template>
                        <template slot="suffix">
                            <el-button
                                type="primary"
                                @click="sendMobile"
                                :loading="isDisabled"
                                class="version-two-button"
                                style="font-size: 14px;width:103px;height: 38px"
                            >{{verifyValue}}</el-button>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        type="password"
                        class="user-dialog-form-input"
                        autocomplete="new-password"
                        v-model="ruleForm.password"
                        placeholder="请输入密码"
                    >
                        <template slot="prefix">
                            <img src="~assets/img/user/password.png" width="22px">
                        </template>
                    </el-input>
                </el-form-item>
                <p class="link-read">
                    <el-checkbox v-model="checked"></el-checkbox>
                    <span style="font-size: 14px;color: #9C9DB2;margin-left: 6px">我已阅读并同意</span>
                    <a href="javascript:;" @click="pushUrl('/pra')">
                        <span style="color:#2E46CA;">《个人用户注册协议》</span>
                    </a>
                </p>
                <div class="login-btn">
                    <el-button
                        class="version-two-button form-submit"
                        @click="submitForm"
                        :loading="loading"
                    >注&emsp;&emsp;册</el-button>
                </div>
                <p class="link-container" @click="userDialog(0)">
                    >
                    <span style="color: #9C9EB2">已有帐户，</span>
                    <a href="javascript:;">
                        <span style="color:#2E46CA;font-size: 14px;">立即登录</span>
                    </a>
                </p>
            </el-form>
        </div>
    </el-dialog>
</template>

<script>
import { getMobileCode, register } from '~api/user/register'
import { setToken } from '~utils/auth'
import { corporateInvitation, autoLogin, operation } from '~api/user/login'

export default {
    inject: ['reload'],
    props: {
        pcRegVisible: {
            default: false,
            type: Boolean
        }
    },
    data: function () {
        return {
            ruleForm: {
                mobile: "",
                password: "",
                mobileCode: ""
            },
            time: 59,
            verifyValue: '获取验证码',
            isDisabled: false,
            checked: false,
            mobileCode: false,
            timer: null,
            loading: false
        }
    },
    mounted () {
        //this.$refs.username.focus()
    },
    beforeDestroy () {
        clearInterval(this.timer)
    },
    methods: {

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
            window.open(process.env.ENV_SITE + url, "_blank")
        },
        closeEvent () {
            this.$emit('closeRegister')
        },
        async checkPattern (name, type) {
            if (type == 'MOBILE') {
                if (this.ruleForm.mobile) {
                    if (!/^1\d{10}$/.test(name)) {
                        this.$message({
                            showClose: true,
                            message: '请输入正确的手机号',
                            type: 'error'
                        })
                        return false
                    }
                }
            }
        },
        async sendMobile () {
            if (!this.ruleForm.mobile) {
                this.$message({
                    showClose: true,
                    message: "请输入手机号",
                    type: "error"
                })
                return
            }
            if (this.ruleForm.mobile) {
                if (!/^1\d{10}$/.test(this.ruleForm.mobile)) {
                    this.$message({
                        showClose: true,
                        message: '请输入正确的手机号',
                        type: 'error'
                    })
                    return false
                }
            }
            let res = await getMobileCode(this, this.ruleForm.mobile)
            if (res.code == 200) {
                this.verifyValue = '发送中...'
                this.isDisabled = true
                this.timer = setInterval(() => {
                    if (this.time === 0) {
                        clearInterval(this.timer)
                        this.time = 59
                        this.isDisabled = false
                    }
                    this.verifyValue = this.time--
                }, 1000)
                setTimeout(() => {
                    this.verifyValue = '重新发送'
                }, 60000)
            } else {
                this.$message({
                    showClose: true,
                    message: res.message,
                    type: "error"
                })
                return
            }

        },
        async submitForm () {
            if (!this.ruleForm.mobile) {
                this.$message({
                    showClose: true,
                    message: "请输入手机号",
                    type: "error"
                })
                return
            }
            if (!this.ruleForm.mobileCode) {
                this.$message({
                    showClose: true,
                    message: "请输入短信验证码",
                    type: "error"
                })
                return
            }
            if (!this.ruleForm.password) {
                this.$message({
                    showClose: true,
                    message: "请输入密码",
                    type: "error"
                })
                return
            }
            if (this.ruleForm.password.length < 0) {
                this.$message({
                    showClose: true,
                    message: "密码长度最小6位",
                    type: "error"
                })
                return
            }

            if (this.checked == false) {

                this.$message({
                    showClose: true,
                    message: '请先阅读并同意个人注册协议',
                    type: 'error'
                })
                return
            }

            this.loading = true
            let res = await register(this, this.ruleForm.mobile, this.ruleForm.password, this.ruleForm.mobileCode)
            if (res.code == 200) {
                //this.closeEvent()
                this.$message({
                    showClose: true,
                    message: "注册成功",
                    type: "success"
                })

                let loginres = await autoLogin(this, this.ruleForm.mobile, this.encode64(this.ruleForm.password))
                if (loginres.code == "200") {
                    this.closeEvent()
                    const tokenStr = loginres['front-token']
                    this.$store.commit('setToken', tokenStr)
                    setToken(tokenStr)
                    localStorage.personName = res.personName
                    this.comsd()
                    this.reload()
                } else {
                    this.$message({
                        showClose: true,
                        message: loginres.message,
                        type: "error"
                    })
                }
            } else {
                this.$message({
                    showClose: true,
                    message: res.message,
                    type: "error"
                })
            }
            this.loading = false
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
  color: rgba(254, 254, 254, 1);
  border-radius: 2px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 400;
}

.form-submit:hover {
  color: #fefefe !important;
}

.link-container {
  margin-top: 20px;
  margin-bottom: 15px;
  font-size: 14px;
  text-align: right;
}

.user-dialog-form-input:focus,
.form-submit:focus {
  outline: none;
}

.ms-content {
  padding: 30px 30px;
}
</style>
