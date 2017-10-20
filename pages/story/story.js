
let storyId=0;
let storyName="";
let img="";
let scrollTop=0;
let nchapter = 1;
Page({
  data:{
    //图标状态
    icon: [["fa-heart-o", "#999"], ["fa-star-o", "#999"], ["fa-comment-o", "#999"]],
     //对话记录
    dialog: [{ "kind": "c" }, { "kind": "l" }, { "kind": "r" }],

    storyId:0,
    userName:"",
    storyName:"",
    img:"",
    over:"",

  
   //
  
    
    //点赞数量
    vote:0,
    //当前点赞状态
    voteStatue:0,
    //收藏数量
    collect:0,
    //当前收藏状态
    collectStatue:0,
    //总章节   
    chapter:"",
    //当前阅读章节
    chapterStatue:0,
    //评论数
    comment:0,
    //问题数
    question:0,
    //章节隐藏
    chide:"hide"


  },
  onLoad: function (options) {
    // Do some initialize when page load.
    console.log(options);
    var that=this;
    storyId=options.storyId;
    console.log(storyId);
    let chapter=1;
    wx.request({
      url: 'http://192.168.1.106:3000/story/', //仅为示例，并非真实的接口地址
      method:"get",
      data: {
        storyId: storyId,
        chapter:chapter      
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        let dialog=res.data.result;
        console.log("dialog.length============");
        console.log(dialog.length);
        let vote = res.data.story.vote;
        let collect = res.data.story.collect;
        let chapter = res.data.story.chapter;
        let comment = res.data.story.comment;
        let question = res.data.story.question;
        img = res.data.story.img;
        let userName = res.data.story.userName;
       storyName = res.data.story.storyName;
        let over = res.data.story.over;
        let voteStatue = res.data.voteStatue;
        let collectStatue=res.data.collectStatue;
        let icon = that.data.icon;
        if (voteStatue==1){
          icon[0][0] = "fa-heart";
          icon[0][1] = "#FA3715";
        }
        if (collectStatue){
          icon[1][0] = "fa-star";
          icon[1][1] = "#FA3715";
        }
        that.setData({
          icon: icon,
          storyId: storyId,
          userName: userName,
          storyName: storyName,
          img:img,
          over: over,
          dialog: dialog,
          vote: vote,
          collect: collect,
          chapter: chapter,
          comment: comment,
          question: question,
          voteStatue: voteStatue,
          collectStatue: collectStatue
        })

      }
    })
  },


  vote:function(e){
    let icon=this.data.icon;
    let vote=this.data.vote;
    let voteStatue = this.data.voteStatue;
    let that=this;
    let add=1;
    if (icon[0][0] =="fa-heart-o"){
      icon[0][0] = "fa-heart";
      icon[0][1] ="#FA3715";
    }
    else{
      icon[0][0] = "fa-heart-o";
      icon[0][1] = "#999";
    }
    if (voteStatue==1){
       vote=vote-1;
       add=0;
       voteStatue=0;
    }
    else{
      vote=vote+1;
      add = 1;
      voteStatue = 1;
    }
    
    wx.request({
      url:"http://localhost:3000/vote",
      data:{
        vote:vote,
        storyId: storyId,
        userId:1,
        add:add
      },
      header:{
       "content-type":"application/json"
      },
      success:function(res){
        if(res.data.statue){
          that.setData({
            icon: icon,
            vote: vote,
            voteStatue: voteStatue
          })
        }       
      }
    })
  },

  collect: function (e) {
    let icon = this.data.icon;
    let collect = this.data.collect;
    let collectStatue = this.data.collectStatue;
    let that = this;
    let add = 1;
    if (icon[1][0] == "fa-star-o") {
      icon[1][0] = "fa-star";
      icon[1][1] = "#FA3715";
    }
    else {
      icon[1][0] = "fa-star-o";
      icon[1][1] = "#999";
    }

    if (collectStatue == 1) {
      collect = collect - 1;
      add = 0;
      collectStatue = 0;
    }
    else {
      collect = collect + 1;
      add = 1;
     collectStatue = 1;
    }


    wx.request({
      url: "http://localhost:3000/collect",
      data: {
        collect: collect,
        storyId: storyId,
        userId: 1,
        add: add
      },
      header: {
        "content-type": "application/json"
      },
      success: function (res) {
        if (res.data.statue) {
          that.setData({
            icon: icon,
            collect: collect,
            collectStatue: collectStatue
          })
        }
      }
    })

  },

  chat: function (e) {
   

  },
  chapter: function (e) {
    var chide=this.data.chide;
    if(chide==""){
      this.setData({
        chide: "hide"
      })
    }
    else{
      this.setData({
        chide: ""
      })
    }
    console.log("onunload=============");
    console.log(this.data);
  },
  close: function (e) {
    this.setData({
      chide:"hide"
    })
  },

  loadDialog:function(e){

  },

  toChapter:function(e){
    var that = this;  
    let chapter=e.target.dataset.chapter;
    console.log(e);

    wx.request({
      url: 'http://192.168.1.106:3000/chapter/', //仅为示例，并非真实的接口地址
      method: "get",
      data: {
        storyId: 1,
        chapter:chapter
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        let dialog = res.data.result;
      
        that.setData({        
          dialog: dialog
         
        })

      }
    })
  },
   onUnload: function () {
    // Do something when page close.
     console.log("onunload=============");
     console.log(this.data);
     let nowRead = [];
     wx.getStorage({
       key: 'nowRead',
       success: function (res) {
         console.log(res.data);
         nowRead = res.data || [];
       }
     });
     let story = {
       "id": storyId,
       "storyName": storyName,
       "img": img,
       "nchapter": nchapter,
       "scrollTop": scrollTop
     }
     nowRead.unshift(story);
     console.log(nowRead);
     console.log(story);
     wx.setStorage({
       key: 'nowRead',
       data: nowRead
     })
     wx.getStorage({
       key: 'nowRead',
       success: function (res) {
         console.log(res.data);
         console.log("nowRead=============");
         console.log(nowRead);
       }
     });
     
  },
   onPageScroll: function (e) {
     // Do something when page scroll
     scrollTop=e.scrollTop;
     console.log("onscroll===========");
     console.log(e);
   },
   onReady: function (e) {
     // Do something when page ready.
     console.log("onready===========");
     console.log(e);
   },
   onShow: function (e) {
     // Do something when page show.
     console.log("onshow============");
     console.log(e);
   },
})