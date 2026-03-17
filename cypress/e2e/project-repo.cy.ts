export {};

/**
 * E2E — Project detail (dynamic route)
 *
 * This spec grabs the first project link on the projects page
 * and visits its detail page, asserting the expected back link
 * and some basic content.
 */

describe('Project detail page', () => {
  it('opens a repository page from the projects listing', () => {
    cy.visit('/en/projects');

    cy.get('a[href*="/projects/"]').first().then(($a) => {
      if ($a.length) {
        const href = $a.attr('href') || '';
        const url = href.startsWith('/projects') ? `/en${href}` : href;
        cy.visit(url);

        // Expect a back-to-projects link and some heading/content
        cy.contains(/back to projects/i).should('exist');
        cy.get('main').should('exist');
      } else {
        cy.log('no projects found — skipping repo detail assertions');
      }
    });
  });
});
