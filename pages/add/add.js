// pages/add/add.js
const { $Toast } = require('../../dist/base/index');
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
    },
    value2: '',
    value3: '',
    value4: '',
    value5: '',
    value6: '',
    value7: '',
    islink: false,
  },
  scanCode: function () {
    var that = this
    wx.scanCode({
      success: function (res) {
        var str = res.result;
        var newarr = JSON.parse(str);
        that.setData({
          value1: newarr.value1,
          value2: newarr.value2,
          value3: newarr.value3,
          value4: newarr.value4,
          value5: newarr.value5,
          value6: newarr.value6,
          value7: newarr.value7,
        })
      },
      fail: function (res) {
      }
    })
  },
  onChange(event) {
    const detail = event.detail;
    // this.setData({
    //   ['formdata[' + event.detail.name + '].checked']: detail.checked
    //  })

  },
  handleClick: function () {
    // if (this.data.value1==''){
    //   $Toast({
    //     content: '设备编码不能为空',
    //     type: 'error',
    //     duration: 1
    //   });
    // } else if(this.data.value2 == ''){
    //   $Toast({
    //     content: '设备名称不能为空',
    //     type: 'error',
    //     duration: 1
    //   });
    // } else if (this.data.value3 == '') {
    //   $Toast({
    //     content: '安装地点不能为空',
    //     type: 'error',
    //     duration: 1
    //   });
    // } else if (this.data.value7 == '') {
    //   $Toast({
    //     content: '备注信息不能为空',
    //     type: 'error',
    //     duration: 1
    //   });
    // }else{
    //   this.setData({
    //     islink:true
    //   })
    // }
    console.log(this.data);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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