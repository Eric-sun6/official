<template class="error">
    <div class="container error">
        <h1 v-if="error.statusCode === 404">404，抱歉，页面未找到</h1>
        <h1 v-else>An error occurred</h1>
        <nuxt-link to="/">返回官网首页</nuxt-link>
    </div>
</template>
<style >
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 100px;
}
.error + .footer-container {
  display: none;
}
</style>

<script>
export default {
    props: ['error'],
    layout: 'blog' // you can set a custom layout for the error page
}
</script>