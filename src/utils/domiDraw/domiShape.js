/**
 * author: mazong
 *
 */
import {actEach, cos, sin, rad, pix,round,$num,curveTo} from './helper'
import $ from 'jquery'
import * as d3 from 'd3';

//
class dmSvg{
  constructor(id){
    let svg = d3.select('#'+id).append('svg').attr('width','100%').attr('height','100%')
    this.svg = svg
  }
  group(){
    let el = new dm_group(this.svg)
    return el
  }
  height(){
    let div = $(this.svg._groups[0])
    return div.height()
  }
  width(){
    let div = $(this.svg._groups[0])
    return div.width()
  }
}
class dm_node {
  constructor(){
    this._data = {}
  }
  $node(tag, pel){
    let el = pel.append(tag)
    this.el = el
    return el
  }
  attr(k, v){
    this.el && this.el.attr(k, v)
    return this
  }
  css(k, v){
    if(isObject(k)){
      for(let n in k)
        this.el.style(n, k[n])
    }else{
      this.el.style(k, v)
    }
    return this
  }
  width(){
    return this.el.width()
  }
  height(){
    return this.el.height()
  }
  text(txt){
    this.el && this.el.text(txt)
    return this
  }
  fill(v){
    this.el && this.el.attr('fill', v)
    return this
  }
  stroke(v){
    this.el && this.el.attr('stroke', v)
    return this
  }
  move(x,y){
    this.el.attr('transform',`translate(${x} ${y})`);
    return this
  }
  on(){
    this.el.on.apply(this.el, arguments)
    return this
  }
  data(k,v){
    if(arguments.length == 1)
      return this._data[k] || ''
    else
      this._data[k] = v
  }
}
class dm_group extends dm_node{
  constructor(svg){
    super();
    this.$node('g', svg)
    this.shapes = []
  }
  path(){
    let el = new dm_path(this.el)
    this.shapes.push(el)
    return el
  }
  text(){
    let el = new dm_text(this.el)
    this.shapes.push(el)
    return el
  }
  group(){
    let el = new dm_group(this.el)
    this.shapes.push(el)
    return el
  }
}
class dm_path extends dm_node{
  constructor(svg) {
    super();
    this.$node('path', svg)
  }
  d(arr){
    this.el.attr('d', arr.join(' '))
  }
}
class dm_text extends dm_node{
  constructor(svg) {
    super();
    this.$node('text', svg)
  }
}

class dsSvg extends dmSvg{
  constructor(id){
    super(id);
    this.svg.style('overflow','visible')
    this.shapeMap = {'group':ds_group,'link':ds_link};
  }
  _parseOption(option){
    let g = option.g;
    for(let n in g){
      this._parseClass(g[n].type || 'group', g[n]);
    }
  }
  _parseClass(type,option){
    return new this.shapeMap[type](option,this.svg, this);
  }
}
dsSvg.init = function(id, option){
  let pig = new dsSvg(id);
  pig._parseOption(option);
  return pig;
}

