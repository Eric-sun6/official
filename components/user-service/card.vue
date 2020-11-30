<template>
    <div class="v-im-card">
        <p class="name">{{name}}</p>
        <p class="v-card-icon">
           <slot name="btn"></slot>
        </p>
    </div>
</template>

<script>
    export default {
        props: {
            name: ''
        }
    }
</script>

<style scoped>
.v-im-card{
    padding:0 12px;
    display: flex;
    justify-content: space-between;
    height: 35px;
    line-height: 35px;
    border-bottom: 1px #e5e5e5  solid;
}
.v-im-card .name{
    font-size: 10px;
    color:#8d8d8d;
}
.v-im-card .v-card-icon{
    display: flex;
    align-items: center;
}
.v-im-card .v-card-icon span{
    margin:0 2px;
    padding:0 3px;
    font-size: 12px;
    color:#000;
    cursor: pointer;
}
</style>
