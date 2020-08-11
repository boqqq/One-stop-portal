const RAD = 0.0174533
function cos(a){
  return Math.cos(RAD*a)
}
function sin(a){
  return Math.sin(RAD*a)
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
/*
sx = 1 - (x + y) / 200  (60-460)
posx=(x-y)*sx
posy=(x+y)*sx*sy

 */
function tile(xy, sx = 0, sy = 0.5){
  if(sx== -1) return xy
  if(sx == 0)
    return [xy[0] - xy[1], (xy[0] + xy[1]) * sy]
  else{
    sx = 1 - (xy[0] + xy[1]) / sx
    return [(xy[0] - xy[1])*sx, (xy[0] + xy[1]) * sx * sy]
  }

  return [(xy[0] - xy[1]) * sx, (xy[0] + xy[1]) * sy]
}
function drawLine(opt){

}
function drawLine3d(opt){

}

export default {
  drawLine,rotateX,rotateXF, tile
}