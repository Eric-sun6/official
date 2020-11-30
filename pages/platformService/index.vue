<template>
    <div class="container">
        <logo/>
        <h1 class="title">平台服务</h1>
    </div>
</template>

<script>
import Swiper from 'swiper';
import Logo from '~/components/Logo.vue';
export default {
    components: {
        Logo
    },
    data () {
        return {
        }
    },

    computed: {
        swiper () {
            return this.$refs.mySwiper.$swiper
        }
    },
    mounted () {
        // console.log('Current Swiper instance object', this.swiper)
        // this.swiper.slideTo(3, 1000, false)
        // window.onscroll = this.$util.throttle(function () { console.log('清清浅浅') }, 10)

    }
}

</script>

<style lang="scss" scoped>
html,
body {
  width: 100%;
  height: 100%;
}
.container {
  margin: 0 auto;
  min-height: 100vh;
  background: red;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.contentWrap {
  position: relative;
  display: block;
  width: 100vw;
  height: 100vh;
  text-align: center;
  .swiper-container {
    width: 100vw;
    height: 100vh;
    background: green;
  }
  .swiper-slide {
    width: 100vw;
    height: 100vh;
  }
}
</style>
