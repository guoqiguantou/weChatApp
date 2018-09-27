// pages/add/add.js
const { $Toast } = require('../../dist/base/index');
const { $Message } = require('../../dist/base/index');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  /*扫一扫*/
  scanCode: function () {
    wx.scanCode({
      success:(res)=>{
        let str = res.result;
        let newarr = JSON.parse(str);
        console.log(newarr);
        // that.setData({
        //   formdata: newarr
        // })
      },
      fail:(res)=>{
        consle.log(res);
      }
    })
  },
  inputchange: function (event) {
    //smp180820289
    let detail = event.detail.detail;
    let name = event.currentTarget.dataset.name;
    this.setData({
      ['formdata.' + name]: detail.value
    })
  },
  /*获取其他属性*/
  inputblur: function (event) {
    let values = event.detail.detail.value;
    wx.request({
      url: `http://${app.globalData.cjdevice}deviceDistribution/findDeviceByCode`,
      data: {
        currentLoginName: Object.keys(this.token)[0],
        token: Object.values(this.token)[0],
        deviceCode: values,
      },
      success: (result) => {
        console.log('获取其他属性', result.data);
        if (typeof (result.data) == 'object') {
          this.setData({
            ['formdata.unit']: result.data.unit,
            ['formdata.upperLimit']: result.data.upperLimit,
            ['formdata.lowerLimit']: result.data.lowerLimit,
            ['formdata.deviceId']: result.data.deviceId
          })
        } else {
          $Toast({
            content: result.data,
            type: 'warning'
          });
        }
      },
      fail: function ({errMsg}) {
        console.log('request fail', errMsg)
      }
    })
  },
  /*点击添加*/
  handleClick: function () {
    if (this.data.formdata.deviceCode == '') {
      $Message({
        content: '设备编码不能为空',
        type: 'warning'
      });
    } else if (this.data.formdata.deviceName == '') {
      $Message({
        content: '设备名称不能为空',
        type: 'warning'
      });
    } else if (this.data.formdata.position == '') {
      $Message({
        content: '安装地点不能为空',
        type: 'warning'
      });
    } else if (this.data.formdata.remark == '') {
      $Message({
        content: '备注信息不能为空',
        type: 'warning'
      });
    } else {
      var sformdata = this.data.formdata;
      wx.request({
        url: `http://${app.globalData.cjdevice}deviceDistribution/addDeviceTooUser`,
        data: {
          currentLoginName: Object.keys(this.token)[0],
          token: Object.values(this.token)[0],
          userId: this.userId,
          deviceName: sformdata.deviceName,
          position: sformdata.position,
          remark: sformdata.remark,
          deviceId: sformdata.deviceId
        },
        success: (result) => {
          console.log('添加', result.data);
          if (result.data === true) {
            $Toast({
              content: '添加成功',
              type: 'success',
              duration: 1
            });
            this.timeout=setTimeout(function () {
              wx.switchTab({
                url: '../device/device'
              })
            }, 1000)
          } else {
            $Toast({
              content: result.data,
              type: 'warning'
            });
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
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.userId = wx.getStorageSync('userId');
    this.token = wx.getStorageSync('token');
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  onUnload: function () {
    clearTimeout(this.timeout)
  },

})