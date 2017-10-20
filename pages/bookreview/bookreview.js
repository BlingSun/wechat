let storyId = 1;

let answerId = 0;
let questionId=0;
Page({
  data: {
    data: [],
    focus: "1",

    userName: "",
    storyName: "",
    over: "",
    like: "",

    bottom: "",
    chat: ""
  },
  onLoad: function (options) {
    // storyId=options.story.storyId;
    let userName = options.userName;
    let storyName = options.storyName;
    let over = options.over;
    console.log(options);
    let that = this;
    wx.request({
      url: 'http://192.168.1.106:3000/answer/',
      data: {
       
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        let data = res.data;
        console.log("data==========");
        console.log(data);
        that.setData({
          data: data      

        })

      }
    })

  },
  refresh:function(){
    let that = this;
    wx.request({
      url: 'http://192.168.1.106:3000/answer/',
      data: {

      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        let data = res.data;
        console.log("data==========");
        console.log(data);
        that.setData({
          data: data

        })

      }
    })
  },
  vote: function (options) {
    let that = this;
    let vote = options.target.dataset.vote;
    let answerId = options.target.dataset.answerid;
    console.log(options);
    let add = 0;
    let like = options.target.dataset.votestatue;
    console.log(like);
    if (like == "like") {
      like = "";
      vote = vote - 1;
      add = 0;
    }
    else {
      like = "like";
      vote = vote + 1;
      add = 1;
    }

    wx.request({
      url: "http://localhost:3000/avote",
      data: {
        vote: vote,
        answerId: answerId,      
        userId: 1,
        add: add
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        var data = res.data;
        if (res.data) {
          that.setData({
            data: data
          })
        }
      }
    })




  },
  answer: function (options) {   
    questionId = options.target.dataset.questionid;
    console.log("questionId=" + questionId);
    answerId = 0;
    this.setData({
      bottom: "bhide",
      chat: "cshow",
      focus: "1"
    })

  },
  replay: function (options) {
    answerId = options.target.dataset.answerid;
    questionId = options.target.dataset.questionid;
    console.log(options);
    console.log("answerId=" + answerId);
    this.setData({
      bottom: "bhide",
      chat: "cshow",
      focus: "1"

    })

  },

  send: function (e) {
    console.log("questionId=" + questionId);
    var comment = e.detail.value.comment;
    var that = this;
    wx.request({
      url: 'http://192.168.1.106:3000/areplay',
      data: {
        pid: answerId,
        questionId: questionId,       
        note: comment
      },
      success: function (res) {
        var data = res.data;
        if (data) {
          that.setData({
            data: data,
            bottom: "",
            chat: ""
          })
        }
      }
    })
  },
  reset: function (options) {
    this.setData({
      bottom: "",
      chat: ""

    })
  },
  comment: function (options) {
    console.log("questionId=" + questionId);
    questionId = 0;
    this.setData({
      bottom: "bhide",
      chat: "cshow",
      focus: "1"
    })
  },
  story: function (e) {
    console.log(e);
    let storyId = e.target.dataset.storyId;
    wx.navigateTo({
      url: '../../pages/story/story'
    })
  }

})