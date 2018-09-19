// pages/detail/detail.js
const { $Toast } = require('../../dist/base/index');
const { $Message } = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    formdata: {
      value1: 'smp180820289',
      value2: '设备A',
      value3: '华南',
      value4: 'cm',
      value5: '3000.000',
      value6: '0.000',
      value7: '余生都是你',
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