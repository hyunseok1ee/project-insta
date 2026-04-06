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
    this.t = this.t || {};
    this.t = { ...this.t, title: "Title" };

    this.data = [];
    this._index = 0;
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

  // index getter/setter — URL 동기화
  get index() {
    return this._index;
  }

  set index(val) {
    const old = this._index;
    this._index = val;
    this.requestUpdate("index", old);

    // URL에 activeIndex 반영
    const url = new URL(window.location.href);
    url.searchParams.set("activeIndex", val);
    window.history.replaceState({}, "", url.toString());
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
          color-scheme: light dark;
          font-family: var(--ddd-font-navigation);
          width: 100%;
          max-width: 620px;
          margin: var(--ddd-spacing-10) auto;
          background-color: light-dark(var(--ddd-theme-default-white), var(--ddd-theme-default-nittanyNavy));
          color: light-dark(var(--ddd-theme-default-nittanyNavy), white);
          border-radius: var(--ddd-radius-md);
          overflow: hidden;
          box-shadow: var(--ddd-boxShadow-sm);
        }

        .wrapper {
          width: 100%;
          padding: var(--ddd-spacing-4);
          box-sizing: border-box;
        }

        .controls {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--ddd-spacing-3);
          margin-bottom: var(--ddd-spacing-4);
        }

        @media (max-width: 480px) {
          :host {
            margin: var(--ddd-spacing-4) auto;
            border-radius: var(--ddd-radius-sm);
          }
        }
      `,
    ];
  }

  async firstUpdated() {
    const url = new URL("./project-insta.json", import.meta.url).href;
    const response = await fetch(url);
    const json = await response.json();

    this.data = json.data;
    this.slideCount = this.data.length;

    const params = new URLSearchParams(window.location.search);
    const urlIndex = parseInt(params.get("activeIndex"));
    const startIndex = (!isNaN(urlIndex) && urlIndex >= 0 && urlIndex < this.slideCount)
      ? urlIndex
      : 0;

    this.likes = this.data.map((_, i) => {
      return localStorage.getItem("liked_" + i) === "true";
    });

    this.index = startIndex;
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

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(ProjectInsta.tag, ProjectInsta);