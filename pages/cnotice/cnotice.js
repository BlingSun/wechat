Page({
  data: {
    data:[],
    chat: '',
    focus: 0
  },
  onLoad: function (e) {
    var that = this;
    wx.request({
      url: '',
      
      success: function (res) {
        var data = res.data;
        if (data) {
          that.setData({
            data: data,

            chat: ""
          })
        }
      }
    })
  },
  replay: function (options) {
    let commentId = options.target.dataset.commentid;
    console.log(options);
    console.log("commentId=" + commentId);
    this.setData({
      chat: "cshow",
      focus: "1"

    })

  },

  send: function (e) {
    console.log("commentId=" + commentId);
    var comment = e.detail.value.comment;
    var that = this;
    wx.request({
      url: 'http://192.168.1.106:3000/replay',
      data: {
        pid: commentId,
        storyId: 1,
        comment: comment
      },
      success: function (res) {
        var data = res.data;
        if (data) {
          that.setData({
            data: data,

            chat: ""
          })
        }
      }
    })
  },
  reset: function (options) {
    this.setData({

      chat: ""

    })
  },
})