// pages/my/my.js
const { $Toast } = require('../../dist/base/index');

function inArray(arr, key, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][key] === val) {
      return i;
    }
  }
  return -1;
}

// ArrayBuffer转16进度字符串示例
function ab2hex(buffer) {
  var hexArr = Array.prototype.map.call(
    new Uint8Array(buffer),
    function (bit) {
      return ('00' + bit.toString(16)).slice(-2)
    }
  )
  return hexArr.join('');
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    start: false,//初始化模块
    issearch: false,//搜索设备
    visible: false,//搜索弹框
    visible2: false,//发送消息弹框
    visible3: false,//打开蓝牙弹框
    msg: '',//发送的消息
    devices: [],//设备
    connected: false,//是否连接设备
    chs: [],//连接设备的特性值
    connectId:null,//连接成功设备id
    canWrite:false,//设备是否可以写入
    actions: [
      {
        name: '取消'
      },
      {
        name: '确定',
        color: '#ed3f14'
      }
    ]
  },
  /*初始化状态改变*/
  onChange(event) {
    const detail = event.detail;
    if (event.detail.value){
      //初始化蓝牙模块
      wx.openBluetoothAdapter({
        success: (res) => {
          this.setData({
            'start': detail.value
          })
        },
        fail: (res) => {
          this.setData({
            visible3: true
          });
          if (res.errCode === 10001) { //当前蓝牙适配器不可用
            console.log(11);
            wx.onBluetoothAdapterStateChange(function (res) { //监听蓝牙适配器状态变化事件
              console.log('onBluetoothAdapterStateChange', res)
              if (res.available) {
                //this.startBluetoothDevicesDiscovery()
              }
            })
          }
        }
      })
    }else{
      console.log('关闭蓝牙模块');
      $Toast({
        content: '关闭蓝牙模块'
      });
      wx.closeBluetoothAdapter();
      this.stopsearchfunc();
      this.cancelconnectfunc();
      this.setData({
        'start': detail.value,
        issearch: false,//搜索设备
        visible: false,//搜索弹框
        visible2: false,//发送消息弹框
        visible3: false,//打开蓝牙弹框
        msg: '',//发送的消息
        devices: [],//设备
        connected: false,//是否连接设备
        chs: [],//连接设备的特性值
        connectId: null,//连接成功设备id
        canWrite: false,//设备是否可以写入
      })
    }
    

  },
  /*搜索设备*/
  searchfunc: function () {
    if (this.data.start) {
      this.setData({
        'issearch': true
      })
      this.startBluetoothDevicesDiscovery();
    } else {
      //未初始化蓝牙
      this.setData({
        visible: true
      });
    }
  },
  /*搜索蓝牙设备*/
  startBluetoothDevicesDiscovery() {
    // if (this._discoveryStarted) {
    //   return
    // }
    // this._discoveryStarted = true;
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true, //允许重复上报
      success: (res) => {
        $Toast({
          content: '开始搜索'
        });
        console.log('开始搜索');
        this.onBluetoothDeviceFound();
      },
    })
  },
  /*监听搜索新设备*/
  onBluetoothDeviceFound() {
    $Toast({
      content: '监听搜索新设备'
    });
    console.log('监听搜索新设备');
    wx.onBluetoothDeviceFound((res) => {
      res.devices.forEach(device => {
        if (!device.name && !device.localName) {
          return
        }
        const foundDevices = this.data.devices
        const idx = inArray(foundDevices, 'deviceId', device.deviceId)
        const data = {}
        if (idx === -1) {
          data[`devices[${foundDevices.length}]`] = device
        } else {
          data[`devices[${idx}]`] = device
        }
        this.setData(data);
        console.log(this.data.devices);
        // $Toast({
        //   content: this.data.devices
        // });
      })
    })

  },
  /*停止搜索*/
  stopsearchfunc: function () {
    this.setData({
      'issearch': false
    })
    wx.stopBluetoothDevicesDiscovery();
  },
  /*连接设备*/
  connectfunc: function (e){
    const ds = e.currentTarget.dataset;
    const deviceId = ds.deviceId;
    const name = ds.name;
    $Toast({
      content: '连接中',
      type: 'loading',
      duration: 0,
    });
    this.stopsearchfunc(); //停止搜索设备
    wx.createBLEConnection({
      deviceId,
      success: (res) => {
        this.setData({
          connected: true,//是否连接
          connectId: deviceId//连接设备id
        })
        $Toast.hide();
        console.log('连接蓝牙设备成功');
         $Toast({
           content: '连接蓝牙设备成功'
         });
        this.getBLEDeviceServices(deviceId);
      },
      fail: (res) => {
        console.log(res);
        $Toast({
          content: '连接失败请重新连接'
        });
      }
    })
    
  },
  /*获取蓝牙设备所有 service（服务）*/
  getBLEDeviceServices(deviceId) { 
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        $Toast({
          content: '获取蓝牙设备所有服务成功'
        });
        console.log("服务",res);
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid)
            return
          }
        }
      }
    })
  },
  /*获取蓝牙设备所有 characteristic（特征值）*/
  getBLEDeviceCharacteristics(deviceId, serviceId) {
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('特征值', res.characteristics)
        $Toast({
          content: '获取蓝牙设备特征值成功'
        });

        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i];
          // $Toast({
          //   content: item.properties.write
          // });
          if (item.properties.read) {
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              success:function(res){
                console.log(res);
              }
            })
          }
          if (item.properties.write) {
            this.setData({
              canWrite: true
            })
            this._deviceId = deviceId
            this._serviceId = serviceId
            this._characteristicId = item.uuid
            this.writeBLECharacteristicValue()
          }
          if (item.properties.notify || item.properties.indicate) {
            wx.notifyBLECharacteristicValueChange({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
              state: true,
            })
          }
        }
      },
      fail(res) {
        console.error('getBLEDeviceCharacteristics', res);
        $Toast({
          content: '获取蓝牙设备特征值失败'
        });
      }
    })
    // 操作之前先监听，保证第一时间获取数据==蓝牙设备的特征值变化
    wx.onBLECharacteristicValueChange((characteristic) => {
      const idx = inArray(this.data.chs, 'uuid', characteristic.characteristicId)
      const data = {}
      if (idx === -1) {
        data[`chs[${this.data.chs.length}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      } else {
        data[`chs[${idx}]`] = {
          uuid: characteristic.characteristicId,
          value: ab2hex(characteristic.value)
        }
      }

      this.setData(data)
    })
  },
  /*向蓝牙设备特征值中写入二进制数据*/
  writeBLECharacteristicValue() {
    // 向蓝牙设备发送一个0x00的16进制数据
    let buffer = new ArrayBuffer(1)
    let dataView = new DataView(buffer)
    dataView.setUint8(0, Math.random() * 255 | 0);
    console.log(buffer);
    wx.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._deviceId,
      characteristicId: this._characteristicId,
      value: buffer,
    })
  },
  /*断开连接设备*/
  cancelconnectfunc:function(){
    wx.closeBLEConnection({//断开蓝牙连接
      deviceId: this.data.connectId
    })
    this.setData({
      connected: false,
      chs: [],
      canWrite: false,
      connectId:null
    })
    $Toast({
      content: '断开连接成功'
    });
  },
  /*提示弹框回调*/
  handleClick: function () {
    this.setData({
      visible: false
    });
  },
  /*提示打开手动蓝牙*/
  tipfunc: function () {
    this.setData({
      visible3: false
    });
  },
  /*发送消息*/
  sendmsgfunc: function () {
    this.setData({
      visible2: true
    });
  },
  /*确定发送回掉*/
  sendmsgokfunc: function () {
    this.setData({
      visible2: false
    });
    // let buffer = new ArrayBuffer(1)
    // let dataView = new DataView(buffer)
    // dataView.setUint8(0, Math.random() * 255 | 0);
    // console.log(buffer);
  },
  sendinput: function (event){
    this.setData({
      msg: event.detail.value
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