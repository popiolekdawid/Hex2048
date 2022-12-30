import React from "react"

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        hexSize: 50,
        hexOrigin: {x: 100, y: 130}
    }
  }

  componentWillMount() {
      this.setState({
          canvasSize: { canvasWidth: 600, canvasHeight: 600 }
      })
  }

  componentDidMount() {
      const { canvasWidth, canvasHeight } = this.state.canvasSize;
      this.canvashex.width = canvasWidth;
      this.canvashex.height = canvasHeight;
      let centerline = 300;
      let top_row_x = 125; //set where the top of the grid is
      let value = 0;
      let rows = [3, 4, 5, 4, 3]
      for (let i = 0; i < rows.length; i++) {
          let is_centered = i % 2;
          if (is_centered === 0) {
              this.drawHex(value, this.canvashex, { x: centerline, y: top_row_x + i * 85})
          }
          let num_sides = Math.floor(rows[i] / 2)
          for (let j=1; j<num_sides+1; j++) {
              if (is_centered === 1) {
                  this.drawHex(value, this.canvashex, {
                      x: centerline + this.state.hexSize * 2 * j - this.state.hexSize,
                      y: top_row_x + i*85
                  })
                  this.drawHex(value, this.canvashex, {
                      x: centerline + this.state.hexSize * 2 * -j + this.state.hexSize,
                      y: top_row_x + i*85
                  })
              } else {
                  this.drawHex(value, this.canvashex, {
                      x: centerline + this.state.hexSize * 2 * j,
                      y: top_row_x + i*85
                  })
                  this.drawHex(value, this.canvashex, {
                      x: centerline + this.state.hexSize * 2 * -j,
                      y: top_row_x + i*85
                  })
              }
          }
      }
  }

  drawValue(value, canvasID, center) {
      const ctx = canvasID.getContext('2d');  //display 
      ctx.beginPath();
      ctx.strokeText(value, center.x-3, center.y+3); 
      ctx.stroke();
      ctx.closePath();
  }

  drawHex(value, canvasID, center) {
      this.drawValue(value, canvasID, center);
      for(let i=0; i <= 5; i++) {
          let start = this.getHexCornerCord(center, i);
          let end = this.getHexCornerCord(center, i+1);
          this.drawLine(canvasID, { x: start.x, y: start.y }, { x: end.x, y: end.y })
      }
  }

  getHexCornerCord(center, i) {
      let angle_deg = 60*i - 30;
      let angle_rad = Math.PI / 180 * angle_deg;
      let x = center.x + this.state.hexSize * Math.cos(angle_rad);
      let y = center.y + this.state.hexSize * Math.sin(angle_rad);
      return this.Point(x, y);
  }

  Point(x,y) {
      return {x: x, y: y};
  }

  drawLine(canvasID, start, end, center) {
      const ctx = canvasID.getContext('2d');
      ctx.beginPath();
      //ctx.strokeText("Hello World", center.x, center.y); 
      ctx.moveTo(start.x, start.y);
      ctx.lineTo(end.x, end.y);
      ctx.stroke();
      ctx.closePath();
  }

  drawHexCordinates(canvasID, center, h) {
      const ctx = canvasID.getContext('2d');
      ctx.fillText(h.q, center.x-10, center.y);
      ctx.fillText(h.q, center.x+7, center.y);
  }

  render() {
      return (
          <div>
              <canvas ref={canvashex => this.canvashex = canvashex}> </canvas>
          </div>
      )
  }
}