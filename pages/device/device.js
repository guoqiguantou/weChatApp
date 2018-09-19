//index.js
//获取应用实例
const app = getApp();
const { $Toast } = require('../../dist/base/index');
var sw = app.globalData.screenWidth -50;
Page({
  data: {
    x: sw,
    y:10
  },
  ondel:function(){
    $Toast({
      content: '加载中',
      type: 'loading',
      duration:1
    });
  },
  onLoad: function () {
    
  }
})
