Page({
  data: {
    scrollH: 0,
    imgWidth: 0,
    loadingCount: 0,
    images: [],
    imgs:[]    
  },
  onLoad: function () {
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

        this.loadImages();
      }
    })
  },
  onImageLoad: function (e) {

    let imageId = e.currentTarget.id;
    let oImgW = e.detail.width;         //图片原始宽度
    let oImgH = e.detail.height;        //图片原始高度
    let imgWidth = this.data.imgWidth;  //图片设置的宽度
    let scale = imgWidth / oImgW;        //比例计算
    let imgHeight = oImgH * scale;      //自适应高度

    let images = this.data.images;
    let imageObj = [];
    

    for (let i = 0; i < images.length; i++) {
      let img = images[i];
      if (img.id === imageId) {       
        img.height = imgHeight;    
        imageObj = this.data.imgs;  
        imageObj.push(img);
        break;
      }
    }   

    let loadingCount = this.data.loadingCount - 1; 

    let data = {
      loadingCount: loadingCount,
      imgs:imageObj    
    };

    if (!loadingCount) {    
      data.images = [];
    }

    this.setData(data);
  },
  loadImages: function () {
    let images = [
      { pic: "../../img/1.jpg", height: 0, desc:"这样就实现了一个微信小程序下的瀑布流。实际效果可以打开微信，扫描左边二维码，直接体验。或者微信小程序搜索拍照POSE大全。里面附很多美图，各种拍照姿势等你来完善，来补充，欢迎体验并上传自己的小姿势。"},
      { pic: "../../img/2.jpg", height: 0, desc: "这样就实现了一个微信小程序下的瀑布流。实际效果可以打开微信，扫描左边二维码，直接体验。或者微信小程序搜索拍照POSE大全。里面附很多美图，各种拍照姿势等你来完善，来补充，欢迎体验并上传自己的小姿势。" },
      { pic: "../../img/3.jpg", height: 0, desc: "这样就实现了一个微信小程序下的瀑布流。实际效果可以打开微信，扫描左边二维码，直接体验。或者微信小程序搜索拍照POSE大全。里面附很多美图，各种拍照姿势等你来完善，来补充，欢迎体验并上传自己的小姿势。"},
      { pic: "../../img/4.jpg", height: 0, desc: "这样就实现了一个微信小程序下的瀑布流。实际效果可以打开微信，扫描左边二维码，直接体验。或者微信小程序搜索拍照POSE大全。里面附很多美图，各种拍照姿势等你来完善，来补充，欢迎体验并上传自己的小姿势。" },
      { pic: "../../img/5.jpg", height: 0, desc: "这样就实现了一个微信小程序下的瀑布流。实际效果可以打开微信，扫描左边二维码，直接体验。或者微信小程序搜索拍照POSE大全。里面附很多美图，各种拍照姿势等你来完善，来补充，欢迎体验并上传自己的小姿势。"},
      { pic: "../../img/6.jpg", height: 0, desc: "这样就实现了一个微信小程序下的瀑布流。实际效果可以打开微信，扫描左边二维码，直接体验。或者微信小程序搜索拍照POSE大全。里面附很多美图，各种拍照姿势等你来完善，来补充，欢迎体验并上传自己的小姿势。"},
      { pic: "../../img/7.jpg", height: 0, desc: "这样就实现了一个微信小程序下的瀑布流。实际效果可以打开微信，扫描左边二维码，直接体验。或者微信小程序搜索拍照POSE大全。里面附很多美图，各种拍照姿势等你来完善，来补充，欢迎体验并上传自己的小姿势。"},
      { pic: "../../img/8.jpg", height: 0, desc: "这样就实现了一个微信小程序下的瀑布流。实际效果可以打开微信，扫描左边二维码，直接体验。或者微信小程序搜索拍照POSE大全。里面附很多美图，各种拍照姿势等你来完善，来补充，欢迎体验并上传自己的小姿势。"},
      { pic: "../../img/9.jpg", height: 0, desc: "这样就实现了一个微信小程序下的瀑布流。实际效果可以打开微信，扫描左边二维码，直接体验。或者微信小程序搜索拍照POSE大全。里面附很多美图，各种拍照姿势等你来完善，来补充，欢迎体验并上传自己的小姿势。" },
      { pic: "../../img/8.jpg", height: 0, desc: "这样就实现了一个微信小程序下的瀑布流。实际效果可以打开微信，扫描左边二维码，直接体验。或者微信小程序搜索拍照POSE大全。里面附很多美图，各种拍照姿势等你来完善，来补充，欢迎体验并上传自己的小姿势。"},
      { pic: "../../img/9.jpg", height: 0, desc: "这样就实现了一个微信小程序下的瀑布流。实际效果可以打开微信，扫描左边二维码，直接体验。或者微信小程序搜索拍照POSE大全。里面附很多美图，各种拍照姿势等你来完善，来补充，欢迎体验并上传自己的小姿势。"}
    ];

    let baseId = "img-" + (+new Date());

    for (let i = 0; i < images.length; i++) {
      images[i].id = baseId + "-" + i;
    }

    this.setData({     
      images: images
    });
  }
})