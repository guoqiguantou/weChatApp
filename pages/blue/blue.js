const app = getApp();
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
  data: {
    devices: [],
    connected: false,
    chs: [],//特性值
  },
  openBluetoothAdapter() {
    wx.openBluetoothAdapter({
      success: (res) => {
        console.log('openBluetoothAdapter success', res)
        $Toast({
          content: '初始化蓝牙成功'
        });
        this.startBluetoothDevicesDiscovery();
      },
      fail: (res) => {
        console.log(res);
        $Toast({
          content: '失败'
        });
        if (res.errCode === 10001) { //当前蓝牙适配器不可用
          console.log(11);
          wx.onBluetoothAdapterStateChange(function (res) { //监听蓝牙适配器状态变化事件
            console.log('onBluetoothAdapterStateChange', res)
            if (res.available) {
              this.startBluetoothDevicesDiscovery()
            }
          })
        }
      }
    })
  },
  startBluetoothDevicesDiscovery() {
    if (this._discoveryStarted) {
      return
    }
    this._discoveryStarted = true
    wx.startBluetoothDevicesDiscovery({
      allowDuplicatesKey: true, //允许重复上报
      success: (res) => {
        console.log('startBluetoothDevicesDiscovery success', res);
        $Toast({
          content: '开始搜索'
        });
        this.onBluetoothDeviceFound()
      },
    })
  },
  onBluetoothDeviceFound() {
    $Toast({
      content: '获取发现的蓝牙设备信息'
    });
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
      })
    })

  },
  stopBluetoothDevicesDiscovery() {
    wx.stopBluetoothDevicesDiscovery();
    console.log('停止搜索设备');
    $Toast({
      content: '停止搜索设备'
    });
  },
  closeBluetoothAdapter() {
    wx.closeBluetoothAdapter()
    this._discoveryStarted = false;
    console.log('关闭蓝牙模块');
    $Toast({
      content: '关闭蓝牙模块'
    });
  },
  createBLEConnection(e) {
    $Toast({
      content: '开始连接蓝牙设备'
    });
    const ds = e.currentTarget.dataset
    const deviceId = ds.deviceId
    const name = ds.name
    wx.createBLEConnection({
      deviceId,
      success: (res) => {
        this.setData({
          connected: true,
          name,
          deviceId,
        })
        $Toast({
          content: '连接蓝牙设备成功'
        });
        this.getBLEDeviceServices(deviceId);
        
      },
      fail: (res) => {
        console.log(res);
        $Toast({
          content: '连接蓝牙设备失败'
        });
      }
    })
    this.stopBluetoothDevicesDiscovery(); //停止扫描
  },
  getBLEDeviceServices(deviceId) { //获取蓝牙设备所有服务
    
    wx.getBLEDeviceServices({
      deviceId,
      success: (res) => {
        $Toast({
          content: '获取蓝牙设备所有服务'
        });
        for (let i = 0; i < res.services.length; i++) {
          if (res.services[i].isPrimary) {
            this.getBLEDeviceCharacteristics(deviceId, res.services[i].uuid) 
            return
          }
        }
      }
    })
  },
  getBLEDeviceCharacteristics(deviceId, serviceId) {//获取蓝牙设备特征值
    wx.getBLEDeviceCharacteristics({
      deviceId,
      serviceId,
      success: (res) => {
        console.log('getBLEDeviceCharacteristics success', res.characteristics)
        $Toast({
          content: '获取蓝牙设备特征值成功'
        });

        for (let i = 0; i < res.characteristics.length; i++) {
          let item = res.characteristics[i];
          $Toast({
            content: item.properties.write
          });
          if (item.properties.read) {
            wx.readBLECharacteristicValue({
              deviceId,
              serviceId,
              characteristicId: item.uuid,
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
    // 操作之前先监听，保证第一时间获取数据
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
      // data[`chs[${this.data.chs.length}]`] = {
      //   uuid: characteristic.characteristicId,
      //   value: ab2hex(characteristic.value)
      // }
      this.setData(data)
    })
  },
  getBluetoothAdapterState() {//获取蓝牙适配器状态
    wx.getBluetoothAdapterState({
      success: (res) => {
        console.log('getBluetoothAdapterState', res)
        if (res.discovering) {
          this.onBluetoothDeviceFound()
        } else if (res.available) {
          this.startBluetoothDevicesDiscovery()
        }
      }
    })
  },
  closeBLEConnection() {
    wx.closeBLEConnection({//断开蓝牙连接
      deviceId: this.data.deviceId
    })
    this.setData({
      connected: false,
      chs: [],
      canWrite: false,
    })
  },


  writeBLECharacteristicValue() {
    // 向蓝牙设备发送一个0x00的16进制数据
    let buffer = new ArrayBuffer(1)
    let dataView = new DataView(buffer)
    dataView.setUint8(0, Math.random() * 255 | 0);

    wx.writeBLECharacteristicValue({
      deviceId: this._deviceId,
      serviceId: this._deviceId,
      characteristicId: this._characteristicId,
      value: buffer,
    })
  },

})