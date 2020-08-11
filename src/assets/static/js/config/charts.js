import jq from 'jquery';
import echarts from 'echarts';

export {
    line, config
}
var fz = jq('body').css('height').replace('px', '') * 0.014
var config = function () {
    //alert(fz*0.006)
    let cof = {
        "fontSize": fz,//坐标轴字体大小
        "textStyle": {
            fontSize: fz,
            color: '#fff'
        },
        "lineStyle": {
            color: '#fff',
            width: 1
        }
    }
}
var line = function (id, data, xData, lengedData) {
    var chart = echarts.init(document.getElementById(id));
    var seriesData = [];
    for (var i = 0; i < data.length; i++) {
        var s = {
            name: lengedData[i],
            type: 'line',
            data: data[i]
        };
        seriesData.push(s)
    }
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            itemWidth: fz * 2, // 图例标记的图形宽度。
            itemHeight: fz, // 图例标记的图形高度。
            top:'3%',
            textStyle: {
                fontSize: fz,
                color: '#fff'
            },
            data: lengedData
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: xData,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.12)'
                }
            },
            axisLabel: {
                interval: 0,
                // rotate: 0,
                margin:fz,
                textStyle: {
                    fontSize: fz,
                    color: '#fff'
                },
                formatter: function (params) {
                    return params
                },
            },
        }],
        yAxis: [{
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    fontSize: fz,
                    color: '#fff'
                },
            },
            axisLine: {
                show: false
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.12)'
                }
            }
        }],
        series: seriesData
    };
    chart.setOption(option, true)
    window.onresize = chart.resize;
}