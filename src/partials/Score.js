import { SVG_NS } from "../settings";

export default class Score {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

 // ceeating score positioned on board

  render(svg, score) {
    let text = document.createElementNS(SVG_NS, "text");
    text.setAttributeNS(null, "x", this.x);
    text.setAttributeNS(null, "y", this.y);
    text.setAttributeNS(null, "fill", "364708");
    text.setAttributeNS(null, "font-family", '"Silkscreen web", monotype');
    text.setAttributeNS(null, "font-size", this.size);
    text.textContent = score;
    svg.appendChild(text);
  }
}
