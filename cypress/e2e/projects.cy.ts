export {};

/**
 * E2E — Projects list
 *
 * Requires the dev server to be running: `npm run dev`
 * Then run: `npm run cypress:e2e` or `npm run cypress:open`
 */

describe('Projects page', () => {
  const BASE = '/en/repos';

  beforeEach(() => {
    cy.visit(BASE);
  });

  it('renders the main content and title', () => {
    cy.get('main').should('exist');
    cy.contains(/repositories|repos/i).should('exist');
  });

  it('shows a projects list or a no-results message', () => {
    cy.get('main').then(($main) => {
      const links = $main.find('a[href*="/repos/"]');
      if (links.length) {
        cy.get('a[href*="/repos/"]').should('have.length.at.least', 1);
      } else {
        cy.contains(/no repositories found/i).should('exist');
      }
    });
  });

  it('navigates to the first project when clicked (if present)', () => {
    cy.get('a[href*="/repos/"]').first().then(($a) => {
      if ($a.length) {
        cy.wrap($a).click();
        cy.contains(/close repository details/i).should('exist');
      } else {
        cy.log('no project links found — skipping navigation assertion');
      }
    });
  });
});
