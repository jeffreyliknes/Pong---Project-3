import { SVG_NS } from "../settings";

export default class Ball {
  constructor(radius, boardWidth, boardHeight) {
    this.radius = radius;
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.direction = 1;

    this.ping = new Audio("public/sounds/pong-03.wav");
    this.scored = new Audio(
      "public/sounds/209578__zott820__cash-register-purchase.wav"
    );
    this.reset();
  }

  reset() {
    this.ax = 0.009;
    this.ay = 0.009;

    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }
    this.vx = this.direction * (8 - Math.abs(this.vy));
    if (this.vx <= 0) {
      this.ax *= -1;
    }
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitTop || hitBottom) {
      this.vy *= -1;
      this.ay = -this.ay;
    } else if (hitRight || hitLeft) {
      this.vx *= -1;
      this.ax = -this.ax;
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      let paddle = player2.coordinates(
        player2.x,
        player2.y,
        player2.width,
        player2.height
      );
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x + this.radius >= leftX &&
        this.x + this.radius <= rightX &&
        (this.y >= topY && this.y <= bottomY)
      ) {
        this.vx *= -1;
        this.ping.play();
      }
    } else {
      let paddle = player1.coordinates(
        player1.x,
        player1.y,
        player1.width,
        player1.height
      );
      let [leftX, rightX, topY, bottomY] = paddle;

      if (
        this.x - this.radius <= rightX &&
        this.x - this.radius >= leftX &&
        (this.y >= topY && this.y <= bottomY)
      ) {
        this.vx *= -1;
        this.ping.play();
      }
    }
  }

  goal(player) {
    player.score++;
    this.scored.play();
    this.reset();
  }

  render(svg, player1, player2) {
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;
    if (rightGoal) {
      this.goal(player1);
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }
    
    this.x += this.vx;
    this.y += this.vy;

    this.vx += this.ax;
    this.vy += this.ay;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    // draw ball
    let ball = document.createElementNS(SVG_NS, "circle");
    ball.setAttributeNS(null, "fill", "white");
    ball.setAttributeNS(null, "stroke", "black");
    ball.setAttributeNS(null, "r", this.radius);
    ball.setAttributeNS(null, "cx", this.x); //x of center point
    ball.setAttributeNS(null, "cy", this.y); //y of center point

    svg.appendChild(ball);
  }
}
