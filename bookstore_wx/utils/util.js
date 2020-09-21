const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function restRequest(url, data, callback, method) {
  wx.request({
    url: url, 
    method: method,
    data: data,
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      callback(res.data);
    }
  })
}

module.exports = {
  formatTime: formatTime,
  restRequest: restRequest
}
