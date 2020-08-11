import $ from 'jquery';

export {
  config,sortBy,reverse,mapCode
}
var config = function (){
  let fz = $('body').css('height').replace('px','')*0.016
    if ($('body').width() / $('body').height() < 3) {
        fz = $('body').css('height').replace('px','')*0.014
    }
  //alert(fz*0.006)
  let cof = {
    "fontSize":fz,//坐标轴字体大小
    "textStyle":{
      fontSize: fz,
      color:'#fff'
  },
    "lineStyle":{
      color: '#fff',
      width: 1
  }

  };
  return cof
}

//json数据倒序排序
var sortBy = function (filed, rev, primer) {
    rev = (rev) ? -1 : 1;
    return function (a, b) {
        a = a[filed];
        b = b[filed];
        if (typeof (primer) != 'undefined') {
            a = primer(a);
            b = primer(b);
        }
        if (a > b) { return rev * -1; }
        if (a < b) { return rev * 1; }
        return 1;
    }
};

//json数据正序排序
var reverse = function (filed, rev, primer) {
    rev = (rev) ? -1 : 1;
    return function (a, b) {
        a = a[filed];
        b = b[filed];
        if (typeof (primer) != 'undefined') {
            a = primer(a);
            b = primer(b);
        }
        if (a < b) { return rev * -1; }
        if (a > b) { return rev * 1; }
        return 1;
    }
};

var mapCode = [
    {region:'海口市',coor:[110.326837,20.031624],code:460100000000},
    {region:'三亚市',coor:[109.524255,18.256929],code:460200000000},
    {region:'三沙市',coor:[112.351689,16.838364],code:460300000000},
    {region:'儋州市',coor:[109.565074,19.533091],code:460400000000},
    {region:'五指山市',coor:[109.52483,18.780731],code:469001000000},
    {region:'文昌市',coor:[110.932715,19.616634],code:469005000000},
    {region:'琼海市',coor:[110.480832,19.255009],code:469002000000},
    {region:'万宁市',coor:[110.396559,18.802845],code:469006000000},
    {region:'东方市',coor:[108.65629,19.100448],code:469007000000},
    {region:'定安县',coor:[110.359209,19.683308],code:469021000000},
    {region:'屯昌县',coor:[110.108546,19.357035],code:469022000000},
    {region:'澄迈县',coor:[110.010062,19.744893],code:469023000000},
    {region:'临高县',coor:[109.688244,19.916212],code:469024000000},
    {region:'白沙黎族自治县',coor:[109.455171,19.233017],code:469025000000},
    {region:'昌江黎族自治县',coor:[109.063039,19.30236],code:469026000000},
    {region:'乐东黎族自治县',coor:[109.179933,18.756966],code:469027000000},
    {region:'陵水黎族自治县',coor:[110.042739,18.512332],code:469028000000},
    {region:'保亭黎族自治县',coor:[109.706931,18.647458],code:469029000000},
    {region:'琼中黎族自治县',coor:[109.846811,19.038617],code:469030000000}
];

