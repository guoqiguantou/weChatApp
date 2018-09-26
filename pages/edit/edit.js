// pages/detail/detail.js
const { $Toast } = require('../../dist/base/index');
const { $Message } = require('../../dist/base/index');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listarr:[],
    formdata: {
      deviceCode: '',/*设备编码*/
      deviceName: '',/*设备名称*/
      position: '',/*安装位置*/
      unit: '',/*单位*/
      upperLimit: '',/*测量上限*/
      lowerLimit: '',/*测量下限*/
      remark: '',/*备注*/
      deviceId: ''/*设备id*/
    }
  },
  handleClick: function () {
    console.log(this.data.formdata);
    if (this.data.formdata.value2==''){
      $Message({
        content: '设备名称不可以为空',
        type: 'warning'
      });
    } else if (this.data.formdata.value3 == ''){
      $Message({
        content: '安装地点不可以为空',
        type: 'warning'
      });
    } else if (this.data.formdata.value7 == '') {
      $Message({
        content: '备注信息不可以为空',
        type: 'warning'
      });
    }else{
      $Toast({
        content: '编辑成功',
        type: 'success'
      });
    }
    

  },
  inputchange: function (event) {
    var detail = event.detail.detail;
    var name = event.currentTarget.dataset.name;
    this.setData({
      ['formdata.' + name]: detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.setData({
    //   deviceId: options.deviceId
    // })
    this.userId = wx.getStorageSync('userId');
    this.token = wx.getStorageSync('token');
    //192.168.3.89:8888/device/findDeviceById?deviceID=
    wx.request({
      url: `http://192.168.3.89:8888/device/findDeviceById`,
      data: {
        deviceID: options.deviceId
      },
      success: function (result) {
        console.log(result.data);
        // $Toast({
        //   content: result.data,
        //   type: 'success',
        //   duration: 2
        // });
      },
      fail: function ({
        errMsg
      }) {
        console.log('request fail', errMsg)
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})