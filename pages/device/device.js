//index.js
//获取应用实例
//wx6d4cb199cb91ef95
const app = getApp();
const {
  $Toast
} = require('../../dist/base/index');
var sw = app.globalData.screenWidth - 50; //屏幕宽度
Page({
  data: {
    x: sw,
    y: 10,
    listarr: []
  },
  ondel: function(event) {
    var deviceId = event.currentTarget.dataset.deviceid;
    var token = app.globalData.token;
    wx.request({
      url: `http://${app.globalData.cjdevice}deviceDistribution/deleteDeviceFromUser`,
      data: {
        currentLoginName: Object.keys(token)[0],
        token: Object.values(token)[0],
        deviceId: deviceId,
        userId: app.globalData.userId
      },
      success: function(result) {
        console.log('request success', result.data);
        $Toast({
          content: result.data,
          type: 'warning',
          duration: 1
        });
      },

      fail: function({
        errMsg
      }) {
        console.log('request fail', errMsg)
      }
    })

  },
  onLoad: function() {
    var that = this;
    var userId = app.globalData.userId;
    wx.connectSocket({
      url: `ws://${app.globalData.cjdevice}deviceData-websocket`,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success() {
        //console.log('连接成功');
      },
      fail() {
        //console.log('连接失败')
      }
    })
    //监听WebSocket 连接打开事件
    wx.onSocketOpen(function() {
      //连接发送数据
      wx.sendSocketMessage({
        data: JSON.stringify(userId),
      })
      //监听接受到服务器的消息事件
      wx.onSocketMessage(function(res) {

        if (that.isjson(res.data)) {
          var newlist = JSON.parse(res.data);
          that.setData({
            listarr: newlist
          })
        }
        console.log(that.data.listarr);

      })
    })
  },
  isjson: function(str) {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }

      } catch (e) {
        //console.log('error：' + str + '!!!' + e);
        return false;
      }
    }
    //console.log('It is not a string!')
  }
})