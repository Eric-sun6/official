
export function getNewsContent (context, id) {
  return new Promise((resolve, reject) => {
    context.$axios.get('/cms/property?id=' + id)
      .then(res => {
        resolve(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  })
}
export function getNews (context,newsId) {
  return new Promise((resolve, reject) => {
    context.$axios.get('/cms/property/getShowNewsById?id=' + newsId)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          console.log(err)
        })
  })
}
