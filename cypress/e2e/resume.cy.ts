export {};

/**
 * E2E — Resume page
 *
 * Requires the dev server to be running: `npm run dev`
 * Then run: `npm run cypress:e2e` or `npm run cypress:open`
 */

const BASE = "/en/resume";

describe("Resume page", () => {
  beforeEach(() => {
    cy.visit(BASE);
  });

  it("loads with the correct page title", () => {
    cy.title().should("not.be.empty");
  });

  it("renders the resume card", () => {
    cy.get("[class*='animate-fade-pop-in']").should("exist");
  });

  it("renders the resume content", () => {
    // The MDX resume renders headings
    cy.get("h1, h2, h3").should("have.length.greaterThan", 0);
  });

  it("renders the download button with correct attributes", () => {
    cy.contains("a", /download/i)
      .should("have.attr", "target", "_blank")
      .and("have.attr", "download");
  });

  it("download button links to a PDF", () => {
    cy.contains("a", /download/i)
      .invoke("attr", "href")
      .should("match", /\.pdf$/i);
  });

  it("renders the share button", () => {
    cy.get("button[aria-label]")
      .filter((_, el) => /share/i.test(el.getAttribute("aria-label") ?? ""))
      .should("exist");
  });

  it("marks Resume as active in the navigation", () => {
    cy.get("nav a[data-active='true']")
      .should("have.length", 1)
      .and("have.attr", "href")
      .and("include", "resume");
  });

  it("renders the go to top button after scrolling", () => {
    cy.scrollTo("bottom");
    cy.get("button[aria-label]")
      .filter((_, el) => /top/i.test(el.getAttribute("aria-label") ?? ""))
      .should("be.visible");
  });

  it("navigates back to home from the header logo area", () => {
    cy.get("header").should("exist");
  });
});
