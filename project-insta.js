/**
 * Copyright 2026 Hyunseok Lee
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./project-insta-slide.js";
import "./project-insta-nav.js";
import "./project-insta-dots.js";

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

    this.data = [];
    this.index = 0;
    this.slideCount = 0;
    this.likes = [];
  }

  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      data: { type: Array },
      index: { type: Number },
      slideCount: { type: Number },
      likes: { type: Array },
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
          padding: 16px;
          box-sizing: border-box;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
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

  async firstUpdated() {
    const response = await fetch("./project-insta.json");
    const json = await response.json();

    this.data = json.data;
    this.slideCount = this.data.length;
    this.index = 0;

    this.likes = this.data.map((_, i) => {
      return localStorage.getItem("liked_" + i) === "true";
    });
  }

  toggleLike(i) {
    const updatedLikes = [...this.likes];
    updatedLikes[i] = !updatedLikes[i];
    this.likes = updatedLikes;
    localStorage.setItem("liked_" + i, this.likes[i]);
  }

  next() {
    if (this.index < this.slideCount - 1) {
      this.index += 1;
    }
  }

  prev() {
    if (this.index > 0) {
      this.index -= 1;
    }
  }

  handleNavClick(e) {
    if (e.detail.direction === "previous" || e.detail.direction === "prev") {
      this.prev();
    } else {
      this.next();
    }
  }

  handleDotClick(e) {
    this.index = e.detail.index;
  }

  render() {
    if (!this.data.length) {
      return html`<div class="wrapper">Loading...</div>`;
    }

    const item = this.data[this.index];

    return html`
      <div class="wrapper">
        <div class="controls">
          <play-list-nav
            direction="previous"
            .disabled=${this.index === 0}
            @nav-click=${this.handleNavClick}
          ></play-list-nav>

          <project-insta-dots
            .count=${this.slideCount}
            .active=${this.index}
            @dot-clicked=${this.handleDotClick}
          ></project-insta-dots>

          <play-list-nav
            direction="next"
            .disabled=${this.index === this.slideCount - 1}
            @nav-click=${this.handleNavClick}
          ></play-list-nav>
        </div>

        <project-insta-slide
          insta-channel="${item.author.instaChannel}"
          insta-username="${item.author.instaUsername}"
          profile-pic="${item.author.profilePic}"
          user-since="${item.author.userSince}"
          .image="${item.image.fullsizeSource}"
          insta-caption="${item.post.instaCaption}"
          date-taken="${item.image.dateTaken}"
          .liked=${this.likes[this.index]}
          @toggle-like=${() => this.toggleLike(this.index)}
        ></project-insta-slide>
      </div>
    `;
  }
}

globalThis.customElements.define(ProjectInsta.tag, ProjectInsta);