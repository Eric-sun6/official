
import Vue from 'vue'
// import VueQuillEditor from 'vue-quill-editor/dist/ssr'
import Quill from 'quill'
if (process.BROWSER_BUILD) {
    const VueQuillEditor = require('vue-quill-editor/dist/ssr')
    Vue.use(VueQuillEditor)
}
// Vue.use(VueQuillEditor)