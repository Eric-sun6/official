<template>
    <div v-if="isRouterActive">
        <nuxt/>
        <!-- <Footer /> -->
        <transition name="el-zoom-in">
          <Login @closeLogin="closeLogin" :pcLoginVisible="pcLoginVisible" v-if="pcLoginVisible"></Login>
          <Register @closeRegister="closeRegister" :pcRegVisible="pcRegVisible" v-if="pcRegVisible"></Register>
        </transition>

        <div style="width: 100%;height: 100%;">
            <el-backtop :bottom="65" class="backtopIndex"></el-backtop>
        </div>
    </div>
</template>

<script>
// import Footer from '~/components/footer';
import Login from '~/components/user-dialog/Login'
import Register from '~/components/user-dialog/Register'
export default {
    provide () {
        return {
            reload: this.reload
        }
    },
    components: {
        // Footer,
        Login,
        Register
    },
    data () {
        return {
            isRouterActive: true,
            pcLoginVisible: false,
            pcRegVisible: false,
        }
    },

    mounted () {
        //显示登录注册对话框
        this.$bus.$on("showUserDialog", (type) => {
            if (type == 0) {
                this.pcLoginVisible = true
            } else {
                this.pcRegVisible = true
            }
        });
    },
    methods: {
        reload () {
            this.isRouterActive = false
            this.$nextTick(() => {
                this.isRouterActive = true
            })
        },
        closeLogin () {
            this.pcLoginVisible = false
        },
        closeRegister () {
            this.pcRegVisible = false
        },

    }
}
</script>
<style>
.container {
  /* position: relative;
    top: 110px; */
}
.backtopIndex {
  z-index: 1000;
}
</style>
