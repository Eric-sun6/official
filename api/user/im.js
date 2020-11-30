
//获取聊天记录
export function chatRecord(context, name) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/im/getFrontChatRecord',{
                params: {
                    name: name,
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

//获取聊天人列表
export function getNoteTakerList(context) {
    return new Promise((resolve, reject) => {
        context.$axios.get('/im/getImList')
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}

//上传文件
export function uploadFileS(context,formData) {
    return new Promise((resolve, reject) => {
        context.$axios.contentType = false
        context.$axios.processData = false
        context.$axios.post(process.env.QYKF_SITE + ':' + process.env.QYKF_PORT + '/admin/uploadFileS',formData)
            .then(res => {
                resolve(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    })
}
