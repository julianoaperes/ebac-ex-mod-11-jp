/// <reference types="cypress" />
import { faker } from "@faker-js/faker";
describe("Funcionalidade: Cadastro", () => {
	beforeEach(() => {
		cy.visit("http://lojaebac.ebaconline.art.br/minha-conta/");
		cy.get("#reg_email").clear();
		cy.get("#reg_password").clear();
	});

	it.only("Deve fazer cadastro com sucesso", () => {
		const fakeEmail = faker.internet.email();
		const username = fakeEmail.split("@")[0];

		cy.get("#reg_email").type(fakeEmail);
		cy.get("#reg_password").type(faker.internet.password());
		cy.get('input[type="submit"][name="register"].button').click();
		cy.get('a[title="My account"] span.hidden-xs')
			.should("be.visible")
			.should(($span) => {
				const text = $span.text().replace(/\s+/g, " ").trim(); // normalize spaces
				expect(text).to.match(new RegExp(`^Welcome\\s+${username}\\s*!$`, "i"));
			});
	});
	it("Não deve permitir cadastro de e-mail já cadastrado", () => {
		cy.get("#reg_email").type("jp.tester10@ebac.com");
		cy.get("#reg_password").type("jp@123");
		cy.get('input[type="submit"][name="register"].button').click();
		cy.get(".woocommerce-error").should(
			"contain",
			"Uma conta já está registrada com seu endereço de e-mail. Faça login."
		);
	});
	it("Não deve permitir cadastrar com e-mail inválido", () => {
		cy.get("#reg_email").type("jp.tester10ebac.com");
		cy.get("#reg_password").type("jp@123");
		cy.get('input[type="submit"][name="register"].button').click();
		cy.get(".woocommerce-error > li").should(
			"contain",
			"Erro: O endereço de e-mail fornecido não é válido."
		);
	});
});
