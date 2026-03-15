/**
 * E2E — Language toggle
 *
 * Requires the dev server to be running: `npm run dev`
 */
describe("Language toggle", () => {
  it("switches locale when toggling language", () => {
    cy.visit("/");
    // PT button
    cy.get('[role="radiogroup"]').within(() => {
      cy.get('[role="radio"][aria-checked="false"]').click();
    });
    // URL should now include the other locale
    cy.url().should("match", /\/(en|br)(\/|$)/);
  });
});
