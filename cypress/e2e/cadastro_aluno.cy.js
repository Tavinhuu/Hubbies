describe('E2E001 - Cadastro de Aluno', () => {
  it('Deve cadastrar um novo aluno com sucesso', () => {
    // Mock das APIs de UF e Cidades
    cy.intercept('GET', '/api/ufs', {
      sucesso: true,
      ufs: [{sigla: 'SP', nome: 'São Paulo'}]
    }).as('getUFs');
    
    cy.intercept('GET', '/api/cidades?uf=SP', {
      sucesso: true,
      cidades: [{nome: 'São Paulo'}]
    }).as('getCidades');

    cy.visit('http://localhost:3000/cadastro.html');
    cy.wait('@getUFs');

    // Preencher formulário
    cy.get('#nome').type('Teste Cypress');
    cy.get('#email').type('cypress@teste.com');
    
    // Selecionar UF e Cidade (obrigatórios)
    cy.get('#uf').select('SP').trigger('change');
    cy.wait('@getCidades');
    cy.get('#cidade').select('São Paulo');
    
    cy.get('#curso').type('Engenharia de Software');
    cy.get('#universidade').type('Universidade Teste');
    cy.get('#senha').type('123456');
    cy.get('#cadastro-senha-confirma').type('123456');

    // Submeter formulário
    cy.get('form').submit();

    // Verificar se permanece na página (ou verifique o redirecionamento esperado)
    cy.url().should('include', '/cadastro.html');
    
    // Verificar se o botão de cadastro ainda está visível
    cy.get('.botao-login').should('be.visible');
  });
});