// pages/add/add.js
const {$Toast} = require('../../dist/base/index');
const {$Message} = require('../../dist/base/index');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata: {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
    }
  },
  scanCode: function() {
    var that = this
    wx.scanCode({
      success: function(res) {
        var str = res.result;
        var newarr = JSON.parse(str);
        that.setData({
          formdata: newarr
        })
      },
      fail: function(res) {}
    })
  },
  inputchange: function(event) {
    var detail = event.detail.detail;
    var name = event.currentTarget.dataset.name;
    this.setData({
      ['formdata.' + name]: detail.value
    })
  },
  getuserid: function(event) {
    var values = event.detail.detail.value;
    console.log(values);
    //http://192.168.3.203:9092/deviceDistribution/findDeviceByCode

    wx.request({
      url: `http://${app.globalData.cjsystem}deviceDistribution/findDeviceByCode`,
      data: {
        deviceCode: values
      },
      success: function(result) {
        console.log('request success', result.data)
        
      },

      fail: function({
        errMsg
      }) {
        console.log('request fail', errMsg)
      }
    })

  },
  handleClick: function() {
    console.log(this.data.formdata);
    if (this.data.formdata.value1 == '') {
      $Message({
        content: '设备编码不能为空',
        type: 'warning'
      });
    } else if (this.data.formdata.value2 == '') {
      $Message({
        content: '设备名称不能为空',
        type: 'warning'
      });
    } else if (this.data.formdata.value3 == '') {
      $Message({
        content: '安装地点不能为空',
        type: 'warning'
      });
    } else if (this.data.formdata.value7 == '') {
      $Message({
        content: '备注信息不能为空',
        type: 'warning'
      });
    } else {
      // $Toast({
      //   content: '添加成功',
      //   type: 'success'
      // });
      // wx.switchTab({
      //   url: '../device/device'
      // })

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