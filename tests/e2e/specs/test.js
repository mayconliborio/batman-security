/// <reference types="Cypress" />
let count = 1,
  title = "Teste",
  vulnerability = {
    title: `${title} - ${count}`,
    comment: "Descrição personalizada...",
    solutionProposal: "Proponho que seja feito....",
  },
  type = {
    SAST: "SAST",
    DAST: "DAST",
    NETWORK: "NETWORK",
  },
  criticalityLevel = {
    high: "High",
    mid: "Mid",
    low: "Low",
  },
  evidences = {
    png: "teste1.png",
    jpg: "teste2.jpg",
    pdf: "teste3.pdf",
  },
  edited = " (EDITADO)";

function updateData() {
  vulnerability.title = `${title} - ${count}`;
  count++;
}

function clearSearchFields() {
  cy.get("[data-cy=Título-field]").clear();

  cy.changeSelectField("Tipo de Vulnerabilidade-field", "Selecione");
  cy.changeSelectField("Grau de Criticidade-field", "Selecione");
}

let confirmCreateButton = () =>
    cy
      .get('[data-cy="Cadastrar Vulnerabilidade-button"]')
      .click({ force: true }),
  confirmEditButton = () =>
    cy.get('[data-cy="Editar Vulnerabilidade-button"]').click({ force: true }),
  backNavigation = () =>
    cy.get('[data-cy="Voltar-button"]').click({ force: true }),
  confirmMessageModal = () =>
    cy.get('[data-cy="Entendi-button"]').click({ force: true }),
  acceptingConfirmationModal = () =>
    cy.get('[data-cy="Sim-button"]').click({ force: true }),
  denyingConfirmationModal = () =>
    cy.get('[data-cy="Não-button"]').click({ force: true }),
  editIconButton = () =>
    cy.get("[data-cy=Editar-button]").click({ force: true }),
  deleteIconButton = () =>
    cy.get("[data-cy=Deletar-button]").click({ force: true }),
  menuCreateButton = () =>
    cy
      .get('[data-cy="Cadastro de Vulnerabilidade-MenuItem"]')
      .click({ force: true });

function uploadImages(option) {
  let uploadFiles = {
    0: evidences.jpg,
    1: evidences.png,
    2: [evidences.jpg, evidences.png],
  };

  cy.get("[data-cy=Evidências-field]").attachFile(
    uploadFiles[option.toString()]
  );
}

function getModifiedVulnerability() {
  let modifiedVulnerability = { ...vulnerability };
  return {
    title: modifiedVulnerability.title + edited,
    comment: modifiedVulnerability.comment + edited,
    solutionProposal: modifiedVulnerability.solutionProposal + edited,
  };
}

function itFillInData() {
  it("Preenchendo campos com novos dados", function () {
    cy.get("[data-cy=Título-field]").clear().type(vulnerability.title);
    cy.get("[data-cy=Descrição-field]").clear().type(vulnerability.comment);
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.NETWORK);
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.high);
    cy.get('[data-cy="Solução Proposta-field"]')
      .clear()
      .type(vulnerability.solutionProposal);
  });
}

function itEditingData() {
  const modifiedVulnerability = getModifiedVulnerability();
  it("Preenchendo campos com dados editados", function () {
    cy.get("[data-cy=Título-field]").clear().type(modifiedVulnerability.title);
    cy.get("[data-cy=Descrição-field]")
      .clear()
      .type(modifiedVulnerability.comment);
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.DAST);
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.mid);
    cy.get('[data-cy="Solução Proposta-field"]')
      .clear()
      .type(modifiedVulnerability.solutionProposal);

    cy.wait(2000); //tempo para leitura do modal
  });
}

