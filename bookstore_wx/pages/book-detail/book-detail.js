import Notify from '../../miniprogram_npm/@vant/weapp/notify/notify';

Page({
  onShow: function() {
    this.setData({
      bookDetail: getApp()['curBook']
    })

    let data = {};
    data['token'] = getApp()['sessionid'];
    data['bid'] = getApp()['curBook'].bookId;
    let utils = require("../../utils/util");
    const callback = (data) => {
      this.setData({
        isLiked: data.opt === '1'
      });
    }

    utils.restRequest('http://localhost:8080/getLikedBookOne', data, callback, 'POST')
  },
  data: {
    isLiked: false,
    bookDetail: {}
  },
  onClickCart: function() {
    let curPage = getCurrentPages();
    curPage[curPage.length - 2].setData({
      active: 1
    });
    wx.navigateBack();
  },
  onClickLike: function() {
    let data = {};
    data['token'] = getApp()['sessionid'];
    if (!data['token']) {
      wx.navigateTo({
        url: '/pages/login/login',
      });
      return;
    }
    data['bid'] = this.data.bookDetail.bookId;
    let utils = require('../../utils/util');
    const callback = (data) => {
      if (data.opt === '1') {
        this.setData({
          isLiked: !this.data.isLiked
        });
      } else if (data.verify === '0') {
        wx.navigateTo({
          url: '/pages/login/login',
        });
      }
    }
    if (!this.data.isLiked === true) {
      utils.restRequest('http://localhost:8080/likeBook', data, callback, 'POST');
    } else {
      utils.restRequest('http://localhost:8080/dislikeBook', data, callback, 'POST');
    }
  },
  onClickAdd: function() {
    let data = {};
    data['token'] = getApp()['sessionid'];
    if (!data['token']) {
      wx.navigateTo({
        url: '/pages/login/login',
      });
      return;
    }
    data['bid'] = this.data.bookDetail.bookId;
    data['amount'] = 0;
    let utils = require('../../utils/util');
    const callback = (data) => {
      if (data.opt === '1') {
        Notify({ type: 'success', message: 'Add to cart successfully' });
      } else if (data.verify === '0') {
        wx.navigateTo({
          url: '/pages/login/login',
        });
      }
    }
    utils.restRequest('http://localhost:8080/setCartItem', data, callback, 'POST')
  },
  onClickPurchase() {
    this.onClickAdd();
    wx.navigateTo({
      url: '/pages/index/',
    })
  }
})