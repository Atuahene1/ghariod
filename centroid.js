// centroid.js

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const W = canvas.width;
const H = canvas.height;
const N_POINTS = 7;

function randomPoints(n) {
  return Array.from({length: n}, () => ({
    x: Math.random() * (W - 60) + 30,
    y: Math.random() * (H - 60) + 30
  }));
}

function computeCentroid(points) {
  const n = points.length;
  const sum = points.reduce((acc, p) => ({x: acc.x + p.x, y: acc.y + p.y}), {x:0, y:0});
  return { x: sum.x / n, y: sum.y / n };
}

function draw(points, centroid) {
  ctx.clearRect(0, 0, W, H);
  // Draw dotted lines
  ctx.save();
  ctx.setLineDash([5, 5]);
  ctx.strokeStyle = '#888';
  points.forEach(p => {
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
    ctx.lineTo(centroid.x, centroid.y);
    ctx.stroke();
  });
  ctx.restore();
  // Draw points
  points.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, 7, 0, 2 * Math.PI);
    ctx.fillStyle = '#1976d2';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
  });
  // Draw centroid
  ctx.beginPath();
  ctx.arc(centroid.x, centroid.y, 10, 0, 2 * Math.PI);
  ctx.fillStyle = '#e53935';
  ctx.fill();
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#fff';
  ctx.stroke();
}

function generate() {
  const points = randomPoints(N_POINTS);
  const centroid = computeCentroid(points);
  draw(points, centroid);
}

document.getElementById('generate').onclick = generate;

generate();
