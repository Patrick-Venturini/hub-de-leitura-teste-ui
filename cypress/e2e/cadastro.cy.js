/// <reference types="cypress"/>
import { faker } from "@faker-js/faker";
import cadastroPage from "../support/page/cadastro-page";

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {
    beforeEach('', () => {
        cadastroPage.visitarPaginaCadastro()
    })

    it('Deve fazer cadastro com sucesso - Usando função JS', () => {
        let email = `teste${Date.now()}@teste.com`

        cy.get('#name').type('Patrick Venturini')
        cy.get('#email').type(email)
        cy.get('#phone').type('27998181072')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()

        //Resultado esperado    
        cy.url().should('include', 'dashboard')
    });

    it('Deve fazer cadastro com sucesso - Usando Faker', () => {
        let nome = faker.person.fullName()
        let email = faker.internet.email()

        cy.get('#name').type(nome)
        cy.get('#email').type(email)
        cy.get('#phone').type('27998181072')
        cy.get('#password').type('Teste@123')
        cy.get('#confirm-password').type('Teste@123')
        cy.get('#terms-agreement').check()
        cy.get('#register-btn').click()

        //Resultado esperado
        cy.url().should('include', 'dashboard')
        cy.get('#user-name').should('contain', nome)
    });

    it('Deve preencher cadastro com sucesso - Usando comando costumizado', () => {
        let email = `teste${Date.now()}@teste.com`
        let name = faker.person.fullName({ sex: 'female' })
        cy.preencherCadastro(
            name,
            email,
            '27998181072',
            'Teste@123',
            'Teste@123'
        )
        cy.url().should('include', 'dashboard')
    });

    it('Deve preencher cadastro com sucesso - Usando Page Objects', () => {
        let email = `teste${Date.now()}@teste.com`
        cadastroPage.preencherCadastro('Patrick Venturini', email, '27998181072', 'senha123', 'senha123');
        cy.url().should('include', 'dashboard')
    })

    it.only('Deve validar mensagem ao tentar cadastrar sem preencher nome', () => {
        cadastroPage.preencherCadastro('', 'teste@teste.com', '27912345678', 'senha123', 'senha123');
        cy.get(':nth-child(1) > .invalid-feedback').should('contain', 'Nome deve ter pelo menos 2 caracteres');
    })
})
