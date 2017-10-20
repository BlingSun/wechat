let answerId=0;
let questionId=0;

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
  answer: function (options) {
    answerId = options.target.dataset.answerid;
    questionId = options.target.dataset.questionid;
    console.log(options);
    console.log("questionId=" + questionId);
    this.setData({
      chat: "cshow",
      focus: "1"
    

    })

  },

  send: function (e) {   
    var comment = e.detail.value.comment;
    var that = this;
    wx.request({
      url: 'http://192.168.1.106:3000/answer',
      data: {
        pid: answerId,
        questionId: questionId,
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