/**
 * Copyright 2026 Hyunseok Lee
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./project-insta-slide.js";

export class ProjectInsta extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "project-insta";
  }

  constructor() {
    super();
    this.title = "";
    this.t = {
      title: "Title",
    };
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          width: 100%;
          max-width: 620px;
          margin: 40px auto;
          background-color: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: var(--ddd-boxShadow-sm);
        }

        .wrapper {
          width: 100%;
        }

        @media (prefers-color-scheme: dark) {
          :host {
            background-color: #111;
            color: white;
          }
        }
      `,
    ];
  }

  render() {
    return html`
      <div class="wrapper">
        <slot></slot>
      </div>
    `;
  }
}

globalThis.customElements.define(ProjectInsta.tag, ProjectInsta);