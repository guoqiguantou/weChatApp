import * as echarts from '../../lib/ec-canvas/echarts.common.min';

Page({
  data: {
    ec: {
      // 将 lazyLoad 设为 true 后，需要手动初始化图表
      lazyLoad: true
    },
    xdata: [],
    ydata: []
  },
  onLoad: function (query) {
    this.upperLimit = query.upperLimit;
    this.lowerLimit = query.lowerLimit;
    this.queueIpPort = query.queueIpPort;
    this.queueName = query.queueName;
    this.deviceCode = query.deviceCode;
  },
  onReady: function() {
    // 获取组件
    this.ecComponent = this.selectComponent('#mychart-dom-bar');
    this.init();
    //创建webSocket连接
    this.webSocketb = wx.connectSocket({
      url: 'ws://192.168.3.205:9091/kafka-websocket3',
      header: {
        'content-type': 'application/json'
      },
      method: "GET",
      success() {
      },
      fail() {
        //console.log('连接失败')
      }
    });
    this.webSocketb.onOpen(()=>{
      console.log('详情连接上');
      this.webSocketb.send({
        data: JSON.stringify({
          deviceCode: this.deviceCode,
          queueIpPort: this.queueIpPort,
          queueName: this.queueName,
        })
      });
      //监听接受到服务器的消息事件
      this.webSocketb.onMessage((res) => {
        //console.log(res);
        if (this.isjson(res.data)) {
          var queueName = this.queueName;
          var newlist = JSON.parse(res.data)[queueName];
          console.log(newlist);
          var newxdata = this.data.xdata;
          var newydata = this.data.ydata;
          
          if (newxdata.length<5){
            var newx = newlist[0][4].split(" ");
            newxdata.push(newx[1]);
            newydata.push(newlist[0][3]);
          }else{
            var newx = newlist[0][4].split(" ");
            newxdata.push(newx[1]);
            newxdata.shift();
            newydata.push(newlist[0][3]);
            newydata.shift();
          }
          this.setData({
            xdata: newxdata,
            ydata: newydata
          })
          this.chart.setOption(this.setOption());
        }
      })
    })
  },
  // 点击按钮后初始化图表
  init: function() {
    this.ecComponent.init((canvas, width, height) => {
      // 获取组件的 canvas、width、height 后的回调函数
      // 在这里初始化图表
      const chart = echarts.init(canvas, null, {
        width: width,
        height: height
      });
      chart.setOption(this.setOption());
      // 将图表实例绑定到 this 上，可以在其他成员函数（如 dispose）中访问
      this.chart = chart;
      // 注意这里一定要返回 chart 实例，否则会影响事件处理等
      return chart;
    });
  },
  //向echart传值
  setOption: function() {
    var option = {
      title: {
        text: ''
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#999999'
          }
        },
        data: this.data.xdata
      },
      yAxis: {
        name: '',
        type: 'value',
        max: this.upperLimit,
        min: this.lowerLimit,
        axisLine: {
          lineStyle: {
            color: '#999999',
          }
        },
      },
      series: [{
        data: this.data.ydata,
        type: 'line',
        label: {
          show: true
        },
        smooth: true,
        lineStyle: {
          color: '#d6ccea'
        },
        itemStyle: {
          color: '#999999'
        },
        areaStyle: {
          color: '#d6ccea'
        }
      }]
    }
    return option;
  },
  //判断是不是json字符串
  isjson: function (str) {
    if (typeof str == 'string') {
      try {
        var obj = JSON.parse(str);
        if (typeof obj == 'object' && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
  },
  //当页面被卸载的时候关闭webSocket
  onUnload: function () {
    this.webSocketb.close();
  }
})