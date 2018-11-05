import Board from "./Board";
import Paddle from "./Paddle";
import Ball from "./Ball";
import Score from "./Score";
import Winner from "./Winner";
import { SVG_NS, KEYS } from "../settings";

export default class Game {
  constructor(element, width, height) {
    this.element = element;
    this.width = width;
    this.height = height;

    this.paddleWidth = 8;
    this.paddleHeight = 56;
    this.boardGap = 10;

    this.radius = 8;
    this.boardWidth = 512;
    this.boardHeight = 256;
    this.direction = 1;

    this.player1 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.boardGap,
      (this.height - this.paddleWidth) / 2,
      KEYS.a,
      KEYS.z,
      "player1"
    );

    this.player2 = new Paddle(
      this.height,
      this.paddleWidth,
      this.paddleHeight,
      this.width - this.boardGap - this.paddleWidth,
      (this.height - this.paddleHeight) / 2,
      KEYS.up,
      KEYS.down,
      "player2"
    );

    this.ball = new Ball(
      this.radius,
      this.boardWidth,
      this.boardHeight,
      this.direction
    );
        // Winning game message position
    this.winner = new Winner(this.width / 3 - 170, this.height / 4, 50);

    this.score1 = new Score(this.width / 2 - 60, 240, 60);
    this.score2 = new Score(this.width / 2 + 25, 240, 60);

    document.addEventListener("keydown", event => {
      switch (event.key) {
        case KEYS.spaceBar:
          this.pause = !this.pause;
          break;
      }
    });

    this.gameElement = document.getElementById(this.element);
    this.board = new Board(this.width, this.height);
  } //end of constructor

  //set up for winner message and automatic pause when game is won
  winnerMessage(player1, player2, svg) {
    //winning score = 5
    if (player1.score >= 5) {
      this.pause = !this.pause;
      this.winner.render(svg, "Player Left Wins");
    } else if (player2.score >= 5) {
      this.pause = !this.pause;
      this.winner.render(svg, " Player Right Wins");
    }
  }

  render() {
    if (this.pause) {
      return;
    }

    this.gameElement.innerHTML = "";
    let svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttributeNS(null, "width", this.width);
    svg.setAttributeNS(null, "height", this.height);
    svg.setAttributeNS(null, "viewbox", `0 0 ${this.width} ${this.height}`);
    this.gameElement.appendChild(svg);

    this.board.render(svg);

    this.player1.render(svg);
    this.player2.render(svg);

    this.ball.render(svg, this.player1, this.player2);
    this.ball.render(svg, this.player1, this.player2);

    this.score1.render(svg, this.player1.score);
    this.score2.render(svg, this.player2.score);
    this.winnerMessage(this.player1, this.player2, svg);
  }
}