class ds_group{
  constructor(option,dom, pig){
    this.dom = dom;
    this.pig = pig;
    this.option = option;
    this.nodes = [];
    this.init();
  }
  init(){
    let g = this.dom.append('g'), opt = this.option, data = opt.data;
    let type = this.getBasType(data[0]);
    let shapes = g.selectAll('.shape').data(data).enter().append('g');
    if(opt.layout){
      this.initLayout(opt, g, shapes, type, data)
    }else{
      this.initNode(opt, shapes, type)
    }
    this._g = g;
    this.nodes = shapes;
  }
  initLayout(opt, g, shapes, type, data){
    let ly = opt.layout, imgs;
    let lypm = this.getLayoutOption();
    if(lypm.left && lypm.top){
      g.attr('transform','translate(' + lypm.left + ',' + lypm.top + ')');
    }
    if(ly && dmly[ly]){
      imgs = dmly[ly](shapes, lypm, data);
    }

    shapes.attr('transform', function (d) { return 'translate(' + d.x + ',' + d.y + ')'; });
    //image:
    shapes.append(type).attr("xlink:href", (d)=>{return d.src})
        .attr("width", (d)=>{return d.width})
        .attr("height", (d)=>{return d.height})
  }
  initNode(opt,shapes,type){
    let width = this.pig.width(), height = this.pig.height();
    let box = {width:width,height:height};
    shapes.attr('transform', function (d) {
      let self = {width:d.width||0,height:d.height||0};
      let x = _parsePos(d.x, width, self, box);
      let y = _parsePos(d.y, height, self, box);

      return 'translate(' + x + ',' + y + ')';
    });

    //image:
    shapes.append(type).attr("xlink:href", (d)=>{
      let img = require('@static/'+d.src)
      return img
    })
        .attr("width", (d)=>{return d.width})
        .attr("height", (d)=>{return d.height})

    //title:
    let titles = shapes.filter(function(d){ return d.text; });
    titles.append('text').text((d)=>{return d.text})
        .attr('x',(d)=>{return d.textStyle.x})
        .attr('y',(d)=>{return d.textStyle.y})
        .style('transform','rotateZ(30deg) rotateY(30deg) rotateX(46deg)')
        .attr('stroke', '#fff')
        .attr('stroke-width',1)
  }
  getBasType(o){
    return o.type;
  }
  getLayoutOption(){
    let opt = this.option.layoutOption || {};
    let width = this.pig.width(), height = this.pig.height();
    let self = {width:opt.width||0,height:opt.height||0}, box = {width:width,height:height};
    if(opt.left){
      opt.left = _parsePos(opt.left, width, self, box);
    }
    if(opt.top){
      opt.top = _parsePos(opt.top, height, self, box);
    }
    if(opt.right){
      let w = opt.width || 0;
      opt.left = width - _parsePos(opt.right, width, self, box) - w;
    }
    if(opt.bottom){
      let h = opt.height || 0;
      opt.top = height - _parsePos(opt.bottom, height,  self, box) - h;
    }
    return opt;
    // this.option.layoutOption.width = this.pig.width();
    // this.option.layoutOption.height = this.pig.height();
    // return this.option.layoutOption;
  }

}
class ds_link{
  constructor(option,dom, pig){
    this.dom = dom;
    this.pig = pig;
    this.option = option;
    this.path = null;
    this.init();
  }
  init(){
    let g = this.dom.append('g'), pos = this.option.pos;
    let path = g.append('path'), l = pos.length - 1;
    let d = ['M', pos[0][0],pos[0][1]];
    for(let i = 0; i < l;i++){
      let a1 = pos[i], a2 = pos[i+1];
      d.push('L',a1[0],a1[1],a2[0],a2[1]);
    }
    d.push('M', pos[l][0],pos[l][1]);
    d.push('Z');
    path.attr('d',d.join(' ')).attr('fill','none').attr('stroke','#7efcfc').attr('stroke-width',5);
  }
}
function _parsePos(val, prt, self, bbox){
  if(isFunction(val)){
    return val(bbox.width, bbox.height);
  }
  if(isString(val)){
    if(val=='middle'){
      return (bbox.height - self.height) / 2;
    }else if(val == 'center'){
      return (bbox.width - self.width) / 2;
    }
  }
  return pix(val, prt);
}

