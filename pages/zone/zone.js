let nowRead={};
const app = getApp();

Page({
  data:{
    nowRead:{},
    collect:{},
    zone:{},
    img:"",
    userName:"",
    userInfo:{}


  },
  onLoad:function(){
    let userInfo = app.globalData.userInfo;
    console.log("userinfo=" + app.globalData);
    
    var that=this;
    wx.getStorage({
      key: 'nowRead',
      success: function (res) {
      console.log(res.data);
       nowRead = res.data[0];
     
      }
    });
    wx.showShareMenu({
      withShareTicket: true
    });
    wx.request({
      url: 'http://192.168.1.106:3000/zone',
      data:{
        userId:1

      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res);
        let data=res.data;
        console.log(res);
        let zone = data.zone;
        let collect = data.collect;
        let img = data.img;
        let userName = data.userName;
        console.log(collect);
        that.setData({
          nowRead:nowRead,
          collect: collect,
          zone:zone,
          img: img,
          userName: userName,
          userInfo: userInfo

        })
       
      }

    })

  },
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '聊聊天',
      path: '/page/main',
      imageUrl:'/img/1.jpg',
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  },
  notice:function(){
    wx.navigateTo({
      url: '/pages/cnotice/cnotice'
    })
  }
})