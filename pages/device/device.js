//index.js
const { $Toast } = require('../../dist/base/index');
const app = getApp();
var sw = app.globalData.screenWidth - 50; //屏幕宽度
Page({
  data: {
    x: sw,
    y: 10,
    listarr: [],/*设备数据列表*/
  },
  /*删除事件*/
  ondel: function (event) {
    var deviceId = event.currentTarget.dataset.deviceid;
    wx.request({
      url: `http://${app.globalData.cjdevice}deviceDistribution/deleteDeviceFromUser`,
      data: {
        currentLoginName: Object.keys(this.token)[0],
        token: Object.values(this.token)[0],
        deviceId: deviceId,
        userId: this.userId
      },
      success: function (result) {
        $Toast({
          content: result.data,
          type: 'success',
          duration: 2
        });
      },
      fail: function ({
        errMsg
      }) {
        console.log('request fail', errMsg)
      }
    })
  },
  /*判断是不是json字符串*/
  isjson: function (str) {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  },
  /*生命周期函数--监听页面加载*/
  onLoad: function () {
    this.userId = wx.getStorageSync('userId');
    this.token = wx.getStorageSync('token');
    //创建webSocket连接
    if (app.globalData.cjdevice){
    var webSocketa = wx.connectSocket({
      url: `ws://${app.globalData.cjdevice}deviceData-websocket`,
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success() {
      },
      fail() {
      }
    });
    
    //监听WebSocket 连接打开事件
    webSocketa.onOpen((res) => {
      //连接发送数据
      webSocketa.send({
        data: JSON.stringify(this.userId),
      })
      //监听接受到服务器的消息事件
      webSocketa.onMessage((res) => {
        if (this.isjson(res.data)) {
          var newlist = JSON.parse(res.data);
          this.setData({
            listarr: newlist
          })
          console.log(this.data.listarr);
        }
      })
    })
    }
  },
  onUnload: function () {
    
  },
})