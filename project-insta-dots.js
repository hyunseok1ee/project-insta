import { LitElement, html, css } from "lit";

export class PlayListDots extends LitElement {
  static get tag() {
    return "play-list-dots";
  }

  static get properties() {
    return {
      count: { type: Number },
      active: { type: Number },
    };
  }

  constructor() {
    super();
    this.count = 4;
    this.active = 0;
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: var(--ddd-spacing-2);
      }

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: var(--ddd-theme-default-white);
        border: 2px solid var(--ddd-theme-default-white);
        opacity: 0.7;
      }

      .dot.active {
        background-color: var(--ddd-theme-default-skyBlue);
        border-color: var(--ddd-theme-default-skyBlue);
        opacity: 1;
      }
    `;
  }

  render() {
    const dots = [];

    for (let i = 0; i < this.count; i++) {
      dots.push(html`
        <span class="dot ${i === this.active ? "active" : ""}"></span>
      `);
    }

    return html`${dots}`;
  }
}

globalThis.customElements.define(PlayListDots.tag, PlayListDots);