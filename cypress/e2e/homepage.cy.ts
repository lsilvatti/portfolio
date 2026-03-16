export {};

/**
 * E2E — Homepage
 *
 * Requires the dev server to be running: `npm run dev`
 * Then run: `npm run cypress:e2e` or `npm run cypress:open`
 */
describe("Homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("loads and displays the page title", () => {
    cy.title().should("not.be.empty");
  });

  it("renders the hero section", () => {
    cy.get("main").should("exist");
  });

  it("renders the navigation", () => {
    cy.get("nav").should("exist");
  });

  it("renders the theme toggle button", () => {
    cy.get('[role="switch"]').should("exist");
  });

  it("toggles between light and dark theme", () => {
    cy.get("html").then(($html) => {
      const initialTheme = $html.attr("data-theme");
      cy.get('[role="switch"]').click();
      cy.get("html").should(
        "have.attr",
        "data-theme",
        initialTheme === "light" ? "dark" : "light",
      );
    });
  });
});
