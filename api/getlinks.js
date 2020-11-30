
function getlinks (context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/cms/links/getShowLinks')
            .then(res => {
                resolve(res.data.data)
                // console.log(res.data.bbiSeaportList.length)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

export {
    getlinks
}