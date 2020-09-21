import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

Page({
  data: {
    username: '',
    password: '',
    pwdVisible: false
  },
  onClickVisible: function() {
    this.setData({
      pwdVisible: !this.data.pwdVisible
    })
  },
  submit: function() {
    let utils = require('../../utils/util');
    let data = {
      username: this.data.username,
      password: this.data.password
    };
    const callback = (data) => {
      console.log(data);
      if (data.status != 404) {
        getApp()['sessionid'] = data.token;
        wx.navigateBack({
          delta: 1,
        });
      } else if (data.status == 404) {
        Notify({ type: 'danger', message: 'Unvaild username or password'});
      }
    };
    utils.restRequest("http://localhost:8080/login", data, callback, "POST");
  }
})
