import { LitElement, html, css } from "lit";

export class ProjectInstaSlide extends LitElement {
  static get tag() {
    return "project-insta-slide";
  }

  static get properties() {
    return {
      instaChannel: { type: String, attribute: "insta-channel" },
      instaUsername: { type: String, attribute: "insta-username" },
      profilePic: { type: String, attribute: "profile-pic" },
      userSince: { type: String, attribute: "user-since" },
      image: { type: String },
      instaCaption: { type: String, attribute: "insta-caption" },
      dateTaken: { type: String, attribute: "date-taken" },
      liked: { type: Boolean }
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
  }

  static get styles() {
    return css`
      :host {
        display: block;
      }

      .card {
        width: 100%;
        background: white;
        border-radius: 16px;
        padding: 12px;
        box-sizing: border-box;
        color: #000;
      }

      .header {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 8px;
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
        gap: 2px;
      }

      .channel-name {
        font-weight: bold;
        font-size: 14px;
        color: #000;
      }

      .username {
        font-size: 13px;
        color: #555;
      }

      .member-since {
        font-size: 11px;
        color: #888;
      }

      .image {
        width: 100%;
        margin: 10px 0;
        border-radius: 10px;
        display: block;
      }

      .like-row {
        display: flex;
        justify-content: flex-start;
        margin-bottom: 8px;
      }

      .like-btn {
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
      }

      .caption {
        font-size: 14px;
        color: #000;
        margin-bottom: 4px;
      }

      .date {
        font-size: 12px;
        color: #888;
      }

      @media (prefers-color-scheme: dark) {
        .card {
          background: #1e1e1e;
          color: #fff;
        }
        .channel-name { color: #fff; }
        .username { color: #aaa; }
        .caption { color: #fff; }
      }
    `;
  }

  handleLikeClick() {
    this.dispatchEvent(
      new CustomEvent("toggle-like", {
        bubbles: true,
        composed: true,
      })
    );
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

        <img class="image" src="${this.image}" alt="${this.instaCaption}" />

        <div class="like-row">
          <button class="like-btn" @click=${this.handleLikeClick}>
            ${this.liked ? "❤️" : "🤍"}
          </button>
        </div>

        <div class="caption">${this.instaCaption}</div>
        <div class="date">${this.dateTaken}</div>
      </div>
    `;
  }
}

customElements.define(ProjectInstaSlide.tag, ProjectInstaSlide);