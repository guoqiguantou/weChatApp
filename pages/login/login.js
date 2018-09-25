// pages/login/login.js
var util = require('../../utils/md5.js')
const {$Message} = require('../../dist/base/index');
const {$Toast} = require('../../dist/base/index');
var app = getApp();


Page({
  /**
   * 页面的初始数据
   */
  data: {
    formdata: {
      switchitem: true,
      name: 'admin1',
      password: '123456',
    }
  },
  onswitchChange: function(event) {
    const detail = event.detail;
    this.setData({
      'formdata.switchitem': detail.value
    })
  },
  inputchange: function(event) {
    var detail = event.detail.detail;
    var name = event.currentTarget.dataset.name;
    this.setData({
      ['formdata.' + name]: detail.value
    })
  },
  registerfunc: function() {
    //调转注册页面
    wx.navigateTo({
      url: '../register/register'
    })
  },
  handleClick: function() {
    if (this.data.formdata.name == '') {
      $Message({
        content: '登录名不能为空',
        type: 'warning',
        duration: 1
      });
    } else if (this.data.formdata.password == '') {
      $Message({
        content: '密码不能为空',
        type: 'warning',
        duration: 1
      });
    } else {
      var spassword = util.hexMD5(this.data.formdata.password)
      var sname = this.data.formdata.name;
      var sswitch = this.data.formdata.switchitem;
      wx.request({
        url: `http://${app.globalData.cjsystem}userLogin/login`,
        data: {
          loginName: sname,
          passWord: spassword
        },
        success: function(result) {
          console.log('request success', result.data)
          if (result.data.resultCode == '0000') {
            $Toast({
              content: result.data.resultDesc,
              type: 'success',
              duration: 1
            });
            app.globalData.token = result.data.token;
            app.globalData.userId = result.data.data.userId;
            setTimeout(function() {
              wx.switchTab({
                url: '../device/device'
              })
            }, 1000)
          } else {
            $Toast({
              content: result.data.resultDesc,
              type: 'error',
              duration: 1
            });
          }
        },

        fail: function({
          errMsg
        }) {
          console.log('request fail', errMsg)
        }
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})