describe("Teste CRUD", () => {
  describe("Criando, editando e deletando", () => {
    it("Testando validação com campos vazios", () => {
      cy.visit("/pagina-principal");
      menuCreateButton();
      confirmCreateButton();
      cy.wait(2000); //tempo para leitura do modal
      confirmMessageModal();
    });

    it("Voltando pagina inicial", () => {
      backNavigation();
      confirmCreateButton();
    });

    it("Preenchendo dados Iniciais", () => {
      cy.get("[data-cy=Título-field]").clear().type(vulnerability.title);
      cy.get("[data-cy=Descrição-field]").clear().type(vulnerability.comment);
      cy.changeSelectField("Tipo de Vulnerabilidade-field", type.SAST);
      cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.low);
      cy.get('[data-cy="Solução Proposta-field"]')
        .clear()
        .type(vulnerability.solutionProposal);
    });

    it("Testando validação com SAST", () => {
      confirmCreateButton();
      cy.wait(2000); //tempo para leitura do modal
      confirmMessageModal();
    });

    it("Anexando arquivo invalido (PDF)", () => {
      cy.get("[data-cy=Evidências-field]").attachFile([evidences.pdf]);
      cy.wait(2000); //tempo da animação da mensagem de erro
    });

    it("Anexando arquivos validos (PNG e JPG)", () => {
      uploadImages(2);
      cy.wait(2000); //tempo para carregar arquivos
    });

    it("Expandindo imagem 1", () => {
      cy.get("[data-cy=Expandir-0-image]").click({ force: true });
      cy.wait(2000); //tempo para visualizar imagem
    });

    it("Diminuindo imagem", () => {
      cy.get("[data-cy=Diminuir-image]").click({ force: true });
    });

    it("Removendo imagem 1", () => {
      cy.wait(2000); //tempo para visualizar imagem
      cy.get("[data-cy=Remover-0-image]").click({ force: true });
      cy.wait(2000); //tempo para visualizar imagem
    });

    it("Salvando vulnerabilidade", () => {
      confirmCreateButton();
      cy.wait(2000); //tempo da animação da mensagem de sucesso
    });

    it("Abrindo Tela de Edição", function () {
      editIconButton();
    });

    it("Tentando salvar sem alterações", () => {
      confirmEditButton();
      cy.wait(2000); //tempo da animação da mensagem de não alteração
    });

    it("Abrindo Tela de Edição", function () {
      editIconButton();
    });

    it("Voltando sem alterações", () => {
      backNavigation();
    });

    it("Abrindo Tela de Edição", function () {
      editIconButton();
    });

    itFillInData();

    it("Voltando com alterações e confirmando modal", () => {
      backNavigation();
      cy.wait(2000); //tempo para leitura do modal
      acceptingConfirmationModal();
    });

    it("Abrindo Tela de Edição", function () {
      editIconButton();
    });

    itEditingData();

    it("Voltando com alterações e negando modal", () => {
      backNavigation();
      cy.wait(2000); //tempo para leitura do modal
      denyingConfirmationModal();
    });

    /* IMPLEMENTAR TESTE DE NÃO PREENCHIMENTO DE CAMPOS OBRIGATÓRIOS */

    it("Salvando com alterações e negando modal", function () {
      confirmEditButton();
      cy.wait(2000); //tempo para leitura do modal
      denyingConfirmationModal();
    });

    it("Salvando com alterações e confirmando modal", function () {
      confirmEditButton();
      cy.wait(2000); //tempo para leitura do modal
      acceptingConfirmationModal();
      cy.wait(2000); //tempo da animação da mensagem de sucesso
    });

    it("Deletando dados", function () {
      deleteIconButton();
      cy.wait(2000); //tempo para leitura do modal
      denyingConfirmationModal();
      deleteIconButton();
      cy.wait(2000); //tempo para leitura do modal
      acceptingConfirmationModal();
      cy.wait(2000); //tempo da animação da mensagem de não alteração
    });
  });
});

