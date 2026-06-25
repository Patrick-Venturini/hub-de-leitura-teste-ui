/// <reference types="cypress"/>
import { faker } from "@faker-js/faker";

describe('Funcionalidade: Cadastro no Hub de Leitura', () => {
    beforeEach('', () => {
        cy.visit('register.html')
    })

    it('Deve fazer cadastro com sucesso usando função JS', () => {
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

    it('Deve fazer cadastro com sucesso usando Faker', () => {
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

    it('Deve preencher cadastro com sucesso usando comando costumizado', () => {
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
})
