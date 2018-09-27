const {
  $Toast
} = require('../../dist/base/index');
const {
  $Message
} = require('../../dist/base/index');
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listarr: [],
    formdata: {
      deviceCode: '',
      /*设备编码*/
      deviceName: '',
      /*设备名称*/
      position: '',
      /*安装位置*/
      unit: '',
      /*单位*/
      upperLimit: '',
      /*测量上限*/
      lowerLimit: '',
      /*测量下限*/
      remark: '',
      /*备注*/
      deviceId: '' /*设备id*/
    }
  },
  handleClick: function () {
    if (this.data.formdata.deviceName == '') {
      $Message({
        content: '设备名称不可以为空',
        type: 'warning'
      });
    } else if (this.data.formdata.position == '') {
      $Message({
        content: '安装地点不可以为空',
        type: 'warning'
      });
    } else if (this.data.formdata.remark == '') {
      $Message({
        content: '备注信息不可以为空',
        type: 'warning'
      });
    } else {
      wx.request({
        url: `http://${app.globalData.cjdevice}deviceDistribution/updatemydevice`,
        data: {
          currentLoginName: Object.keys(this.token)[0],
          token: Object.values(this.token)[0],
          deviceName: this.data.formdata.deviceName,
          position: this.data.formdata.position,
          remark: this.data.formdata.remark,
          deviceId: this.deviceId,
          userId: this.userId,
        },
        success: (result) => {
          console.log(result.data == 'true');
          if (result.data.toString() == 'true') {
            $Toast({
              content: '编辑成功',
              type: 'success',
              duration: 2
            });
            this.timeout=setTimeout(function () {
              wx.switchTab({
                url: '../device/device'
              })
            }, 2000);
          }
        },
        fail: function ({
          errMsg
        }) {
          console.log('request fail', errMsg)
        }
      })

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
    this.userId = wx.getStorageSync('userId');
    this.token = wx.getStorageSync('token');
    this.deviceId = options.deviceId;
    wx.request({
      url: `http://192.168.3.89:8887/device/findDeviceById`,
      data: {
        deviceID: this.deviceId
      },
      success: (result) => {
        this.setData({
          'formdata.deviceCode': result.data.deviceCode,
          'formdata.unit': result.data.unit,
          'formdata.upperLimit': result.data.upperLimit,
          'formdata.lowerLimit': result.data.lowerLimit,
          'formdata.deviceName': result.data.deviceName,
          'formdata.position': result.data.position,
          'formdata.remark': result.data.remark
        })

        console.log(result.data);

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
    clearTimeout(this.timeout)
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