describe("Testes de busca", () => {
  it("Cadastrando massa de dados para teste", () => {
    cy.visit("/pagina-principal");
    confirmCreateButton();
    cy.get("[data-cy=Título-field]")
      .clear()
      .type(vulnerability.title + edited);
    cy.get("[data-cy=Descrição-field]").clear().type(vulnerability.comment);
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.SAST);
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.high);
    cy.get('[data-cy="Solução Proposta-field"]')
      .clear()
      .type(vulnerability.solutionProposal);
    uploadImages(2);
    cy.wait(2000); //tempo para carregar arquivos
    confirmCreateButton();
    updateData();

    confirmCreateButton();
    cy.get("[data-cy=Título-field]").clear().type(vulnerability.title);
    cy.get("[data-cy=Descrição-field]").clear().type(vulnerability.comment);
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.NETWORK);
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.high);
    cy.get('[data-cy="Solução Proposta-field"]')
      .clear()
      .type(vulnerability.solutionProposal);
    uploadImages(1);
    cy.wait(2000); //tempo para carregar arquivos
    confirmCreateButton();
    updateData();

    confirmCreateButton();
    cy.get("[data-cy=Título-field]").clear().type(vulnerability.title);
    cy.get("[data-cy=Descrição-field]").clear().type(vulnerability.comment);
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.DAST);
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.high);
    cy.get('[data-cy="Solução Proposta-field"]')
      .clear()
      .type(vulnerability.solutionProposal);
    uploadImages(0);
    cy.wait(2000); //tempo para carregar arquivos
    confirmCreateButton();
    updateData();

    confirmCreateButton();
    cy.get("[data-cy=Título-field]").clear().type(vulnerability.title);
    cy.get("[data-cy=Descrição-field]").clear().type(vulnerability.comment);
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.SAST);
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.mid);
    cy.get('[data-cy="Solução Proposta-field"]')
      .clear()
      .type(vulnerability.solutionProposal);
    uploadImages(0);
    cy.wait(2000); //tempo para carregar arquivos
    confirmCreateButton();
    updateData();

    menuCreateButton();
    cy.get("[data-cy=Título-field]")
      .clear()
      .type(vulnerability.title + edited);
    cy.get("[data-cy=Descrição-field]").clear().type(vulnerability.comment);
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.NETWORK);
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.mid);
    cy.get('[data-cy="Solução Proposta-field"]')
      .clear()
      .type(vulnerability.solutionProposal);
    uploadImages(1);
    cy.wait(2000); //tempo para carregar arquivos
    confirmCreateButton();
    updateData();

    menuCreateButton();
    cy.get("[data-cy=Título-field]").clear().type(vulnerability.title);
    cy.get("[data-cy=Descrição-field]").clear().type(vulnerability.comment);
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.DAST);
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.mid);
    cy.get('[data-cy="Solução Proposta-field"]')
      .clear()
      .type(vulnerability.solutionProposal);
    confirmCreateButton();
    updateData();

    menuCreateButton();
    cy.get("[data-cy=Título-field]").clear().type(vulnerability.title);
    cy.get("[data-cy=Descrição-field]").clear().type(vulnerability.comment);
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.SAST);
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.low);
    cy.get('[data-cy="Solução Proposta-field"]')
      .clear()
      .type(vulnerability.solutionProposal);
    uploadImages(0);
    cy.wait(2000); //tempo para carregar arquivos
    confirmCreateButton();
    updateData();

    menuCreateButton();
    cy.get("[data-cy=Título-field]").clear().type(vulnerability.title);
    cy.get("[data-cy=Descrição-field]").clear().type(vulnerability.comment);
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.NETWORK);
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.low);
    cy.get('[data-cy="Solução Proposta-field"]')
      .clear()
      .type(vulnerability.solutionProposal);
    confirmCreateButton();
    updateData();

    menuCreateButton();
    cy.get("[data-cy=Título-field]")
      .clear()
      .type(vulnerability.title + edited);
    cy.get("[data-cy=Descrição-field]").clear().type(vulnerability.comment);
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.DAST);
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.low);
    cy.get('[data-cy="Solução Proposta-field"]')
      .clear()
      .type(vulnerability.solutionProposal);
    uploadImages(1);
    cy.wait(2000); //tempo para carregar arquivos
    confirmCreateButton();
    updateData();
  });

  it("Pesquisa por titulo que contenha: EDITADO", function () {
    cy.get("[data-cy=Título-field]").clear().type("EDITADO");
    cy.get("[data-cy=Buscar-button]").click({ force: true });
    cy.wait(2000); //tempo para analise da tabela
    clearSearchFields();
  });

  it("Pesquisa por Tipo de Vulnerabilidade: DAST", function () {
    cy.changeSelectField("Tipo de Vulnerabilidade-field", type.DAST);
    cy.get("[data-cy=Buscar-button]").click({ force: true });
    cy.wait(2000); //tempo para analise da tabela
    clearSearchFields();
  });

  it("Pesquisa por Grau de Criticidade: low", function () {
    cy.changeSelectField("Grau de Criticidade-field", criticalityLevel.low);
    cy.get("[data-cy=Buscar-button]").click({ force: true });
    cy.wait(2000); //tempo para analise da tabela
    clearSearchFields();
  });

  it("Abrindo visualização da Vulnerabilidade", function () {
    cy.get("[data-cy=Vulnerability-0-row]").click({ force: true });
    cy.wait(5000); //tempo para visualizar tela

    cy.get("[data-cy=Expandir-0-image]").click({ force: true });
    cy.wait(2000); //tempo para visualizar imagem

    cy.get("[data-cy=Diminuir-image]").click({ force: true });

    backNavigation();
  });

  it("Usando navegação da tabela", function () {
    clearSearchFields();
    cy.get("[data-cy=NextPage-button]").click({ force: true });
    cy.wait(2000); //tempo para visualizar tela

    cy.get("[data-cy=PreviousPage-button]").click({ force: true });
    cy.wait(2000); //tempo para visualizar tela
  });
});
