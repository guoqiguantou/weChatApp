// pages/login/login.js
const { $Message } = require('../../dist/base/index');
function WebSocketTest() {
  // 打开一个 web socket
  ws = new WebSocket("ws://192.168.3.203:9092/deviceData-websocket");

  ws.onopen = function () {
    // Web Socket 已连接上，使用 send() 方法发送数据
    ws.send("发送数据");
    console.log("数据发送中...");
  };

  ws.onmessage = function (evt) {
    var received_msg = evt.data;
    console.log(received_msg)
    console.log("数据已接收...");
  };

  ws.onclose = function () {
    // 关闭 websocket
    console.log("连接已关闭...");
  };

  ws.onerror = function (evt) {
    // 关闭 websocket
    console.log(evt.data);
  };

}
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
    // wx.navigateTo({
    //   url: '../register/register'
    // })
    //WebSocketTest();

    // wx.connectSocket({
    //   url: 'wss://192.168.3.203:9092/deviceData-websocket',
    //   data: {
    //     x: '',
    //     y: ''
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   protocols: ['protocol1'],
    //   method: "GET"
    // })
  },
  handleClick:function(){
    if(this.data.formdata.name==''){
      $Message({
        content: '登录名不能为空',
        type: 'warning',
        duration:1
      });
    } else if (this.data.formdata.password==''){
      $Message({
        content: '密码不能为空',
        type: 'warning',
        duration: 1
      });
    }else{
      wx.switchTab({
        url: '../device/device'
      })
    }
    
    
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