let cnv = document.getElementById("canvas");
let ctx = cnv.getContext("2d");
cnv.width = 600;
cnv.height = 600;

ctx.fillStyle = '#2A2B2DFF';
ctx.strokeStyle = '#2A2B2DFF';

let r1 = 200;
let r2 = 200;
let m1 = 20;
let m2 = 20;
let a1 = Math.PI/2;
let a2 = Math.PI/2;
let a1_v = 0;
let a2_v = 0;
let x1 = 0;
let y1 = 0;
let x2 = 0;
let y2 = 0;
let g = 1;
let size = 0.5;
let traceCircleR = m2 / 2 * size;
let traceLine = [];

let speed = 1;

requestAnimationFrame(draw)

ctx.translate(300, 50)

let a1_a = 0;
let a2_a = 0;

document.getElementById('cos').addEventListener('click', cosHandler)

let cosClicked = 0;

function cosHandler() {
  if (cosClicked % 2 == 0) {
    document.getElementById('cosp').innerHTML = "C";
  } else {
    document.getElementById('cosp').innerHTML = "S";
  }
  cosClicked++;
}

function draw() {
  ctx.clearRect(-300, -50, cnv.width, cnv.height);
  ctx.lineWidth = 2;

  let num1 = -g * (2 * m1 + m2) * Math.sin(a1);
  let num2 = -m2 * g * Math.sin(a1 - 2 * a2);
  let num3 = -2 * Math.sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * Math.cos(a1-a2);
  let den = r1 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));

  // Following equations derived from http://www.physicsandbox.com/projects/double-pendulum.html

  a1_a = (num1 + num2 + num3 * num4) / den;

  num1 = 2 * Math.sin(a1 - a2);
  num2 = a1_v * a1_v * r1 * (m1 + m2);
  num3 = g * (m1 + m2) * Math.cos(a1);
  num4 = a2_v * a2_v * r2 * m2 * Math.cos(a1 - a2);
  den = r2 * (2 * m1 + m2 - m2 * Math.cos(2 * a1 - 2 * a2));

  a2_a = (num1 * (num2 + num3 + num4)) / den;

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

  // Tracing a line

  traceLine.push({
    x: x2,
    y: y2
  });

  for (i=0; i<traceLine.length; i++) {
    if (cosClicked % 2 == 0) {
      ctx.fillRect(traceLine[i].x, traceLine[i].y, traceCircleR, traceCircleR);
    } else {
      ctx.beginPath();
      ctx.arc(traceLine[i].x, traceLine[i].y, traceCircleR, 0, 2 * Math.PI);
      ctx.fill();
    }
  }

  a1_v += a1_a / speed;
  a2_v += a2_a / speed;
  a1 += a1_v;
  a2 += a2_v;

  requestAnimationFrame(draw);
}

document.getElementById('la').addEventListener('click', lapressed)

function lapressed() {
  m1 -= 1;
  if (m1 < 1) {
    alert('Top Ball Mass too small')
    m1 += 1;
  } else {
    document.getElementById('tbm').value = m1;
  }
}

document.getElementById('la1').addEventListener('click', la1pressed)

function la1pressed() {
  m2 -= 1;
  if (m2 < 1) {
    alert('Bottom Ball Mass too small')
    m2 += 1;
  } else {
    document.getElementById('bbm').value = m2;
  }
}

document.getElementById('ra').addEventListener('click', rapressed)

function rapressed() {
  m1 += 1;
  document.getElementById('tbm').value = m1;
}

document.getElementById('ra1').addEventListener('click', ra1pressed)

function ra1pressed() {
  m2 += 1;
  document.getElementById('bbm').value = m2;
}

document.getElementById('la2').addEventListener('click', la2pressed)

function la2pressed() {
  g -= 0.1;
  if (g <= 0.01) {
    alert('Gravity is too small')
    g += 0.1;
  } else {
    document.getElementById('g').value = g;
  }
  console.log(g)
}

document.getElementById('ra2').addEventListener('click', ra2pressed)

function ra2pressed() {
  g += 0.1;
  document.getElementById('g').value = g;
}

document.getElementById('ra3').addEventListener('click', ra3pressed)

function ra3pressed() {
  r1 += 1;
  document.getElementById('tcl').value = r1;
}

document.getElementById('la3').addEventListener('click', la3pressed)

function la3pressed() {
  r1 -= 1;
  document.getElementById('tcl').value = r1;
}

document.getElementById('rst').addEventListener('click', rstHandler)

function rstHandler() {
  r1 = 200;
  r2 = 200;
  m1 = 20;
  m2 = 20;
  a1 = Math.PI/2;
  a2 = Math.PI/2;
  a1_v = 0;
  a2_v = 0;
  x1 = 0;
  y1 = 0;
  x2 = 0;
  y2 = 0;
  g = 1;
  size = 0.5;
  traceCircleR = m2 / 2 * size;
  traceLine = [];
  a1_a = 0;
  a2_a = 0;
  document.getElementById('tbm').value = m1;
  document.getElementById('bbm').value = m2;
  document.getElementById('g').value = g;
  document.getElementById('tcl').value = r1;
}








































































































































































































































































// End of Project
