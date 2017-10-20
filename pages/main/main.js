let col1H = 0;
let col2H = 0;
let tag=1;
let nowkind="热门";
let loadingCount= 0;
let totalPage=0;//总页数
const app=getApp();


Page({

  data: {
    userInfo:{},
    scrollH: 0,
    imgWidth: 0,
   
    images: [],
    col1: [],
    col2: [],
    page:1,//当前页
    hide:"hide",
    kind:[], //类别
    nowkind:"热门"  //当前分类
    
  },

  onLoad: function () {
    var that=this;
    let userinfo = app.globalData.userInfo;
    console.log( app.globalData);
    
    if (app.globalData.userInfo){
      let userInfo = app.globalData.userInfo;
      this.setData({
        userInfo: userInfo
      })
       
    }
    else{
      wx.getUserInfo({
        success: res => {
          // 可以将 res 发送给后台解码出 unionId
          app.globalData.userInfo = res.userInfo
          console.log(this.globalData);
          that.setData({
            userInfo: app.globalData.userInfo
          })
        
        }
      })
    }
    
    wx.getSystemInfo({
      success: (res) => {
        let ww = res.windowWidth;
        let wh = res.windowHeight;
        let imgWidth = ww * 0.48;
        let scrollH = wh;

        this.setData({
          scrollH: scrollH,
          imgWidth: imgWidth
        });
        let that = this;
      wx.request({
        url: 'http://192.168.1.106:3000/total/',
        method: "get",
      
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          console.log("res.data.page=========================");
          console.log(res.data.page);
          totalPage = res.data.page;
          that.loadImages();
        }
      })
      }
    })
  },

  onImageLoad: function (e) {
    console.log(e);
    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    console.log(images);   

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.imgid === imageId) {
        let imageObj = img;
        console.log(imageObj);
        imageObj.height = imgHeight;

        loadingCount =loadingCount - 1;
        let col1 = this.data.col1;
        let col2 = this.data.col2;
        console.log(col1H);
        console.log(col2H);
        if (col1H <= col2H) {
          col1H += imgHeight+95;
          col1.push(imageObj);
        } else {
          col2H += imgHeight+95;
          col2.push(imageObj);
        }
        console.log(col1H);
        console.log(col2H);
        let data = {         
          col1: col1,
          col2: col2
        };

        if (!loadingCount) {
          data.images = [];
        
        }      
        this.setData(data);
        break;
      }
    }

  },

  loadImages: function () {   
    console.log("========================");
  let page=this.data.page;
  if (page > totalPage){
    console.log("========================");
    wx.showToast({
      title: '暂无更多新消息！', 
      icon:"loading",   
      duration: 500
    })

  }
  else{
    console.log(tag);
    let images = [];
    let that = this;
    let page = this.data.page;
    wx.request({
      url: 'http://192.168.1.106:3000/main/', //仅为示例，并非真实的接口地址
      method: "get",
      data: {
        userId: 1,
        page: page,
        kind: tag
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res.data);
        images = res.data;
        page=page+1;
        console.log(images);
        let baseId = "img-" + (+new Date());
        for (let i = 0; i < images.length; i++) {
          images[i].imgid = baseId + "-" + i;
        }
        // console.log(images);
        loadingCount = images.length,
          that.setData({
            images: images,
            page:page

          });
      }
    })

  }
   
  },
  assort:function(e){
  
    var that=this;

    wx.request({
      url: 'http://192.168.1.106:3000/kind/', //仅为示例，并非真实的接口地址
      method: "get",
     
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        let hide = "";
        let kind=res.data;
        console.log(kind);
        that.setData({
          hide: hide,
          kind:kind
        })
      }
    })

  },
  close:function(e){
    let hide="hide";
    this.setData({
      hide:hide
    })

  },
  select:function(e){
    console.log(e);
    let hide = "hide";
    tag=e.target.dataset.tagid;
    nowkind = e.target.dataset.tagname;
    col1H=0;
    col2H=0;
    this.setData({     
      col1: [],
      col2:[],
      hide: hide,
      nowkind: nowkind,
      page: 1

    });
    let that = this;
    wx.request({
      url: 'http://192.168.1.106:3000/total/',
      method: "get",

      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log("res.data.page=========================");
        console.log(res.data.page);
        totalPage = res.data.page;
        that.loadImages();
      }
    })
  },
  onPageScroll: function (e) {
    // Do something when page scroll
    scrollTop = e.scrollTop;
    console.log("onscroll===========");
    console.log(e);
  },

})