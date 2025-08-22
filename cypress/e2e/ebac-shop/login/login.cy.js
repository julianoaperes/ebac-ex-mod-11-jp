/// <reference types="cypress" />
describe("Funcionalidade: Login", () => {
	beforeEach(() => {
		cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
		cy.get("#username").clear();
		cy.get("#password").clear();
	});
	it("Deve fazer login com sucesso", () => {
		cy.get("#username").type("jp.tester@qa.com");
		cy.get("#password").type("jp@123");
		cy.get(".woocommerce-form > .button").click();
		cy.get('a[title="My account"]').should("contain", "Welcome jp.tester");
	});
	it("Não deve permitir logar com usuário inválido", () => {
		cy.get("#username").type("jp.com.br");
		cy.get("#password").type("jp@123");
		cy.get(".woocommerce-form > .button").click();
		cy.get(".woocommerce-error > li").should(
			"contain",
			"O usuário jp.com.br não está registrado neste site. Se você não está certo de seu nome de usuário, experimente o endereço de e-mail."
		);
	});
	it("Não deve permitir logar com senha inválida", () => {
		cy.get("#username").type("jp.tester@qa.com");
		cy.get("#password").type("123456");
		cy.get(".woocommerce-form > .button").click();
		cy.get(".woocommerce-error > li").should(
			"contain",
			"Erro: A senha fornecida para o e-mail jp.tester@qa.com está incorreta. Perdeu a senha?"
		);
	});
	it('Não dever permitir logar com "username" em branco', () => {
		cy.get("#username").clear();
		cy.get("#password").type("jp@123");
		cy.get(".woocommerce-form > .button").click();
		cy.get(".woocommerce-error > li").should(
			"contain",
			"Erro: Nome de usuário é obrigatório."
		);
	});
	it('Não dever permitir logar com "password" em branco', () => {
		cy.get("#username").type("jp.tester@qa.com");
		cy.get("#password").clear();
		cy.get(".woocommerce-form > .button").click();
		cy.get(".woocommerce-error > li").should(
			"contain",
			"Erro: O campo da senha está vazio."
		);
	});
	it('Não dever permitir logar com "username" e "password" em branco', () => {
		cy.get("#username").clear();
		cy.get("#password").clear();
		cy.get(".woocommerce-form > .button").click();
		cy.get(".woocommerce-error > li").should(
			"contain",
			"Erro: Nome de usuário e senha são obrigatórios."
		);
	});
});
