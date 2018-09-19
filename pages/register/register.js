// pages/register/register.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '男', value: '1' },
      { name: '女', value: '0'},
    ],
    formdata:{
      loginname: '',
      name: '',
      password: '',
      phone: '',
      email: '',
      sex:0
    }
  },
  radioChange: function (e) {
    this.setData({
      'formdata.sex': e.detail.value
    })
  },
  handleClick:function(){
    //点击注册
    console.log(this.data.formdata);
  },
  backlogin:function(){
    //返回登录页面
    wx.navigateTo({
      url: '../login/login'
    })
  },
  inputchange:function(event){
    var detail = event.detail.detail;
    var name = event.currentTarget.dataset.name;
    this.setData({
      ['formdata.'+name]:detail.value
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