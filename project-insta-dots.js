import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class ProjectInstaDots extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "project-insta-dots";
  }

  static get properties() {
    return {
      ...super.properties,
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
    return [
      super.styles,
      css`
        :host {
          display: inline-flex;
          align-items: center;
          gap: var(--ddd-spacing-2);
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background-color: var(--ddd-theme-default-limestoneLight);
          border: none;
          cursor: pointer;
          padding: var(--ddd-spacing-0);
        }

        .dot.active {
          background-color: var(--ddd-theme-default-skyBlue);
        }
      `,
    ];
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