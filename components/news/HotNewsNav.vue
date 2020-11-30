<template>
    <div
        v-if="list.length"
        ref="hotNewsNav"
        :class="[fixed===true? 'fixed': '']"
        :style="{left: fixed===true ? hotNewsNavLeft + 'px': null}"
        style="width: 336px"
    >
        <div class="hotNewsNav">
            <h3>热门资讯</h3>
            <ul style="text-align: left;">
                <li v-for="(item, index) in list">
                    <h2 class="clearfix" style="cursor: pointer" @click="detail(item)">
                        <span :style="`background: url(${item.coverUrl})`" alt="封面"></span>
                        <p>{{item.newsSummary }}</p>
                    </h2>
                    <a @click.stop.prevent="detail(item)">{{item.newsTitle }}</a>
                </li>
            </ul>
        </div>
        <div class="advert">
            <a class="3dBox" href="javascript:void(0)" @click="pushUrl('/quickOrder/index')">
                <span class="adFront"></span>
                <!--:style="{backgroundImage: adFrontBackImg}"-->
                <span class="adBack">海智链-国内首家全程物流解决方案平台</span>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name: "HotNewsNav",
    props: {
        list: Array,
        adFrontBackImg: {
            type: String,
            default: require('~/assets/img/logo.png')
        },
    },
    data () {
        return {
            hotNewsNavTop: 0,
            fixed: false,
            left: null
        }
    },
    created () {
    },
    filters: {
        formateContentFilter (value, length) {
            if (value && value.length > length)
                return value.substr(0, length) + '...'
            return value
        }
    },
    mounted () {
        this.hotNewsNavTop = this.$refs.hotNewsNav.offsetTop
        this.hotNewsNavLeft = this.$refs.hotNewsNav.offsetLeft
        window.addEventListener("scroll", this.attractToTop)
    },
    beforeDestroy () {
        window.removeEventListener("scroll", this.attractToTop)
    },
    methods: {
        attractToTop () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if (scrollTop >= this.hotNewsNavTop) {
                this.fixed = true
            } else {
                this.fixed = false
            }
        },
        detail (item) {
            this.$router.push({
                path: '/new-detail',
                query: {
                    id: item.id
                }
            })
        },
        pushUrl (url) {
            //this.$router.push(url);
            window.open(process.env.ENV_SITE + url, "_self")
        },
    }
}
</script>

<style lang="scss" scoped>
@mixin text-overflow($line) {
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: $line;
  -webkit-box-orient: vertical;
}

.hotNewsNav {
  height: auto;
  background: rgba(240, 243, 249, 1);
  padding: 20px 22px;
  border-top: 2px #5689ff solid;

  h2 {
    // display: flex;
    display: none;
    justify-content: space-between;
  }
  li {
    position: relative;
    font-size: 14px;
    line-height: 30px;
    counter-reset: count;
    cursor: pointer;
    a {
      position: absolute;
      top: 0;
      left: 10px;
      @include text-overflow(1);
    }
    &:hover {
      h2 {
        display: flex;
        justify-content: space-between;
      }
      a {
        display: none !important;
      }
      &:before {
        content: '';
      }
    }
  }

  span {
    width: 123px;
    height: 95px;
    display: inline-block;
    background-size: cover !important;
    background-position: 50% 50% !important;
  }
  h3 {
    color: #4f5069;
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 30px;
    text-align: left;
  }

  div {
    display: flex;
    justify-content: flex-start;
    margin-bottom: 30px;

    img {
      display: block;
      width: 123px;
      height: 95px;
    }
  }

  li::before {
    content: '· ';
    color: rgba(79, 80, 105, 1);
    font-size: 18px;
  }
  a:not(.3dbox) {
    color: #4f5069;
    font-size: 14px;
    @include text-overflow(1);

    &:before {
      content: '.';
      font-size: 14px;
      color: #4f5069;
      position: relative;
      top: -4px;
    }
  }
  p:not(.advert) {
    font-size: 14px;
    color: #4f5069;
    margin-left: 14px;
    width: 196px;
    @include text-overflow(4);
    line-height: 23px;
  }
}

.advert {
  height: 180px;
  display: block;
  position: relative;
  cursor: default;
  -webkit-perspective: 338px;
  -moz-perspective: 338px;
  -o-perspective: 338px;
  -ms-perspective: 338px;
  perspective: 338px;
  margin-top: 27px;

  a {
    transform-style: preserve-3d;
  }

  .adFront {
    background-image: url('~assets/img/news/new-ad-front.jpg');
    background-repeat: no-repeat;
    background-size: cover;
  }

  span {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    background-position: center center;
    -webkit-transition: all 0.3s linear;
    -moz-transition: all 0.3s linear;
    -o-transition: all 0.3s linear;
    -ms-transition: all 0.3s linear;
    transition: all 0.3s linear;
    -webkit-transform-origin: 50% 0%;
    -moz-transform-origin: 50% 0%;
    -o-transform-origin: 50% 0%;
    -ms-transform-origin: 50% 0%;
    transform-origin: 50% 0%;
  }

  .adBack {
    transform: translate3d(0, 0, -220px) rotate3d(1, 0, 0, 90deg);
    background: #f0f3f9;
    opacity: 0;
    line-height: 180px;
    text-align: center;
  }
}

// .advert:hover .adFront {
//   -webkit-transform: translate3d(0, 280px, 0) rotate3d(1, 0, 0, -90deg);
//   -moz-transform: translate3d(0, 280px, 0) rotate3d(1, 0, 0, -90deg);
//   -o-transform: translate3d(0, 280px, 0) rotate3d(1, 0, 0, -90deg);
//   -ms-transform: translate3d(0, 280px, 0) rotate3d(1, 0, 0, -90deg);
//   transform: translate3d(0, 280px, 0) rotate3d(1, 0, 0, -90deg);
//   opacity: 0;
// }

// .advert:hover .adBack {
//   -webkit-transform: rotate3d(1, 0, 0, 0deg);
//   -moz-transform: rotate3d(1, 0, 0, 0deg);
//   -o-transform: rotate3d(1, 0, 0, 0deg);
//   -ms-transform: rotate3d(1, 0, 0, 0deg);
//   transform: rotate3d(1, 0, 0, 0deg);
//   opacity: 1;
// }

.fixed {
  position: fixed;
  top: 0;
  z-index: 1;
}
</style>