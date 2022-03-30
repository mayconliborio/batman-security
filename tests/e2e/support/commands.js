import "cypress-file-upload";

Cypress.Commands.add(
  "changeSelectField",
  function (dataCy, label, params = { timeout: 5000 }) {
    cy.get(`[data-cy="${dataCy}"]`, params).parent().click({ force: true });
    cy.get(".v-menu__content .v-list-item__title")
      .contains(label)
      .click({ force: true });
  }
);
