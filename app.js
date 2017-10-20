//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({      
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log("res==========");
        console.log(res);

        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://api.weixin.qq.com/sns/jscode2session',
            data:{
              appid:"wxd084961615f6cf72",
              secret:"a3f0c4053b216c7dd29fe2ca1cba6663",
              js_code:res.code,
              grant_type:"authorization_code"
            },
           success:res=>{
             console.log("res==========");
             console.log(res); 
             this.globalData.openid = res.data.openid;
             this.globalData.sessionkey = res.data.session_key;
            
           }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
  
    // 获取用户信息
    wx.getSetting({
      success: res => {
      
        wx.getUserInfo({
          success: res => {
            // 可以将 res 发送给后台解码出 unionId
            this.globalData.userInfo = res.userInfo
            console.log(this.globalData);
            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
            // 所以此处加入 callback 以防止这种情况
            if (this.userInfoReadyCallback) {
              this.userInfoReadyCallback(res)
            }
          }
        })
       
      }
    })
  },
  globalData: {
    userInfo: null,
    openid:"",
    sessionkey:""
  }
})