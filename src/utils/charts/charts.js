import jq from 'jquery';
import echarts from 'echarts';

export {
    chart, config
}
var fz = jq('body').css('height').replace('px', '') * 0.016
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
var color = ['#00c6ff', '#0063ff', '#9800ff', '#ed00ff', '#4bb80b', '#00a0ff', '#fff700', '#ff9300', '#ff0070', '#00ffdb', '#ffc100', '#FF3000','#418ca5','#baff00','#1c414d','#24695e','#171779','#60609f','#f2ea70','#86ce66','#f965ca','#f87152'];
var lineOrBar = function (data) {
    var seriesData = [];
    var type = data.chartType;
    if (data.chartType == 'stack') {
        type = 'bar'
    }
    for (var i = 0; i < data.data.length; i++) {
        var s = {
            name: data.legend[i],
            type: type,
            data: data.data[i]
        };
        if (data.chartType == 'stack') {
            s.stack = '1'
        }
        seriesData.push(s)
    }
    var option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: { // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            },
            textStyle: {
                fontSize: fz,
                color: '#fff'
            },
            formatter:function (param) {
               var p =  Math.ceil(param.length/6)
                var str = '&nbsp;&nbsp;'+param[0].name+'<div style="display: flex">'
                for(let i = 1;i<=p;i++){
                    str = str+'<div>';
                    for(let j = 0;j<param.length;j++){
                       if(j>=6*(i-1)&&j<i*6){
                           str = str+'&nbsp;&nbsp;'+param[j].marker+param[j].seriesName+'：'+param[j].data+'&nbsp;&nbsp;'+'<br/>';
                       }
                    }
                    str = str+'</div>';
                }
                str = str+'</div>';
               return str
            }
        },
        color: color,
        legend: {
            itemWidth: fz * 2, // 图例标记的图形宽度。
            itemHeight: fz, // 图例标记的图形高度。
            bottom: '3%',
            textStyle: {
                fontSize: fz,
                color: '#fff'
            },
            data: data.legend
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '13%',
            top: '4%',
            containLabel: true
        },
        xAxis: [{
            type: 'category',
            data: data.xData,
            axisLine: {
                lineStyle: {
                    color: 'rgba(255,255,255,0.12)'
                }
            },
            axisLabel: {
                interval: 0,
                // rotate: 0,
                margin: fz,
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
    return option
}
var pie = function (data) {
    var pieData = []
    for (var i = 0; i < data.xData.length; i++) {
        var tmp = {
            name: data.xData[i],
            value: data.data[0][i]
        }
        pieData.push(tmp)
    }
    var option = {
        color: color,
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)',
            textStyle: {
                fontSize: fz,
                color: '#fff'
            },
        },
        legend: {
            itemWidth: fz * 2, // 图例标记的图形宽度。
            itemHeight: fz, // 图例标记的图形高度。
            bottom: '3%',
            textStyle: {
                fontSize: fz,
                color: '#fff'
            },
            data: data.xData
        },
        series: [{
            name: data.name,
            type: 'pie',
            data: pieData,
            label: {},
            radius: [0, '60%'],
            label: {
                formatter: '{b}  ',
            }
        }],
    };
    return option
}
var radar = function (data) {
    var dataArr = [];
    var indicator = [];
    for (var i = 0; i < data.legend.length; i++) {
        var dt = [];
        for (var j = 0; j < data.xData.length; j++) {
            if (i < 1) {
                indicator.push({name: data.xData[j]})
            }
            dt.push(data.data[i][j])
        }
        dataArr.push({
            "value": dt,
            "name": data.legend[i],
            "itemStyle": {
                "normal": {
                    "lineStyle": {
                        "color": color[i]
                    },
                    "shadowColor": color[i],
                    "shadowBlur": 10
                }
            },
            areaStyle: {
                normal: {
                    opacity: 0.2
                }
            }
        })
    }
    var option = {
        color: color,
        tooltip: {
            textStyle: {
                fontSize: fz,
                color: '#fff'
            },
            formatter:function (param) {
                var p =  Math.ceil(param.value.length/6)
                var str = '&nbsp;&nbsp;'+param.name+'<div style="display: flex">'
                for(let i = 1;i<=p;i++){
                    str = str+'<div>';
                    for(let j = 0;j<indicator.length;j++){
                        if(j>=6*(i-1)&&j<i*6){
                            str = str+'&nbsp;&nbsp;'+param.marker+indicator[j].name+'：'+param.value[j]+'&nbsp;&nbsp;'+'<br/>';
                        }
                    }
                    str = str+'</div>';
                }
                str = str+'</div>';
                return str
            }
        },
        legend: {
            orient: 'vertical',
            icon: 'circle', //图例形状
            data: data.legend,
            y: 'center',
            right: '5%',
            itemWidth: fz, // 图例标记的图形宽度。[ default: 25 ]
            itemHeight: fz, // 图例标记的图形高度。[ default: 14 ]
            itemGap: fz, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
            textStyle: {
                fontSize: fz,
                color: '#fff',
            },
        },
        radar: {
            // shape: 'circle',
            name: {
                textStyle: {
                    color: '#fff',
                    fontSize: fz
                },
            },
            indicator: indicator,
            splitArea: { // 坐标轴在 grid 区域中的分隔区域，默认不显示。
                show: true,
                areaStyle: { // 分隔区域的样式设置。
                    color: ['rgba(255,255,255,0)', 'rgba(255,255,255,0)'], // 分隔区域颜色。分隔区域会按数组中颜色的顺序依次循环设置颜色。默认是一个深浅的间隔色。
                }
            },
            axisLine: { //指向外圈文本的分隔线样式
                lineStyle: {
                    color: '#87999e'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#87999e', // 分隔线颜色
                    width: 1, // 分隔线线宽
                }
            },
        },
        series: [{
            type: 'radar',
            symbolSize: fz / 1.5,
            symbol: 'circle',
            data: dataArr
        }]
    };
    return option
}
var scatter = function (data) {
    var series = [];
    for (var i = 0; i < data.legend.length; i++) {
        var values = []
        for (var j = 0; j < data.xData.length; j++) {
            values.push([data.xData[j],data.legend[i],data.data[i][j]])
        }
        var tmp =  {
            name: 'a',
            type: 'scatter',
            symbol: 'circle',//'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
            symbolSize: function (data) {
                return Math.sqrt(data[2]) * 1;
            },
            itemStyle: {
                normal: {
                    color: color[i]
                }
            },
            data: values
        }
        series.push(tmp)
    }
    var option = {
        color: color,
        tooltip: {
            trigger: "axis",
            axisPointer: {
                lineStyle: {
                    type: 'dashed'
                },
                animation: true
            },
            textStyle: {
                fontSize: fz,
                color: '#fff'
            },
            formatter:function (param) {
                var p =  Math.ceil(param.length/6)
                var str = '&nbsp;&nbsp;'+param[0].name+'<div style="display: flex">'
                for(let i = 1;i<=p;i++){
                    str = str+'<div>';
                    for(let j = param.length-1;j>=0;j--){
                        if(j<=(param.length-1)-6*(i-1)&&j>(param.length-1)-i*6){
                            str = str+'&nbsp;&nbsp;'+param[j].marker+param[j].data[1]+'：'+param[j].data[2]+'&nbsp;&nbsp;'+'<br/>';
                        }
                    }
                    str = str+'</div>';
                }
                str = str+'</div>';
                return str
            }
            // formatter: function (param) {
            //     var str = param[0].name+'<br/>'
            //    for(var p = param.length-1;p>=0;p--){
            //        str = str+param[p].marker+param[p].data[1]+'：'+param[p].data[2]+'<br/>';
            //    }
            //     return str;
            // },
        },
        grid: {
            left: '5%',
            right: '5%',
            bottom: '4%',
            top: '7%',
            containLabel: true
        },
        yAxis: {
            data: data.legend,
            splitLine: {
                show: true,
                lineStyle: {
                    color: 'rgba(0,206,255,.3)',
                }
            },
            axisLine: {
                show: false
            },
            axisLabel: {
                interval: 0,
                // rotate: 0,
                margin: fz,
                textStyle: {
                    fontSize: fz,
                    color: '#fff'
                }
            },
        },
        xAxis: {
            data:data.xData,
            axisLine: {
                show: true,
                lineStyle: {
                    color: '#555',
                },
            },
            axisLabel: {
                interval: 0,
                // rotate: 0,
                margin: fz,
                textStyle: {
                    fontSize: fz,
                    color: '#fff'
                }
            },
        },
        series: series
    };
    return option
}
var chart = function (id, data) {
    var option = {};
    var title = {
        title: {
            text: "数据类型不符合图类型！",
            x: 'center',
            y: 'center',
            textStyle: {
                color: '#f81a25',
                fontSize: fz * 3
            }
        },
    }
    if (data.chartType == 'line' || data.chartType == 'bar' || data.chartType == 'stack') {
        option = lineOrBar(data);
    } else if (data.chartType == 'pie') {
        if (data.data.length > 1) {
            option = title
        } else {
            option = pie(data)
        }
    } else if (data.chartType == 'radar') {
        if(data.xData.length<3){
            option = title
        } else {
            option = radar(data)
        }
    }else if (data.chartType == 'scatter') {
        option = scatter(data)
    }else if (data.chartType == 'bar_line') {
        option = lineOrBar(data)
    }
    var chart = echarts.init(document.getElementById(id));
    chart.setOption(option, true)
    window.onresize = chart.resize;
    return true
}