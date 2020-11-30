import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export const state = () => ({
    token: null,
    newsId: '',
    // showWechat:true,
})
export const getters = {
    getToken (state) {
        return state.token
    },
    getNewsId (state) {
        return state.newsId
    },
}
export const mutations = {
    // setshowWeChat(state, showWechat){
    //     state.showWechat = showWechat
    // },
    setToken (state, token) {
        state.token = token
    },
    setNewsId (state, newsId) {
        state.newsId = newsId
    },
    setPortStartData (state, startData) {
        state.startData = startData
    },
    setPortEndData (state, endData) {
        state.endData = endData
    },
    setPortHotNews (state, hotNews) {
        state.hotNews = hotNews
    }


}
export const actions = {
    //TODO ajax here
}
