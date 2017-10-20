
Page({
  data: {
    nowRead: []

  },
  onLoad: function (options) {
    var that = this;
    var userId = 1;
    wx.getStorage({
      key: 'nowRead',
      success: function (res) {
        console.log(res.data);
        let nowRead = res.data;
        that.setData({
          nowRead: nowRead         
        })
      }
    });
  }
})