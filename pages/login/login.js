// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    switch1: true,
    name:'',
    password:'',
    formdata:{
      switchitem: true,
      name: '',
      password: '',
    }
  },
  onswitchChange:function(event){
    const detail = event.detail;
    this.setData({
      'formdata.switchitem': detail.value
    })
  },
  inputchange: function (event) {
    var detail = event.detail.detail;
    var name = event.currentTarget.dataset.name;
    this.setData({
      ['formdata.' + name]: detail.value
    })
  },
  registerfunc:function(){
    //调转注册页面
    wx.navigateTo({
      url: '../register/register'
    })
  },
  handleClick:function(){
    console.log(this.data.formdata);
    wx.switchTab({
      url: '../device/device'
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