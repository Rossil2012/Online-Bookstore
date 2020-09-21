Page({
  onLoad: function(options) {
    if (options.active !== null && options.active > 0 && options.active < 4) {
      this.setData({
        active: (options.active === null ? 0 : options.active)
      });
    }
  },
  data: {
    active: 0
  },
  clickFooter: function(event) {
    this.setData({
      active: event.detail
    })
  }
})