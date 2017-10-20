Page({
  data:{
    //图标状态
    icon: [["fa-heart-o", "#999"], ["fa-star-o", "#999"], ["fa-comment-o", "#999"]],
   
  
  //章节隐藏
    storyId: 0,
    userName: "",
    storyName: "",
    img: "",
    over: "",
    desc:"",


    //


    //点赞数量
    vote: 0,
    //当前点赞状态
    voteStatue: 0,
    //收藏数量
    collect: 0,
    //当前收藏状态
    collectStatue: 0,
    //总章节   
    chapter: "",
    //当前阅读章节
    chapterStatue: 0,
    //评论数
    comment: 0,
    //问题数
    question: 0,
    //章节隐藏
    chide: "hide"
  },
  onLoad: function (options){
    var that = this;
    let storyId = 1;
    console.log(options);
    let chapter = 1;
    wx.request({
      url: 'http://192.168.1.106:3000/artical/', //仅为示例，并非真实的接口地址
      method: "get",
      data: {
        storyId: storyId        
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);      
        let vote = res.data.story.vote;
        let collect = res.data.story.collect;
        let chapter = res.data.story.chapter;
        let comment = res.data.story.comment;
        let question = res.data.story.question;
        let desc = res.data.story.desc;
        let img = res.data.story.img;
        let userName = res.data.story.userName;
        let storyName = res.data.story.storyName;
        let over = res.data.story.over;
        let voteStatue = res.data.voteStatue;
        let collectStatue = res.data.collectStatue;
        let icon = that.data.icon;
        if (voteStatue == 1) {
          icon[0][0] = "fa-heart";
          icon[0][1] = "#FA3715";
        }
        if (collectStatue) {
          icon[1][0] = "fa-star";
          icon[1][1] = "#FA3715";
        }
        that.setData({
          icon: icon,
          storyId: storyId,
          userName: userName,
          storyName: storyName,
          desc: desc,
          img: img,             
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
    
    let vote=this.data.vote;
    console.log(vote);
    if (vote[0] =="fa-heart-o"){
      vote[0] = "fa-heart";
      vote[1] ="#FA3715";
    }
    else{
      vote[0] = "fa-heart-o";
      vote[1] ="#999";
    }    
    this.setData({
      vote: vote
    })
  },
  collect:function(e){
    let collect = this.data.collect;
    console.log(collect);
    if (collect[0] == "fa-star-o") {
      collect[0] = "fa-star";
      collect[1] = "#FA3715";
    }
    else {
      collect[0] = "fa-star-o";
      collect[1] = "#999";
    }
    this.setData({
      collect: collect
    })
  },
  read:function(e){

  },
  comment:function(e){

  },
  chapter: function (e) {
    this.setData({
      chide: ""
    })
  },
  toChapter:function(e){
    this.setData({
      chide: ""
    })
  },
  close:function(e){
    this.setData({
      chide:"hide"
    })

  }
})