function mySlice3d(dom, op, dat, colr){
  let g = dom.group();
  this.g = g;
  this.dat = dat
  //this.pbtm = g.path();
  this.plef = g.path();
  this.prgh = g.path();
  this.pinn = g.path();
  this.pout = g.path();
  this.ptop = g.path();
}
mySlice3d.prototype.draw = function(dom, op, dat, colr){
  var alpha = rad(dat.angle||op.angle), beta = 0, x0 = dat.x || 0, y0 = dat.y || 0, PI = Math.PI, opacity = dat.opacity||op.opacity;
  var cx = op.x - op.x,
      cy = op.y - op.y + y0,
      start = rad(dat.startAngle),
      end = rad(dat.endAngle) - 0.00001,
      r = dat.outerRadius||op.outerRadius,
      ir = dat.innerRadius||op.innerRadius,
      d = dat.depth||op.depth;
  var cs = Math.cos(start),
      ss = Math.sin(start),
      ce = Math.cos(end),
      se = Math.sin(end),
      rx = r * Math.cos(beta),
      ry = r * Math.cos(alpha),
      irx = ir * Math.cos(beta),
      iry = ir * Math.cos(alpha),
      dx = d * Math.sin(beta),
      dy = d * Math.sin(alpha) ;
  var s1 = [cx + (rx * cs), cy + (ry * ss)]
  function pieTop(dat,op){
    var top = ['M', s1[0], s1[1]];

    top = top.concat(curveTo(cx, cy, rx, ry, start, end, 0, 0));
    top = top.concat([
      'L', cx + (irx * ce), cy + (iry * se)
    ]);
    top = top.concat(curveTo(cx, cy, irx, iry, end, start, 0, 0));
    top = top.concat(['Z']);
    return top;
  }
  function pieOuter(dat,op){
    var b = 0,
        a = (alpha > 0 ? 0 : Math.PI / 2);

    var start2 = start > -b ? start : (end > -b ? -b : start),
        end2 = end < PI - a ? end : (start < PI - a ? PI - a : end),
        midEnd = 2 * PI - a;
    var out = ['M', cx + (rx * Math.cos(start2)), cy + (ry * Math.sin(start2))];

    out = out.concat(curveTo(cx, cy, rx, ry, start2, end2, 0, 0));

    if (end > midEnd && start < midEnd) {
      out = out.concat([
        'L', cx + (rx * Math.cos(end2)) + dx, cy + (ry * Math.sin(end2)) + dy
      ]);
      out = out.concat(curveTo(cx, cy, rx, ry, end2, midEnd, dx, dy));
      out = out.concat([
        'L', cx + (rx * Math.cos(midEnd)), cy + (ry * Math.sin(midEnd))
      ]);
      out = out.concat(curveTo(cx, cy, rx, ry, midEnd, end, 0, 0));
      out = out.concat([
        'L', cx + (rx * Math.cos(end)) + dx, cy + (ry * Math.sin(end)) + dy
      ]);
      out = out.concat(curveTo(cx, cy, rx, ry, end, midEnd, dx, dy));
      out = out.concat([
        'L', cx + (rx * Math.cos(midEnd)), cy + (ry * Math.sin(midEnd))
      ]);
      out = out.concat(curveTo(cx, cy, rx, ry, midEnd, end2, 0, 0));

    } else if (end > PI - a && start < PI - a) {
      out = out.concat([
        'L',
        cx + (rx * Math.cos(end2)) + dx,
        cy + (ry * Math.sin(end2)) + dy
      ]);
      out = out.concat(curveTo(cx, cy, rx, ry, end2, end, dx, dy));
      out = out.concat([
        'L', cx + (rx * Math.cos(end)), cy + (ry * Math.sin(end))
      ]);
      out = out.concat(curveTo(cx, cy, rx, ry, end, end2, 0, 0));
    }

    out = out.concat([
      'L', cx + (rx * Math.cos(end2)) + dx, cy + (ry * Math.sin(end2)) + dy
    ]);
    out = out.concat(curveTo(cx, cy, rx, ry, end2, start2, dx, dy));
    out = out.concat(['Z']);
    return out;
  }
  function pieInn(dat, op){
    var inn = ['M', cx + (irx * cs), cy + (iry * ss)];

    inn = inn.concat(curveTo(cx, cy, irx, iry, start, end, 0, 0));
    inn = inn.concat([
      'L', cx + (irx * Math.cos(end)) + dx, cy + (iry * Math.sin(end)) + dy
    ]);
    inn = inn.concat(curveTo(cx, cy, irx, iry, end, start, dx, dy));
    inn = inn.concat(['Z']);
    return inn;
  }
  var side1 = [
    'M', s1[0], s1[1],
    'L', cx + (rx * cs) + dx, cy + (ry * ss) + dy,
    'L', cx + (irx * cs) + dx, cy + (iry * ss) + dy,
    'L', cx + (irx * cs), cy + (iry * ss),
    'Z'
  ];
  var side2 = [
    'M', cx + (rx * ce), cy + (ry * se),
    'L', cx + (rx * ce) + dx, cy + (ry * se) + dy,
    'L', cx + (irx * ce) + dx, cy + (iry * se) + dy,
    'L', cx + (irx * ce), cy + (iry * se),
    'Z'
  ];
  this.prgh.attr('d',side1.join(' '));
  this.plef.attr('d',side2.join(' '));
  this.pinn.attr('d',pieInn(dat,op).join(' '));
  this.pout.attr('d',pieOuter(dat,op).join(' '));
  this.ptop.attr('d',pieTop(dat,op).join(' '));
  //this.pbtm.d(['M',s1.x,s1.y+op.depth,'A',radius, radiusY, 0, large_flag1, 1, e1.x, e1.y+op.depth, 'L', ir*e1.x,ir*e1.y+op.depth, 'A', innerRadius, innerRadiusY, 0, large_flag1, 0, ir*s1.x,ir*s1.y+op.depth,'z']);
  let dark = fillBrighten(colr, 0.8)
  this.prgh.fill(dark).attr('fill-opacity',opacity);
  this.plef.fill(dark).attr('fill-opacity',opacity);
  this.pout.fill(dark).attr('fill-opacity',opacity);
  this.pinn.fill(dark).attr('fill-opacity',opacity);
  //this.pbtm.fill(dark).attr('fill-opacity',opacity);
  this.ptop.fill(colr).attr('fill-opacity',opacity);
}
function myPie3d(dom, opt){
  let g = dom.group();
  let ts = this;
  let op = parseOption(dom, opt)
  ts.op = op;
  let ds = parseData(op);
  ts.svg = dom;
  ts.dom = g;
  g.move(op.x,op.y);
  ts.slice = [];
  ts.lbs = [];
  ts.lbs_map = {x:[],y:[]}
  if(!op.sorted){
    let pi1 = ds.map(d => d.endAngle <= 90 ? d : null)
        .filter(d => d !== null).sort((a, b) => (b.value - a.value));
    let pi2 = ds.map(d => d.endAngle > 90 && d.endAngle <= 180 ? d : null)
        .filter(d => d !== null).sort((a, b) => (a.value - b.value));
    let pi3 = ds.map(d => d.endAngle > 180 && d.endAngle <= 270 ? d : null)
        .filter(d => d !== null).sort((a, b) => (a.value - b.value));
    let pi4 = ds.map(d => d.endAngle > 270 ? d : null)
        .filter(d => d !== null).sort((a, b) => (b.value - a.value));
    if(op.field && op.field.depth){
      let f = op.field.depth;
      pi1 = pi1.sort(valSort);
      pi2 = pi2.sort(valSort);
      pi3 = pi3.sort(valSort);
      pi4 = pi4.sort(valSort);
    }
    ts.ds = [].concat(pi4).concat(pi1).concat(pi3).concat(pi2);
  }else{
    ts.ds = ds;
  }
  ts._tip = createTooltip(dom)

  ts.ds.forEach(function(dat, idx){
    ts.slice.push(new mySlice3d(ts.dom, ts.op, dat));

    var lbs = new myLabel(ts.dom, ts, dat)
    ts.lbs.push(lbs)
    lbs.draw(ts.op, dat, idx)
  });
  // showHideTooltip(ts, ts.slice)
  // showHideTooltip(ts, ts.lbs)

  function valSort(a, b){
    return (a.depth - b.depth) || 0;
  }
  function parseData(op){
    let dt = op.data || []
    let sum = 0, mx = 0, ds = [];
    dt.forEach(function(d,i){
      let x = isObject(d) ? Object.assign({}, d) : {name:i, value:d}
      x.value = $num(x.value)
      sum+=x.value;
      if(x.value>mx) mx = x.value;
      ds.push(x);
    });
    let angle = op.start || 0;
    ds.forEach(function(x){
      let r = round(x.value/sum, 4);
      let z = x.value/mx;
      let a = 360*r;
      x.startAngle=angle;
      x.endAngle=angle+a;
      angle=x.endAngle;
      x.ratio = r
      x.depth = Math.max(op.depth*z, 10);
      x.y = op.depth - x.depth;
    });
    return ds;
  }
  function parseOption(dom, o){
    o = $.extend(true,{
      tooltip:{
        formatter:function(dat){
          return dat.name + ':' + dat.value + '(' + dat.ratio * 100 + '%)'
        }
      },
      label:{
        formatter:function(dat){
          return dat.name
        }
      },
      center:['50%','50%'],
      opacity:1,
      start:0,
      animateDuraing:600
    }, o)
    let width = dom.width(), height = dom.height();
    let r = (width > height ? height : width);
    let x = pix(o.center[0], width), y = pix(o.center[1], height)
    let dep = o.depth, rr = (r - dep)/2;
    let radius2 = pix(o.radius[0], rr), radius1 = pix(o.radius[1], rr)
    let op = {
      x:x,
      y:y,
      width:width,
      height:height,
      outerRadius:radius1,
      innerRadius:radius2,
    };
    if(o){
      for(let n in o)
        op[n] = o[n];
    }
    return op;
  }
  function createTooltip(dom){
    let el = $(dom.svg._groups[0])
    el.parent().css('position','relative')
    let tt = $('<div class="dm-tooltip"></div>')
    el.after(tt)
    return tt[0]
  }
  function showHideTooltip(ts, cpm){
    cpm.forEach(el=>{
      el.g.on('mouseover', (d,i)=>{
        let tip = $(ts._tip), txt = ts.op.tooltip.formatter(el.dat)
        tip.show().html(txt).css({left:d3.event.pageX, top:d3.event.pageY - ts.svg.height()})
      }).on("mouseout",()=>{
        $(ts._tip).hide()
      })
    })
  }
}
myPie3d.prototype.draw = function(tick){
  let ts = this;
  ts.ds.forEach(function(dat,i){
    actEach(dat.startAngle, dat.endAngle, function(angle){
      dat.endAngle = angle;
      ts.slice[i].draw(ts.dom, ts.op, dat, getColor(ts.op, i));
    },tick);
  });
}

