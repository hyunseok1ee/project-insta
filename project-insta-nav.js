import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class PlayListNav extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "play-list-nav";
  }

  static get properties() {
    return {
      ...super.properties,
      direction: { type: String, reflect: true },
      disabled: { type: Boolean, reflect: true },
    };
  }

  constructor() {
    super();
    this.direction = "next";
    this.disabled = false;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: inline-block;
        }

        button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 56px;
          height: 56px;
          border: 3px solid var(--ddd-theme-default-beaverBlue);
          border-radius: 50%;
          background-color: var(--ddd-theme-default-white);
          color: var(--ddd-theme-default-beaverBlue);
          cursor: pointer;
          font-size: var(--ddd-font-size-2xl);
          font-weight: var(--ddd-font-weight-bold);
          line-height: 1;
          padding: var(--ddd-spacing-0);
        }

        button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }
      `,
    ];
  }

  handleClick() {
    if (this.disabled) {
      return;
    }

    this.dispatchEvent(
      new CustomEvent("nav-click", {
        detail: { direction: this.direction },
        bubbles: true,
        composed: true,
      })
    );
  }

  render() {
    const isPrev = this.direction === "previous" || this.direction === "prev";

    return html`
      <button
        type="button"
        ?disabled=${this.disabled}
        aria-label=${isPrev ? "Previous" : "Next"}
        @click=${this.handleClick}
      >
        ${isPrev ? "‹" : "›"}
      </button>
    `;
  }
}

globalThis.customElements.define(PlayListNav.tag, PlayListNav);