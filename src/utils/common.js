import Vue from 'vue'
import $ from 'jquery'
import {config} from '@static/js/config/chartConfig'

window.isString = (o)=>{return Object.prototype.toString.call(o) == '[object String]'}
window.isObject = (o)=>{return Object.prototype.toString.call(o) == '[object Object]'}
window.isNumber = (o)=>{return Object.prototype.toString.call(o) == '[object Number]'}
window.isArray = (o)=>{return Object.prototype.toString.call(o) == '[object Array]'}
window.isFunction = (o)=>{return Object.prototype.toString.call(o) == '[object Function]'}

Vue.prototype.$get = function (url, parm){
  let dataParm = parm || {}
  return new Promise((resolve, reject) => {
    this.$http({
      url: this.$http.adornUrl(url),
      method: 'get',
      params: this.$http.adornParams(dataParm)
    }).then(({data}) => {
      if (data && data.code != 0) {
        this.$message(data.msg || '系统异常')
        return
      }
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}

Vue.prototype.$post = function (url, data, parm){
  parm = parm || {}
  let type = parm.dataType || 'json'
  let dataParm = isObject(data) ? this.$http.adornData(data,true, type) : JSON.stringify(data)
  let option = Object.assign({
    url: this.$http.adornUrl(url),
    method: 'post',
    data: dataParm,
    headers: {
      'Content-Type': 'application/json; charset=utf-8'
    }
  }, parm)
  return new Promise((resolve, reject) => {
    this.$http(option).then(({data}) => {
      if (data && data.code != 0) {
        this.$message(data.msg || '系统异常')
        return
      }
      resolve(data)
    }).catch(err => {
      reject(err)
    })
  })
}
Vue.prototype.$submit = function (url, data, fileIds){
  let option = {
    dataType:'form',
    headers: {
      'Content-Type': 'multipart/form-data;charset=UTF-8'
    }
  }
  let formData = new FormData()
  for(let key in data){ formData.append(key, data[key])  }
  if(fileIds){
    if(isString(fileIds)) fileIds = [fileIds]
    fileIds.forEach(id=>{
      let file = document.getElementById(id)
      formData.append(id, file.files[0])
    })
  }
  return this.$http.$submit(this.$http.adornUrl(url), formData, option)
}

//生成echarts图表
let basOption = {
  legendBas(){
    let _config = config()
    return { //图例的设置
      show: true, //是否显示图例
      top: '2%',//图例离底部的距离
      right:"2%",
      itemWidth: _config.fontSize, // 图例标记的图形宽度。
      itemHeight: _config.fontSize, // 图例标记的图形高度。
      itemGap: _config.fontSize, // 图例每项之间的间隔。
      textStyle: _config.textStyle,
    }
  },
  barBas(ext){
    ext = ext || {}
    let _config = config()
    return $.extend({
      tooltip : {
        trigger: 'axis',
        textStyle: _config.textStyle,
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
          type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: this.legendBas(),
      grid: {
        left: '5%',
        right: '5%',
        bottom: '8%',
        top:'20%',
        containLabel: true
      },
    }, ext)
  },
  //柱样式
  pie(){
    let _config = config()
    return {
      main:{
        legend: this.legendBas(),
      },
      part:{}
    }
  },
  //柱样式
  bar(){
    let _config = config()
    return {
      main:this.barBas(),
      part:{
        xAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            margin:_config.fontSize,
            textStyle:_config.textStyle
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle:_config.textStyle
          }
        },
      }
    }
  },
  //柱线样式
  barline(){
    let _config = config()
    return {
      main:this.barBas(),
      part:{
        xAxis: {
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            margin:_config.fontSize,
            textStyle:_config.textStyle
          }
        },
        yAxis: [
          {
            splitLine: {
              lineStyle: {
                type: 'solid',
                color: 'rgba(146,146,141,0.3)',
                width: 1,
              }
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              textStyle:_config.textStyle
            }
          },
          {
            splitLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisLabel: {
              formatter: "{value} %",
              textStyle:_config.textStyle
            }
          }
        ],
      }
    }
  }
}
function mergeOption(option, type){
  let bas = basOption[type](), ks = Object.keys(bas.part)
  let res = $.extend(true,{}, bas.main, option);
  ks.forEach(k=>{
    if(isObject(res[k])){
      res[k] = $.extend(true, {}, bas.part[k], res[k])
    }else if(isArray(res[k]) && isArray(bas.part[k])){
      for(let i = 0; i < res[k].length; i++){
        res[k][i] = $.extend(true, {}, bas.part[k][i], res[k][i])
      }
    }
    else if(isArray(res[k])){
      for(let i = 0; i < res[k].length; i++){
        res[k][i] = $.extend(true, {}, bas.part[k], res[k][i])
      }
    }
  })
  return res
}
Vue.prototype.initChart = function(id, option, type){
  let $el = isString(id) ? document.getElementById(id) : id
  type = type || 'bar'
  let option1 = mergeOption(option, type)
  let myChart=echarts.init($el)
  myChart.setOption(option1)
  window.onresize = myChart.resize
  return myChart
}

Vue.prototype.numText = function(num){
  if(!num) return num
  return num.toString().replace(/\d(?=(?:\d{3})+\b)/g,'$&,');
}

export function convertData(dataset, mpp){
  let res = mpp.map(()=>{return []})
  mpp.forEach((m, h)=>{
    if(isFunction(m)){
      dataset.forEach((data, i)=>{
        res[h].push(m(data, i))
      })
    }else{
      dataset.forEach((data, i)=>{
        res[h].push(data[m])
      })
    }
  })
  return res
}

export function getTreeData (d, opt){
  let o = Object.assign({id:'', label:'',parent:'parentId', type:'base'}, opt);
  let ds = [], idF = o.id, lbF = o.label, ptF = o.parent;
  if(o.type=='group')
    groupTree()
  else
    baseTree()
  return ds;
  function groupTree(){
    let dict = d.map(n=>{return n[ptF]})
    let g = Array.from(new Set(dict))
    for(let i = 0; i < g.length; i++){
      let x = {label:g[i],children:[]}
      x[idF] = g[i]
      addChildNode(d, x, x[idF]);
      ds.push(x);
    }
  }
  function baseTree(){
    for(let i = 0; i < d.length; i++){
      if(!d[i][ptF]){
        let x = copyNode(d[i]);
        addChildNode(d, x, x[idF]);
        ds.push(x);
      }
    }
  }
  function addChildNode(arr, node, nodeid){
    arr.forEach(a=>{
      if(a[ptF] == nodeid){
        let x = copyNode(a);
        addChildNode(arr, x, x[idF]);
        node.children.push(x);
      }
    })
  }
  function copyNode(o){
    return Object.assign({ label: o[lbF], children:[] },o);
  }
}

Date.prototype.format = function (fmt) {
  var o = {
    "M+": this.getMonth() + 1,                 //月份
    "d+": this.getDate(),                    //日
    "h+": this.getHours(),                   //小时
    "m+": this.getMinutes(),                 //分
    "s+": this.getSeconds(),                 //秒
    "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    "z+": this.getMonth() > 5 ? '下' : '上', //半年
    "S": this.getMilliseconds()             //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  return fmt;
}
Array.prototype.distinct = function(fn){
  let arr = fn ? this.map(fn) : this
  let newArr = Array.from(new Set(arr));
  return newArr;
}
//API

