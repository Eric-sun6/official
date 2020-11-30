<template>
    <div>
        <div class="loading">
            <div class="loadWrap">
                <img class="loadgif" src="~assets/img/c.gif" alt="">
            </div>
        </div>
    </div>
</template>

<script>

export default {
    data () {
        return {
            // links: null
        }
    },
    props: {
        links: null
    },
    created () {
        // this.getlinks(this)
    },
    // asyncData ({ app }) {
    //     let links = this.getlinks(app)
    //     console.log(links)
    //     return { links: links }
    // },
    methods: {

    }
}

</script>

<style lang="scss" scoped>
.loading {
  width: 100%;
  height: 80%;
  position: fixed;
  top: 20%;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 9999999;
  //   background: rgba(0, 0, 0, 0.5);
  .loadWrap {
    width: 150px;
    height: 150px;
    // background: white;
    position: relative;
    border-radius: 8px;
    // top: 50%;
    // left: 50%;
    top: 495px;
    left: 45%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    transform: translateY(-50%);
  }
}
</style>
