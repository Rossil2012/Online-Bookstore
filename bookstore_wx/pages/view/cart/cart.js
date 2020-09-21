import Notify from '../../../miniprogram_npm/@vant/weapp/notify/notify';

Component({
  lifetimes: {
    ready: function() {
      let utils = require('../../../utils/util');
      let data = {};
      data['token'] = getApp()['sessionid'];
      if (!data['token']) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      const callback = (data) => {
        if (data.verify === '0') {
          wx.navigateTo({
            url: '/pages/login/login',
          })
          return;
        }
        let sum = 0;
        data.forEach((ite) => {
          sum += ite.price * ite.amount;
        });
        this.setData({
          cartItems: data,
          costSum: parseInt(sum * 100)
        });
      };
      utils.restRequest("http://localhost:8080/getCartItemsAll", data, callback, "POST");
    }
  },
  pageLifetimes: {
    show: function() {
      let utils = require('../../../utils/util');
      let data = {};
      data['token'] = getApp()['sessionid'];
      if (!data['token']) {
        return;
      }
      const callback = (data) => {
        console.log(data);
        if (data.verify === '0') {
          return;
        }
        let sum = 0;
        data.forEach((ite) => {
          sum += ite.price * ite.amount;
        });
        this.setData({
          cartItems: data,
          costSum: parseInt(sum * 100)
        });
      };
      utils.restRequest("http://localhost:8080/getCartItemsAll", data, callback, "POST");
    }
  },
  data: {
    cartItems: Array,
    costSum: 0
  },
  methods: {
    onSubmit: function() {
      let utils = require('../../../utils/util');
      let data = {};
      data['token'] = getApp()['sessionid'];
      if (!data['token']) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      const callback = (data) => {
        if (data.verify === '0') {
          wx.navigateTo({
            url: '/pages/login/login',
          })
          return;
        } else if (data.opt === '1') {
          Notify({ type: 'success', message: 'Purchase successfully', context: this });
          this.setData({
            cartItems: Array,
            costSum: 0
          })
        }
      }

      utils.restRequest('http://localhost:8080/submitCart', data, callback, "POST");
    },
    onCartNumChange(event) {
      let bid = event.currentTarget.dataset.src;
      let amount = event.detail;
      let utils = require('../../../utils/util');
      let data = {};
      data['token'] = getApp()['sessionid'];
      if (!data['token']) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }

      data['bid'] = bid;
      data['amount'] = amount;

      const callback = (data) => {
        if (data.verify === '0') {
          wx.navigateTo({
            url: '/pages/login/login',
          })
          return;
        } else if (data.opt === '1') {
          let sum = 0;
          this.setData({
            cartItems: this.data.cartItems.map((ite) => {
              let ret = ite;
              if (ret.bookId === bid) {
                ret.amount = amount;
              }
              sum += ret.amount * ret.price;
              return ret;
            }),
            costSum: parseInt(sum * 100)
          })
        }
      }

      utils.restRequest('http://localhost:8080/setCartItem', data, callback, "POST");
    },
    onRemove(event) {
      let bid = event.currentTarget.dataset.src;
      let utils = require('../../../utils/util');
      let data = {};
      data['token'] = getApp()['sessionid'];
      if (!data['token']) {
        wx.navigateTo({
          url: '/pages/login/login',
        })
        return;
      }
      data['bid'] = bid;
  
      const callback = (data) => {
        if (data.verify === '0') {
          wx.navigateTo({
            url: '/pages/login/login',
          })
          return;
        } else if (data.opt === '1') {
          let sum = 0;
          this.data.cartItems.forEach((ite) => {
            sum += (ite.bookId != bid ? ite.price * ite.amount : 0);
          });
          this.setData({
            cartItems: this.data.cartItems.filter((ite) => ite.bookId != bid),
            costSum: parseInt(sum * 100)
          })
        }
      }
  
      utils.restRequest('http://localhost:8080/removeCartItem', data, callback, "POST");
    }
  }
})