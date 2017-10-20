let storyId=1;
let commentId=0;
Page({
  data:{
    data:[],
    focus:"1",

    userName: "",
    storyName: "",
    img:"",
    storyId:1,
    over:"",
    like:"",

bottom:"",
chat:""
  },
  onLoad: function (options){
    // storyId=options.story.storyId;
    let userName = options.userName;
    let storyName = options.storyName;
    storyId = options.storyId;
    let img = options.img;
    let over = options.over;
    console.log(options);
    let that=this;
    wx.request({
      url: 'http://192.168.1.106:3000/comment/',
      data:{
        storyId: storyId
      },
      header:{
        "content-type":"application/json"
      },
      success:function(res){
        let data=res.data;
        console.log("data===============");
        console.log(data);
        that.setData({
          data:data,
          userName: userName,
          storyName: storyName,
          storyId: storyId,
          img:img,
          over:over

        })

      }
    })

  },
  vote:function(options){
    let that=this;
    let vote=options.target.dataset.vote;
    let commentId = options.target.dataset.commentid;
    console.log(options);
    let add=0;
    let like = options.target.dataset.votestatue;
    console.log(like);
    if(like=="like"){
      like="";
      vote=vote-1;
      add=0;
    }
    else{
      like="like";
      vote = vote + 1;
      add=1;
    }

    wx.request({
      url: "http://localhost:3000/cvote",
      data: {
        vote: vote,
        commentId: commentId,
        storyId: storyId,
        userId: 1,
        add: add
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        var data=res.data;
        if (res.data) {
          that.setData({
           data:data
          })
        }
      }
    })




  },
  replay:function(options){
    commentId=options.target.dataset.commentid;
    console.log(options);
    console.log("commentId=" + commentId);
    this.setData({
      bottom:"bhide",
      chat:"cshow",
      focus:"1"

    })

  },
 
  send:function(e){
    console.log("commentId="+commentId);
    var comment = e.detail.value.comment;
    var that=this;
    wx.request({
      url: 'http://192.168.1.106:3000/replay',
      data: {
        pid: commentId,
        storyId: 1,
        comment: comment
      },
      success:function(res){
        var data = res.data;
        if (data){
          that.setData({ 
            data:data,           
            bottom: "",
            chat: ""
          })
        }
      }
    })
  },
  reset:function(options){
    this.setData({
      bottom: "",
      chat: ""

    })
  },
  comment:function(options){
    console.log("commentId=" + commentId);
    commentId = 0;  
    this.setData({
      bottom: "bhide",
      chat: "cshow",
      focus: "1"
    })
  }

})