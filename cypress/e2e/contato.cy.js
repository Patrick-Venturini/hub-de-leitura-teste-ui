/// <reference types="cypress"/>

describe('Funcionalidade: Contato', () => {

  beforeEach(() => {
    cy.visit('index.html')
  });

  it('Deve preencher formulário de contato com sucesso', () => {
    cy.get('[name="name"]').type('Patrick Venturini');
    cy.get('[name="email"]').type('patrick@teste.com')
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click();

    //Resultado esperado
    cy.contains('Contato enviado com sucesso!').should('exist')
  })

  it('Deve validar mensagem de erro ao enviar sem preecher nome', () => {
    cy.get('[name="email"]').type('patrick@teste.com')
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click();

    //Resultado esperado
    cy.get('#alert-container').should('contain', 'Por favor, preencha o campo Nome.')
  });

  it('Deve validar mensagem de erro ao enviar sem preecher email', () => {
    cy.get('[name="name"]').type('Patrick Venturini');
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click();

    //Resultado esperado
    cy.get('#alert-container').should('contain', 'Por favor, preencha o campo E-mail.')
  });

  it('Deve validar mensagem de erro ao enviar sem preecher o assunto', () => {
    cy.get('[name="name"]').type('Patrick Venturini');
    cy.get('[name="email"]').type('patrick@teste.com')
    cy.get('[name="message"]').type('Mensagem de teste')
    cy.get('#btn-submit').click();

    //Resultado esperado
    cy.get('#alert-container').should('contain', 'Por favor, selecione o Assunto.')
  });

  it('Deve validar mensagem de erro ao enviar sem preecher a mensagem', () => {
    cy.get('[name="name"]').type('Patrick Venturini');
    cy.get('[name="email"]').type('patrick@teste.com')
    cy.get('[name="subject"]').select('Parcerias')
    cy.get('#btn-submit').click();

    //Resultado esperado
    cy.get('#alert-container').should('contain', 'Por favor, escreva sua Mensagem.')
  });
});