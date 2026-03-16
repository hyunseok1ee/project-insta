import { html, fixture, expect } from '@open-wc/testing';
import "../project-insta.js";

describe("ProjectInsta test", () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`
      <project-insta
        title="title"
      ></project-insta>
    `);
  });

  it("basic will it blend", async () => {
    expect(element).to.exist;
  });

  it("passes the a11y audit", async () => {
    await expect(element).shadowDom.to.be.accessible();
  });
});