class myLabel{
  constructor(g,pie,dat){
    this.g = g
    this.pie = pie
    this.dat = dat
  }
  draw(op, dat, idx){
    let opt = $.extend(true, {
      padding:[10, 10],
      style:{}
    },op.label)
    let el = this.g.text(), pie = this.pie, st = opt.style || {}, mxh = op.height / 2
    for(let n in st){
      el.css(n, st[n])
    }
    let txt = opt.formatter(dat, idx), ry = op.outerRadius,angle = (dat.startAngle + dat.endAngle) / 2
    let da = rad(angle  % 360)
    let x = ry*Math.cos(da) + opt.padding[0]
    x = this._cover(pie.lbs_map, 'x', x,opt.padding[0])
    let y = dat.y + ry*sin(angle) - opt.padding[1]
    if(y>0&&y>mxh) y = mxh
    y = this._cover(pie.lbs_map, 'y', y,opt.padding[1])
    let clr = op.color[idx] || '#fff'
    el.text(txt).fill(clr).attr('stroke-width',0).attr('x',x).attr('y', y)

  }
  _cover(map, tp, v, h){
    let arr = map[tp]
    let s = h, s2 = Math.abs(s / 2)
    let xy = v
    for(let i = 0; i < arr.length;i++){
      if((xy-arr[i])<s2){
        xy += s
        break;
      }
    }
    map[tp].push(xy)
    return xy
  }
}

