import * as echarts from '../../lib/ec-canvas/echarts.common.min';

function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);

  // var option = {
  //   yAxis: {
  //     type: 'category',
  //     boundaryGap: false,
  //     inverse: 'true',
  //     data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  //     // axisLabel: {
  //     //    rotate: 90,
  //     //    color: '#ff0000',
  //     //  }
  //   },
  //   xAxis: {
  //     type: 'value',
  //     color: '#ff0000',
  //     position: 'top', //x 轴的位置【top bottom】
  //     // axisLabel: {  //坐标轴刻度标签的相关设置。
  //     //   rotate: 90 //刻度标签旋转的角度，
  //     // }
  //   },
  //   series: [{
  //     data: [820, 932, 901, 934, 1290, 1330, 1320],
  //     type: 'line',
  //     areaStyle: {}
  //   }]
  // };
  var option = {
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
      color: '#ff0000',
    },
    series: [{
      data: [120, 332, 101, 534, 290, 330, 320],
      type: 'line',
      areaStyle: {}
    }]
  };
  chart.setOption(option);
  return chart;
}

Page({
  data: {
    ec: {
      onInit: initChart
    }
  }
});