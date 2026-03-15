/**
 * E2E — Connect page flows
 *
 * Covers the three-view state machine:
 *   links  →  form  →  success
 *         ↑_________________|
 *
 * Requires the dev server to be running: `npm run dev`
 */

const BASE = "/en/connect";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Navigate from the links view to the form view. */
const openForm = () =>
  cy.contains("button", /send me a message/i).click();

/** Fill the contact form with valid data. */
const fillValidForm = () => {
  cy.contains('label', /first name/i)
    .closest('div')
    .find('input')
    .type('John');

  cy.contains('label', /last name/i)
    .closest('div')
    .find('input')
    .type('Doe');

  cy.contains('label', /email/i)
    .closest('div')
    .find('input')
    .type('john.doe@example.com');

  cy.contains('label', /message/i)
    .closest('div')
    .find('textarea')
    .type('Hello! I would love to discuss a potential collaboration with you.');
};

// ---------------------------------------------------------------------------
// Suite 1 — Links view
// ---------------------------------------------------------------------------
describe("Connect page — links view", () => {
  beforeEach(() => {
    cy.visit(BASE);
  });

  it("renders the main content area", () => {
    cy.get("main").should("exist");
  });

  it("shows all four social link buttons", () => {
    cy.contains("a", /linkedin/i).should("exist");
    cy.contains("a", /github/i).should("exist");
    cy.contains("a", /e-mail/i).should("exist");
    cy.contains("a", /calendly/i).should("exist");
  });

  it("social links open in a new tab (target=_blank)", () => {
    cy.contains("a", /linkedin/i).should("have.attr", "target", "_blank");
    cy.contains("a", /github/i).should("have.attr", "target", "_blank");
    cy.contains("a", /calendly/i).should("have.attr", "target", "_blank");
  });

  it("social links have rel=noopener for security", () => {
    cy.contains("a", /linkedin/i).should("have.attr", "rel").and("include", "noopener");
    cy.contains("a", /github/i).should("have.attr", "rel").and("include", "noopener");
  });

  it("shows a copy button next to each social link", () => {
    // Each link row has a copy icon button (aria-label contains 'copy')
    cy.get('[aria-label*="opy"]').should("have.length.at.least", 4);
  });

  it("shows the share button", () => {
    cy.get('[aria-label*="hare"]').should("exist");
  });

  it("shows the 'send me a message' trigger", () => {
    cy.contains("button", /send me a message/i).should("be.visible");
  });
});

// ---------------------------------------------------------------------------
// Suite 2 — Navigation between views
// ---------------------------------------------------------------------------
describe("Connect page — view navigation", () => {
  beforeEach(() => {
    cy.visit(BASE);
  });

  it("clicking the message trigger switches to the form view", () => {
    openForm();
    cy.contains("h2", /send a message/i).should("be.visible");
  });

  it("form fields are visible after switching to form view", () => {
    openForm();
    cy.contains('label', /first name/i).should('be.visible');
    cy.contains('label', /email/i).should('be.visible');
    cy.contains('label', /message/i).should('be.visible');
  });

  it("'Back to links' button returns to the links view", () => {
    openForm();
    cy.contains("button", /back to links/i).click();
    cy.contains("button", /send me a message/i).should("be.visible");
    // Form title should no longer be interactable
    cy.contains("h2", /send a message/i).should("not.be.visible");
  });
});

