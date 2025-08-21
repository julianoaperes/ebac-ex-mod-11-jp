/// <reference types="cypress" />
describe("Funcionalidade: Login", () => {
	it("Deve fazer login com sucesso", () => {
		cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
		cy.get("#username").type("jp.tester@qa.com");
		cy.get("#password").type("jp@123");
		cy.get(".woocommerce-form > .button").click();
		cy.get('a[title="My account"]').should("contain", "Welcome jp.tester");
	});
});
