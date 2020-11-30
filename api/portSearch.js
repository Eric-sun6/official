
function quicklyBeginInit (context, searchWord) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/search/quickly/begin/init')
            .then(res => {
                resolve(res.data)
                // console.log(res.data.bbiSeaportList.length)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

function quicklyEndInit (context, searchWord) {
    return new Promise(resolve => {
        context.$axios.get('/search/quickly/end/init')
            .then((res) => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
function quickOrderBeginSite (context, searchWord) {
    return new Promise(resolve => {
        context.$axios.get('/search/quickly/begin/division?searchWord=' + searchWord
        ).then((res) => {
            // console.log(res)
            resolve(res.data)
        })
            .catch(err => {
                console.log(err)
            })
    })
}

function quickOrderEndSite (context, searchWord) {
    return new Promise(resolve => {
        context.$axios.get('/search/quickly/end/division?searchWord=' + searchWord)
            .then((res) => {
                // console.log(res)
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
function setLogForHomePage (context) {
    return new Promise(resolve => {
        context.$axios.get('/admin/setLogForHomePage')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
export {
    quicklyBeginInit,
    quicklyEndInit,
    quickOrderBeginSite,
    quickOrderEndSite,
    setLogForHomePage
}