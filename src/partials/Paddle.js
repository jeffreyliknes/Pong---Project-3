import { SVG_NS } from "../settings";

export default class Paddle {
  constructor(boardHeight, width, height, x, y, up, down, player) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 10;
    this.score = 0;
    
    this.keyUp = up;
    this.keyDown = down;
    this.player = player;
    this.keyState = {};

    document.addEventListener("keydown", event => {
      this.keyState[event.key || event.which] = true;
    }, true);

    document.addEventListener("keyup", event => {
      this.keyState[event.key || event.which] = false;
    }, true);

  
  } //end of constructor

  up() {
    console.log("up");
    this.y = this.y - this.speed;
    this.y = Math.max(this.y, 0);
  }

  down() {
    console.log("down");
    this.y = this.y + this.speed;
    this.y = Math.min(this.y, 256 - this.height);
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }
  

  render(svg) {

    if(this.keyState[this.keyUp] && this.player === "player1"){
      this.up();
    }
    if(this.keyState[this.keyDown] && this.player === "player1"){
      this.down();
    }
    if(this.keyState[this.keyUp] && this.player === "player2"){
      this.up();
    }
    if(this.keyState[this.keyDown] && this.player === "player2"){
      this.down();
    }
    let rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttributeNS(null, "fill", "white");
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "x", this.x);
    rect.setAttributeNS(null, "y", this.y);

    svg.appendChild(rect);
  }
}
