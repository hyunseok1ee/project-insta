import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

export class ProjectInstaSlide extends DDDSuper(I18NMixin(LitElement)) {
  static get tag() {
    return "project-insta-slide";
  }

  static get properties() {
    return {
      ...super.properties,
      instaChannel: { type: String, attribute: "insta-channel" },
      instaUsername: { type: String, attribute: "insta-username" },
      profilePic: { type: String, attribute: "profile-pic" },
      userSince: { type: String, attribute: "user-since" },
      image: { type: String },
      instaCaption: { type: String, attribute: "insta-caption" },
      dateTaken: { type: String, attribute: "date-taken" },
      liked: { type: Boolean },
      _copied: { type: Boolean, state: true },
    };
  }

  constructor() {
    super();
    this.instaChannel = "";
    this.instaUsername = "";
    this.profilePic = "";
    this.userSince = "";
    this.image = "";
    this.instaCaption = "";
    this.dateTaken = "";
    this.liked = false;
    this._copied = false;
  }

  static get styles() {
    return [
      super.styles,
      css`
        :host {
          display: block;
        }

        .card {
          width: 100%;
          background: light-dark(white, var(--ddd-theme-default-nittanyNavy));
          border-radius: var(--ddd-radius-lg);
          padding: var(--ddd-spacing-3);
          box-sizing: border-box;
          color: light-dark(var(--ddd-theme-default-nittanyNavy), white);
        }

        .header {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-3);
          margin-bottom: var(--ddd-spacing-2);
        }

        .profile-pic {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          object-fit: cover;
          flex-shrink: 0;
        }

        .author-info {
          display: flex;
          flex-direction: column;
          gap: var(--ddd-spacing-1);
        }

        .channel-name {
          font-weight: var(--ddd-font-weight-bold);
          font-size: var(--ddd-font-size-3xs);
          color: light-dark(var(--ddd-theme-default-nittanyNavy), white);
        }

        .username {
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-skyBlue);
        }

        .member-since {
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-limestoneGray);
        }

        .image-wrapper {
          width: 100%;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          border-radius: var(--ddd-radius-md);
          margin: var(--ddd-spacing-2) 0;
          background-color: light-dark(var(--ddd-theme-default-limestoneLight), var(--ddd-theme-default-potentialMidnight));
        }

        .image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .action-row {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          gap: var(--ddd-spacing-1);
          margin-bottom: var(--ddd-spacing-2);
        }

        .like-btn {
          background: none;
          border: none;
          font-size: var(--ddd-font-size-s);
          cursor: pointer;
          padding: var(--ddd-spacing-1);
        }

        .share-btn {
          display: flex;
          align-items: center;
          gap: var(--ddd-spacing-1);
          background: none;
          border: none;
          padding: var(--ddd-spacing-1);
          font-size: var(--ddd-font-size-4xs);
          cursor: pointer;
          color: light-dark(var(--ddd-theme-default-limestoneGray), var(--ddd-theme-default-limestoneLight));
          transition: color 0.2s;
        }

        .share-btn:hover {
          color: light-dark(var(--ddd-theme-default-nittanyNavy), white);
        }

        .share-btn.copied {
          color: var(--ddd-theme-default-opportunityGreen);
        }

        .share-icon {
          width: 16px;
          height: 16px;
          fill: currentColor;
        }

        .caption {
          font-size: var(--ddd-font-size-3xs);
          color: light-dark(var(--ddd-theme-default-nittanyNavy), white);
          margin-bottom: var(--ddd-spacing-1);
        }

        .date {
          font-size: var(--ddd-font-size-4xs);
          color: var(--ddd-theme-default-limestoneGray);
        }

        @media (max-width: 480px) {
          .card {
            border-radius: var(--ddd-radius-md);
          }
        }
      `,
    ];
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }

  handleLikeClick() {
    this.dispatchEvent(
      new CustomEvent("toggle-like", {
        bubbles: true,
        composed: true,
      })
    );
  }

  async handleShare() {
    const url = window.location.href;
    await navigator.clipboard.writeText(url);
    this._copied = true;
    setTimeout(() => {
      this._copied = false;
    }, 2000);
  }

  render() {
    return html`
      <div class="card">
        <div class="header">
          <img class="profile-pic" src="${this.profilePic}" alt="${this.instaChannel}" />
          <div class="author-info">
            <span class="channel-name">${this.instaChannel}</span>
            <span class="username">${this.instaUsername}</span>
            <span class="member-since">Member since ${this.userSince}</span>
          </div>
        </div>

        <div class="image-wrapper">
          <img class="image" src="${this.image}" alt="${this.instaCaption}" loading="lazy" />
        </div>

        <div class="action-row">
          <button class="like-btn" aria-label=${this.liked ? "Unlike this post" : "Like this post"} @click=${this.handleLikeClick}>
            ${this.liked ? "❤️" : "🤍"}
          </button>

          <button
            class="share-btn ${this._copied ? "copied" : ""}"
            aria-label="Share this post"
            @click=${this.handleShare}
          >
            <svg class="share-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 16.08c-.76 0-1.44.3-1.96.77L8.91 12.7c.05-.23.09-.46.09-.7s-.04-.47-.09-.7l7.05-4.11A2.99 2.99 0 0 0 18 8a3 3 0 1 0-3-3c0 .24.04.47.09.7L8.04 9.81A3 3 0 0 0 6 9a3 3 0 1 0 3 3c0-.24-.04-.47-.09-.7l7.05-4.11c.52.47 1.2.77 1.96.77a3 3 0 1 0 0-6z"/>
            </svg>
            ${this._copied ? "Copied!" : "Share"}
          </button>
        </div>

        <div class="caption">${this.instaCaption}</div>
        <div class="date">${this.dateTaken}</div>
      </div>
    `;
  }
}

globalThis.customElements.define(ProjectInstaSlide.tag, ProjectInstaSlide);