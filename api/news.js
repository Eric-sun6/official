//获取分类列表
function getNewsClassify (context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/cms/classify/getAllClassify')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
//获取最新新闻列表
function getNewNewsList (context,page,pageSize) {
    let currentPage = page || 1;
    return new Promise((resolve, reject) => {
        context.$axios.get('/cms/property/getNewNewsList',{
            params:{
                currentPage,
                pageSize: pageSize
            }
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
//获取最新新闻
function getShowNewNews (context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/cms/property/getNewNewsList',{
            params:{
                currentPage:1,
                pageSize: 3
            }
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
//获取热门新闻
function getHotNews (context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/cms/property/getHotNews')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
//按分类显示新闻
function getNewsByClassify (context,classifyId,page,pageSize) {
    let currentPage = page || 1;
    return new Promise((resolve, reject) => {
        context.$axios.get('/cms/property/getNewsByClassify',{
            params:{
                classifyId: classifyId,
                currentPage,
                pageSize: pageSize
            }
        })
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
//搜索新闻
function searchNews (context,data) {
    return new Promise((resolve, reject) => {
        context.$axios.post('/cms/property/searchNews',data)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
export {
    getNewsClassify,
    getNewNewsList,
    getHotNews,
    getNewsByClassify,
    searchNews,
    getShowNewNews
}