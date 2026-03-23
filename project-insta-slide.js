import { LitElement, html, css } from "lit";

export class ProjectInstaSlide extends LitElement {
  static get tag() {
    return "project-insta-slide";
  }

  constructor() {
    super();
    this.topHeading = "Username";
    this.secondHeading = "3 hours ago";
    this.foxImg = "";
  }

  static get properties() {
    return {
      topHeading: { type: String, attribute: "top-heading" },
      secondHeading: { type: String, attribute: "second-heading" },
      foxImg: { type: String },
    };
  }

  static get styles() {
    return css`
      :host {
        display: block;
        background: white;
        color: black;
      }

      .header {
        padding: 12px;
        font-weight: bold;
      }

      .time {
        font-size: 12px;
        color: gray;
      }

      .image-wrap {
        width: 100%;
        background: #ddd;
      }

      img {
        width: 100%;
        max-height: 650px;
        display: block;
        object-fit: contain;
      }

      .caption {
        padding: 12px;
      }
    `;
  }

  getFoxes() {
    fetch("https://randomfox.ca/floof/")
      .then((resp) => resp.json())
      .then((data) => {
        this.foxImg = data.image;
      });
  }

  firstUpdated() {
    this.getFoxes();
  }

  render() {
    return html`
      <div class="header">
        <div>${this.topHeading}</div>
        <div class="time">${this.secondHeading}</div>
      </div>

      <div class="image-wrap">
        ${this.foxImg ? html`<img src="${this.foxImg}" alt="Fox image" />` : html``}
      </div>

      <div class="caption">
        <slot></slot>
      </div>
    `;
  }
}

globalThis.customElements.define(ProjectInstaSlide.tag, ProjectInstaSlide);