function getColor(opt, i){
  let _colr = opt.color || ['#f06','#ff1','#0f0','#00f'];
  return _colr[i % _colr.length];
}

function fillBrighten(c, n){
  var nums = colorNumber(c);
  for(var i = 0; i < nums.length; i++){
    nums[i] *= n;
    if(nums[i]<0) nums[i] = 0;
    if(nums[i]>255) nums[i] = 255;
  }
  return colorHex(nums);
}
function colorNumber(c){
  if(c.charAt(0)!='#') return c;
  var s = c;
  if(s.length == 4){
    s = '#';
    for(var i = 1; i <c.length; i++){
      s+=c.charAt(i)+c.charAt(i);
    }
  }
  s = s.toLowerCase();
  var arr = [];
  for(var i = 0; i <3; i++){
    arr.push(parseInt("0x"+ s.charAt(i*2+1) + s.charAt(i*2+2)));
  }
  return arr;
}
function colorHex(ar){
  var s = '#';
  for(var i = 0; i<ar.length; i++){
    var a = parseInt(ar[i]).toString(16);
    if(a.length == 1)
      a = "0" + a;
    s+=a;
  }
  return s;
}

var dmly = {}
dmly.pie = function(opt){
  let o = Object.assign({
    mapping:function(){return 1},
    width:0,
    height:0,
    x:0,
    y:0,
    r:1,
    start:-90,
    end:0,
    data:[]
  }, opt)
  if(o.width>0 && o.height>0){
    o.x = o.width / 2
    o.y = o.height / 2
    o.r = Math.min(o.x, o.y)
  }
  o.end = o.end >0 ? rad(o.end) : rad(360 - o.start)
  o.start = rad(o.start)
  let layout = d3.pie().value(o.mapping).startAngle(o.start).endAngle(o.end)
  let ds = layout(o.data).map(n=>{
    n.x = o.x + o.r* Math.cos(n.startAngle)
    n.y = o.y + o.r* Math.sin(n.startAngle)
    return n
  })
  return ds
}
dmly.ellipse = function(opt){
  let o = Object.assign({
    mapping:function(){return 1},
    width:0,
    height:0,
    x:0,
    y:0,
    rx:1,
    ry:1,
    start:0,
    data:[]
  }, opt)
  let step = rad(360 / o.data.length)
  let curr = rad(o.start)
  let ds = o.data.map((obj, i)=>{
    return place(o, obj, i, step)
  })
  return ds
  function place(cfg, obj, i, step){
    let n = {
      x:cfg.x + cfg.width * Math.cos(curr),
      y:cfg.y + cfg.height * Math.sin(curr),
      value:cfg.mapping(obj),
      data:i,
      index:i,
      startAngle:curr,
      endAngle:curr+step
    }
    curr = n.endAngle
    return n
  }
}

const types = {
  pie2d:myPie3d
}

var dmShape = {
  idmap:{},
  shape(id, type, option){
    this.idmap[id] = new dmSvg(id)
    let el = new types[type](this.idmap[id], option)
    el.draw(option.animateDuraing||300)
    return el
  },
  layout(type,option){
    return dmly[type] && dmly[type](option)
  }
}
export {
  dmSvg, dmShape, dsSvg
}