import { LitElement, html, css } from "lit";

export class ProjectInstaDots extends LitElement {
  static get tag() {
    return "project-insta-dots";
  }

  static get properties() {
    return {
      count: { type: Number },
      active: { type: Number },
    };
  }

  constructor() {
    super();
    this.count = 0;
    this.active = 0;
  }

  static get styles() {
    return css`
      :host {
        display: inline-flex;
        align-items: center;
        gap: 8px;
      }

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #d9d9d9;
        border: none;
        cursor: pointer;
        padding: 0;
      }

      .dot.active {
        background-color: #3b82f6;
      }
    `;
  }

  dotClick(i) {
    this.dispatchEvent(
      new CustomEvent("dot-clicked", {
        bubbles: true,
        composed: true,
        detail: { index: i },
      })
    );
  }

  render() {
    return html`
      ${Array.from({ length: this.count }, (_, i) => html`
        <button
          class="dot ${i === this.active ? "active" : ""}"
          @click=${() => this.dotClick(i)}
          aria-label="Go to slide ${i + 1}"
        ></button>
      `)}
    `;
  }
}

globalThis.customElements.define(ProjectInstaDots.tag, ProjectInstaDots);