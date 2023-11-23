const squareSize = 30;

function drawSquare(x, y, color, ctx) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, squareSize, squareSize);
}

function drawTriangle(x, y, color, ctx) {
  const spriteSize = 8;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - spriteSize * 2);
  ctx.lineTo(x + spriteSize * 2, y + spriteSize * 2);
  ctx.lineTo(x - spriteSize * 2, y + spriteSize * 2);
  ctx.closePath();
  ctx.fill();
}

function drawCross(x, y, color, ctx) {
  const spriteSize = 12;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(x - spriteSize, y - spriteSize);
  ctx.lineTo(x + spriteSize, y + spriteSize);
  ctx.moveTo(x - spriteSize, y + spriteSize);
  ctx.lineTo(x + spriteSize, y - spriteSize);
  ctx.stroke();
}

function drawCircle(x, y, color, ctx) {
  ctx.fillStyle = color;
  ctx.beginPath();
  let radius = 16;
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fill();
}

export { drawSquare, drawTriangle, drawCross, drawCircle, squareSize };
