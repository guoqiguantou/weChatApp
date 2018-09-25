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
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //获取屏幕宽度
    wx.getSystemInfo({
      success:res=>{
        this.globalData.screenWidth = res.screenWidth
      }
    })
    //获取网络状态
    wx.getNetworkType({
      success:res=>{
        //console.log(res);
      }
    })
    //获取wifi
    wx.startWifi({
      success: res => {
        //console.log('初始化成功'+res);
        wx.getConnectedWifi({
          success: res => {
            //console.log(res);
          },
          fail: res => {
           // console.log(res);
          }
        })
      },
      fail: res => {
        //console.log('初始化失败' + res);
      }
    })
    //获取网络地址
    wx.request({
      url: 'http://192.168.3.204:8904/getAllServer',
      success:(result)=>{
        //console.log('request success', result.data)
        this.globalData.cjdevice = result.data['cj-device'];
        this.globalData.cjsystem = result.data['cj-system'];
      },

      fail: function ({
        errMsg
      }) {
        console.log('request fail', errMsg)
      }
    })

  },
  globalData: {
    userInfo: null,
    screenWidth:null,
    token:null,
    userId:null,

    cjdevice:null,//设备地址
    cjsystem:null,//系统地址

  }
})