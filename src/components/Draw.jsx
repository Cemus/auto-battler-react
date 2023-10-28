import { Component } from "react";
import PropTypes from "prop-types";

class Draw extends Component {
  constructor(props) {
    super(props);
    this.squareSize = 30;
  }

  drawSquare(x, y, color) {
    this.props.ctx.fillStyle = color;
    this.props.ctx.fillRect(x, y, this.squareSize, this.squareSize);
  }
  drawTriangle(x, y, color) {
    this.props.ctx.fillStyle = color;
    this.props.ctx.beginPath();
    this.props.ctx.moveTo(x, y);
    this.props.ctx.lineTo(x + 20, y + 40);
    this.props.ctx.lineTo(x - 20, y + 40);
    this.props.ctx.closePath();
    this.props.ctx.fill();
  }
  drawCross(x, y, color) {
    this.props.ctx.strokeStyle = color;
    this.props.ctx.lineWidth = 3;
    this.props.ctx.beginPath();
    this.props.ctx.moveTo(x - 10, y - 10);
    this.props.ctx.lineTo(x + 10, y + 10);
    this.props.ctx.moveTo(x - 10, y + 10);
    this.props.ctx.lineTo(x + 10, y - 10);
    this.props.ctx.stroke();
  }

  drawCircle(x, y, color) {
    this.props.ctx.fillStyle = color;
    this.props.ctx.beginPath();
    let radius = 15;
    this.props.ctx.arc(x, y, radius, 0, Math.PI * 2);
    this.props.ctx.fill();
  }
  render() {
    return false;
  }
}

Draw.propTypes = {
  ctx: PropTypes.object.isRequired,
  canvas: PropTypes.object.isRequired,
  createGrid: PropTypes.object.isRequired,
};

export default Draw;
