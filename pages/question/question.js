let storyId = 1;

let answerId = 0;
let questionId = 0;
Page({
  data: {
    data: [],
    focus: "1",
    storyId:0,
    userName: "",
    storyName: "",
    over: "",
    like: "",

    bottom: "",
    achat: "",
    qchat: ""
  },
  onLoad: function (options) {
    // storyId=options.story.storyId;
    let userName = options.userName;
    let storyName = options.storyName;
    let over = options.over;
     storyId = options.storyId;
    console.log(options);
    let that = this;
    wx.request({
      url: 'http://192.168.1.106:3000/story/answer/',
      data: {
        storyId: storyId
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        let data = res.data;
        console.log("data==========");
        console.log(data);
        that.setData({
          data: data,
          userName: userName,
          storyName: storyName,
          over: over,
          storyId: storyId

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
      url: "http://localhost:3000/story/avote",
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
      achat: "cshow",
      qchat: "",
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
      achat: "cshow",
      qchat: "",
      focus: "1"

    })

  },

  sendAnswer: function (e) {
    console.log("questionId=" + questionId);
    var comment = e.detail.value.comment;
    var that = this;
    wx.request({
      url: 'http://192.168.1.106:3000/story/areplay',
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
            achat: "",
            qchat: ""
          })
        }
      }
    })
  },
  sendQuestion: function (e) {
  
    var comment = e.detail.value.comment;
    var that = this;
    wx.request({
      url: 'http://192.168.1.106:3000/story/question',
      data: {
        storyId: storyId,       
        note: comment
      },
      success: function (res) {
        var data = res.data;
        if (data) {
          that.setData({
            data: data,
            bottom: "",
            achat: "",
            qchat: ""
          })
        }
      }
    })
  },

  reset: function (options) {
    this.setData({
      bottom: "",
      achat: "",
      qchat: ""
    })
  },
  comment: function (options) {
    this.setData({
      bottom: "bhide",
      qchat: "cshow",
      achat: "",
      focus: "1"
    })
  }

})