
Page({
  data:{
    collect:[]

  },
  onLoad:function(options){
    var that=this;
    var userId=1;
    wx.request({
      url: 'http://192.168.1.106:3000/myCollect',
      data:{
        userId: userId
      },
      head:{
        "content-type":"application/json"
      },
      success:function(res){
        let collect=res.data;
        console.log(res.data);
        that.setData({
          collect:collect
        })
      }
    })
  }
})