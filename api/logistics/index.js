
function getLogistics (context, blNum) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/track-info/getData?blNum=' + blNum + '&source=0')
            .then(res => {
                resolve(res.data)

            })
            .catch(err => {
                console.log(err)
            })
    })
}
function getHistoryQueryBlNum (context, blNum) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/track-info/getHistoryQueryBlNum')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
export {
    getHistoryQueryBlNum,
    getLogistics
}