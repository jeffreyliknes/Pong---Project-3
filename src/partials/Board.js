import { SVG_NS } from "../settings";

export default class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;


  }

  render(svg) {
    let rect = document.createElementNS(SVG_NS, "rect");
    rect.setAttributeNS(null, "fill", "#749E00");
    rect.setAttributeNS(null, "width", this.width);
    rect.setAttributeNS(null, "height", this.height);
    rect.setAttributeNS(null, "rx", 15);
    rect.setAttributeNS(null, "ry", 15);

    let line = document.createElementNS(SVG_NS, "line");
    line.setAttributeNS(null, "x1", this.width / 2);
    line.setAttributeNS(null, "y1", 0);
    line.setAttributeNS(null, "x2", this.width / 2);
    line.setAttributeNS(null, "y2", this.height);
    line.setAttributeNS(null, "stroke", "white");
    line.setAttributeNS(null, "stroke-dasharray", "20, 15");
    line.setAttributeNS(null, "stroke-width", "4");


    // two circles to make semi circle on Pong Board
    let circle = document.createElementNS(SVG_NS, "circle");
    circle.setAttributeNS(null, "stroke", "white");
    circle.setAttributeNS(null, "fill", "#749E00");
    circle.setAttributeNS(null, "r", 100);
    circle.setAttributeNS(null, "cx", 5); 
    circle.setAttributeNS(null, "cy", 125); 

    let circle2 = document.createElementNS(SVG_NS, "circle");
    circle2.setAttributeNS(null, "stroke", "white");
    circle2.setAttributeNS(null, "fill", "#749E00");
    circle2.setAttributeNS(null, "r", 100);
    circle2.setAttributeNS(null, "cx", 505); 
    circle2.setAttributeNS(null, "cy", 125); 


    svg.appendChild(rect);
    svg.appendChild(line);
    svg.appendChild(circle);
    svg.appendChild(circle2);
   
  }
}
