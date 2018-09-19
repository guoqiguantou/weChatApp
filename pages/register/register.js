// pages/register/register.js
const {
  $Message
} = require('../../dist/base/index');
const {
  $Toast
} = require('../../dist/base/index');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [{
        name: '男',
        value: '1'
      },
      {
        name: '女',
        value: '0'
      },
    ],
    isphone: false,
    isemail:false,
    formdata: {
      loginname: '',
      password: '',
      name: '',
      phone: '',
      email: '',
      sex: 0
    }
  },
  radioChange: function(e) {
    this.setData({
      'formdata.sex': e.detail.value
    })
  },
  inputchange: function(event) {
    var detail = event.detail.detail;
    var name = event.currentTarget.dataset.name;
    this.setData({
      ['formdata.' + name]: detail.value
    })
  },
  phonefunc: function(event) {
    var detail = event.detail.detail;
    var pattern = /^((0\d{2,3}-\d{7,8})|(1[3584]\d{9}))$/;
    if (!pattern.test(detail.value)) {
      this.setData({
        isphone: false
      })
      $Message({
        content: '手机号格式错误',
        type: 'warning',
        duration: 1
      });
    } else {
      this.setData({
        isphone: true
      })
    }
  },
  emailfunc: function (event){
    var detail = event.detail.detail;
    var pattern = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/;
    if (!pattern.test(detail.value)) {
      this.setData({
        isemail: false
      })
      $Message({
        content: '邮箱格式错误',
        type: 'warning',
        duration: 1
      });
    } else {
      this.setData({
        isemail: true
      })
    }
  },
  handleClick: function() {
    //点击注册
    console.log(this.data.formdata);
    if (this.data.formdata.loginname == '') {
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
    } else if (this.data.formdata.name == '') {
      $Message({
        content: '姓名不能为空',
        type: 'warning',
        duration: 1
      });
    } else if (this.data.formdata.phone == '') {
      $Message({
        content: '手机号不能为空',
        type: 'warning',
        duration: 1
      });
    } else if (!this.data.isphone) {
      $Message({
        content: '手机号格式错误',
        type: 'warning',
        duration: 1
      });
    } else if (this.data.formdata.email == '') {
      $Message({
        content: '邮箱不能为空',
        type: 'warning',
        duration: 1
      });
    } else if (!this.data.isemail) {
      $Message({
        content: '邮箱格式错误',
        type: 'warning',
        duration: 1
      });
    } else {
       $Toast({
          content: '注册中',
          type: 'loading',
          duration: 1
        });
      
      // setTimeout(() => {
      //   $Toast.hide();
      //   wx.navigateTo({
      //     url: '../login/login'
      //   })
      // }, 2000);
    }

  },
  backlogin: function() {
    //返回登录页面
    wx.navigateTo({
      url: '../login/login'
    })
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