// ---------------------------------------------------------------------------
// Suite 3 — Form validation
// ---------------------------------------------------------------------------
describe("Connect page — form validation", () => {
  beforeEach(() => {
    cy.visit(BASE);
    openForm();
  });

  it("shows required-field errors when submitting an empty form", () => {
    cy.get('form').within(() => {
      cy.get('[type="submit"]').click();
    });
    // firstName, email, and message are all required
    cy.get('[role="alert"]').should("have.length.at.least", 3);
  });

  it("shows a first-name error for an empty first name", () => {
    cy.get('form').within(() => cy.get('[type="submit"]').click());
    cy.get('[role="alert"]')
      .first()
      .should("contain.text", /first name|required/i);
  });

  it("shows an email error for an invalid email", () => {
    cy.contains('label', /first name/i).closest('div').find('input').type('Jane');
    cy.contains('label', /email/i).closest('div').find('input').type('not-an-email');
    cy.contains('label', /message/i)
      .closest('div')
      .find('textarea')
      .type('A'.repeat(10));
    cy.get('form').within(() => cy.get('[type="submit"]').click());
    cy.get('[role="alert"]').should('contain.text', /valid email/i);
  });

  it("shows a message error when the message is too short", () => {
    cy.contains('label', /first name/i).closest('div').find('input').type('Jane');
    cy.contains('label', /email/i).closest('div').find('input').type('jane@example.com');
    cy.contains('label', /message/i).closest('div').find('textarea').type('Short');
    cy.get('form').within(() => cy.get('[type="submit"]').click());
    cy.get('[role="alert"]').should('contain.text', /at least 10/i);
  });

  it("shows a last-name error when an invalid last name is provided", () => {
    cy.contains('label', /last name/i).closest('div').find('input').type('D0e123');
    cy.get('form').within(() => cy.get('[type="submit"]').click());
    cy.get('[role="alert"]').should('contain.text', /letters/i);
  });

  it("clears a field error when the user starts correcting the value", () => {
    // Trigger validation first
    cy.get('form').within(() => cy.get('[type="submit"]').click());
    cy.get('[role="alert"]').should('exist');

    // Start correcting the first name
    cy.contains('label', /first name/i).closest('div').find('input').type('J');
    // The first-name error should clear immediately
    cy.get('[role="alert"]').should('have.length.lessThan', 4);
  });

  it("disables the submit button while submitting", () => {
    // Intercept the server action POST so it hangs momentarily
    cy.intercept('POST', /\/connect/, (req) => {
      req.reply({ statusCode: 200, body: '0["$@1"]', delay: 1500 });
    }).as('serverAction');

    fillValidForm();
    cy.get('form').within(() => cy.get('[type="submit"]').click());
    cy.get('[type="submit"]').should('be.disabled');
  });
});

// ---------------------------------------------------------------------------
// Suite 4 — Successful submission flow
// ---------------------------------------------------------------------------
describe("Connect page — successful submission", () => {
  beforeEach(() => {
    // Stub the Next.js server action to return a success response
    cy.intercept('POST', /\/connect/, {
      statusCode: 200,
      // Next.js Flight response for a resolved server action returning {}
      body: '0',
    }).as('sendEmail');

    cy.visit(BASE);
    openForm();
    fillValidForm();
  });

  it("shows the success view after a successful submission", () => {
    cy.get('form').within(() => cy.get('[type="submit"]').click());
    cy.wait('@sendEmail');
    cy.contains(/message sent/i, { timeout: 8000 }).should('be.visible');
  });

  it("'go back' from success returns to the links view", () => {
    cy.get('form').within(() => cy.get('[type="submit"]').click());
    cy.wait('@sendEmail');
    cy.contains(/message sent/i, { timeout: 8000 }).should('be.visible');
    cy.contains('a', /go back/i).click();
    cy.contains("button", /send me a message/i).should('be.visible');
  });

  it("'send another message' from success returns to the form view", () => {
    cy.get('form').within(() => cy.get('[type="submit"]').click());
    cy.wait('@sendEmail');
    cy.contains(/message sent/i, { timeout: 8000 }).should('be.visible');
    cy.contains('a', /send another message/i).click();
    cy.contains('h2', /send a message/i).should('be.visible');
  });

  it("form fields are cleared after a successful submission before returning", () => {
    cy.get('form').within(() => cy.get('[type="submit"]').click());
    cy.wait('@sendEmail');
    cy.contains(/message sent/i, { timeout: 8000 }).should('be.visible');
    cy.contains('a', /send another message/i).click();
    cy.contains('label', /first name/i)
      .closest('div')
      .find('input')
      .should('have.value', '');
  });
});

// ---------------------------------------------------------------------------
// Suite 5 — Server error handling
// ---------------------------------------------------------------------------
describe("Connect page — server error", () => {
  it("shows a server error message when the action fails", () => {
    cy.intercept('POST', /\/connect/, {
      statusCode: 500,
      body: 'Internal Server Error',
    }).as('failedAction');

    cy.visit(BASE);
    openForm();
    fillValidForm();
    cy.get('form').within(() => cy.get('[type="submit"]').click());
    cy.wait('@failedAction');
    cy.get('[role="alert"]').should('contain.text', /wrong|error|try again/i);
  });
});
