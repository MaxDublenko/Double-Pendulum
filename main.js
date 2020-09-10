let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 600;
cnv.height = 600;

// Create array for the line tracing as "memory" for where the line used to be and
// do dotted lines as oppose to regular lines to have less values in the arrays.

ctx.fillStyle = '#2A2B2DFF';
ctx.strokeStyle = '#2A2B2DFF';

let r1 = 200;
let r2 = 200;
let m1 = 40;
let m2 = 40;
let a1 = 0;
let a2 = 0;
let a1_v = 0;
let a2_v = 0;
let a1_a = 0.01;
let a2_a = -0.001;
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;
let g = 1;

requestAnimationFrame(draw)

ctx.translate(300, 50)

function draw() {
  ctx.clearRect(-300, -50, cnv.width, cnv.height);
  ctx.lineWidth = 2;

  // Following equations derived from http://www.physicsandbox.com/projects/double-pendulum.html

  let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
  let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
  let num3 = -2 * Math.sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos();

  // a1_a =

  x1 = r1 * Math.sin(a1);
  y1 = r1 * Math.cos(a1);

  x2 = x1 + r1 * Math.sin(a2);
  y2 = y1 + r1 * Math.cos(a2);

  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(x1, y1);
  ctx.stroke();


  ctx.beginPath();
  ctx.arc(x1, y1, m1, 0, 2 * Math.PI);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(x2, y2, m2, 0, 2 * Math.PI);
  ctx.fill();

  a1 += a1_v;
  a2 += a2_v;

  a1_v += a1_a;
  a2_v += a2_a;

  a1_v = 0.1;

  requestAnimationFrame(draw);
}
