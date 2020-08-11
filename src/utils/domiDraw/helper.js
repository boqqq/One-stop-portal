
const RAD = 0.0174533
function rad(a){
  return RAD*a
}
function cos(a){
  return Math.cos(RAD*a)
}
function sin(a){
  return Math.sin(RAD*a)
}
function round(v, n){
  n = n || 0
  return parseFloat(v.toFixed(n))
}
function $num(s){
  if(!s) return s
  if(typeof(s)=='string'){
    if(s.indexOf('.')>-1) return parseFloat(s)
    else return parseInt(s)
  }
  return s
}
function rotateX(xy, angle){
  let xx = Math.round(xy[0] * cos(angle) - xy[1] * sin(angle))
  let yy = Math.round(xy[0] * sin(angle) + xy[1] * cos(angle))
  return [xx, yy]
}
function rotateXF(xy, angle){
  let xx = Math.round(xy[0] * cos(angle) + xy[1] * sin(angle))
  let yy = Math.round(-1 * xy[0] * sin(angle) + xy[1] * cos(angle))
  return [xx, yy]
}
function tile(xy, yzip,xzip){
  yzip = yzip || 0.5
  xzip = xzip || 1
  return [(xy[0] - xy[1])*xzip, (xy[0] + xy[1]) * yzip]
}

function pix(value, parent){
  if(!isString(value))
    return value
  if (/px/.test(value)) {
    return round(parseFloat(value.replace('px','')));
  }
  if (/%/.test(value)) {
    return round(parseFloat(value) * parseFloat(parent) / 100);
  }
}
function easing(t, b, c, d){
  return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
}
function actEach(v1, v2, fn,duration){
  requestAnimationFrame(function(timestamp) {
    var start = timestamp || +new Date(), finish = start + duration, time, v21 = v2 - v1;
    (function tick(ticktime){
      time = ticktime || +new Date();
      var currentTime = time > finish ? duration : (time - start),
          current = easing(currentTime, v1, v21, duration);
      fn(current);
      if (time <= finish) {
        requestAnimationFrame(tick);
      }
    })(start);
  });
}
function actLoop(fn, duration, delay){
  var raf = new RAF()
  if(delay){
    raf.setTimeout(()=>{
      raf.setInterval(fn, duration)
    }, delay)
  }
}
var dFactor = (4 * (Math.sqrt(2) - 1) / 3) / (Math.PI / 2);
function curveTo(cx, cy, rx, ry, start, end, dx, dy) {
  var result = [],
      arcAngle = end - start;

  if ((end > start) && (end - start > Math.PI / 2 + 0.0001)) {
    result = result.concat(
        curveTo(cx, cy, rx, ry, start, start + (Math.PI / 2), dx, dy)
    );
    result = result.concat(
        curveTo(cx, cy, rx, ry, start + (Math.PI / 2), end, dx, dy)
    );
    return result;
  }
  if ((end < start) && (start - end > Math.PI / 2 + 0.0001)) {
    result = result.concat(
        curveTo(cx, cy, rx, ry, start, start - (Math.PI / 2), dx, dy)
    );
    result = result.concat(
        curveTo(cx, cy, rx, ry, start - (Math.PI / 2), end, dx, dy)
    );
    return result;
  }
  return [
    'C',
    cx + (rx * Math.cos(start)) -
    ((rx * dFactor * arcAngle) * Math.sin(start)) + dx,
    cy + (ry * Math.sin(start)) +
    ((ry * dFactor * arcAngle) * Math.cos(start)) + dy,
    cx + (rx * Math.cos(end)) +
    ((rx * dFactor * arcAngle) * Math.sin(end)) + dx,
    cy + (ry * Math.sin(end)) -
    ((ry * dFactor * arcAngle) * Math.cos(end)) + dy,

    cx + (rx * Math.cos(end)) + dx,
    cy + (ry * Math.sin(end)) + dy
  ];
}
class RAF {
  constructor () {
    this.init()
  }
  init () {
    this._timerIdMap = {
      timeout: {},
      interval: {}
    }
  }
  run (type = 'interval', cb, interval = 16.7) {
    const now = Date.now
    let stime = now()
    let etime = stime
    //创建Symbol类型作为key值，保证返回值的唯一性，用于清除定时器使用
    const timerSymbol = Symbol()
    const loop = () => {
      this.setIdMap(timerSymbol, type, loop)
      etime = now()
      if (etime - stime >= interval) {
        if (type === 'interval') {
          stime = now()
          etime = stime
        }
        cb()
        type === 'timeout' && this.clearTimeout(timerSymbol)
      }
    }
    this.setIdMap(timerSymbol, type, loop)
    return timerSymbol // 返回Symbol保证每次调用setTimeout/setInterval返回值的唯一性
  }
  setIdMap (timerSymbol, type, loop) {
    const id = requestAnimationFrame(loop)
    this._timerIdMap[type][timerSymbol]= id
  }
  setTimeout (cb, interval) {  // 实现setTimeout 功能
    return this.run('timeout', cb, interval)
  }
  clearTimeout (timer) {
    cancelAnimationFrame(this._timerIdMap.timeout[timer])
  }
  setInterval (cb, interval) { // 实现setInterval功能
    return this.run('interval', cb, interval)
  }
  clearInterval (timer) {
    cancelAnimationFrame(this._timerIdMap.interval[timer])
  }
}

export {
  rotateX,rotateXF, tile, actEach, actLoop, sin, cos, rad, pix, round, $num, RAF,curveTo
}