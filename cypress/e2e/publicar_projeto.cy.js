describe("E2E001 - Cadastro e publicação de projeto", () => {
  it("Deve logar e publicar um projeto com sucesso", () => {
    // Acessa a página inicial
    cy.visit("http://localhost:3000");

    // Preenche os campos de login
    cy.get('input[name="email"]').first().type("teste@usp.br");
    cy.get('input[name="senha"]').first().type("123456");

    // Clica no botão Entrar
    cy.contains("button", "Entrar").click();

    // Garante que foi redirecionado pro feed
    cy.url().should("include", "/feed");

    // Aguarda o carregamento do botão
    cy.wait(1000); // pode remover depois se funcionar sem ele

    // Clica no botão de publicar projeto (ajustado para pegar botão com esse texto)
    cy.contains("button", "Publicar Projeto").click();

    // Preenche o campo de texto do projeto
    cy.get('textarea[name="texto"]').type("Projeto publicado via Cypress");

    // Seleciona o curso do projeto (ajuste conforme o name/valor do select real)
    cy.get('select[name="curso_projeto"]').select("Engenharia");

    // Faz upload da imagem (ajuste o caminho do arquivo se necessário)
    const imagem = "cypress/fixtures/imagem_teste.jpg"; // coloque esse arquivo lá
    cy.get('input[type="file"]').selectFile(imagem, { force: true });

    // Clica em publicar
    cy.contains("button", "Publicar").click();

    // Verifica que a publicação deu certo
    cy.contains("Projeto publicado com sucesso!").should("exist");
  });
});
