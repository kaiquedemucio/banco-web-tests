# Testes automatizados — Banco Web

Projeto de testes end-to-end automatizados com Cypress e JavaScript para validar os principais fluxos da aplicação Banco Web: autenticação e transferência entre contas.

## Pré-requisitos

- Node.js e npm instalados.
- A API (`banco-api`) e a aplicação Web (`banco-web`) em execução antes de iniciar os testes.
- A aplicação Web acessível em `http://localhost:4000`, endereço configurado como `baseUrl` do Cypress em [cypress.config.js](./cypress.config.js).

Os testes dependem da comunicação entre a aplicação Web e a API. Inicie ambos os serviços conforme as instruções de seus respectivos projetos e confirme que estão disponíveis antes de executar a suíte.

## Instalação

Na raiz deste repositório, instale as dependências declaradas em `package.json`:

```bash
npm install
```

## Execução

Com a API e a aplicação Web em execução, use um dos comandos abaixo:

| Comando | Descrição |
| --- | --- |
| `npm test` | Executa os testes em modo headless. |
| `npm run test-qa` | Executa Cypress em modo headless. Atualmente é equivalente a `npm test`; não configura um ambiente de QA. |
| `npm run test-prod` | Executa Cypress em modo headless. Atualmente é equivalente a `npm test`; não configura um ambiente de produção. |
| `npm run cy:headed` | Executa os testes em um navegador visível. |
| `npm run cy:open` | Abre a interface interativa do Cypress para selecionar e executar os testes. |

## Componentes do projeto

- `cypress/e2e/`: testes end-to-end, organizados por funcionalidade.
- `cypress/fixtures/credenciais.json`: dados de acesso válidos e inválidos usados nos testes de login. São dados de teste; mantenha credenciais reais fora do repositório.
- `cypress/support/e2e.js`: arquivo de suporte carregado antes dos testes; importa os comandos customizados e registra o reporter.
- `cypress/support/commands.js`: ponto central que importa os arquivos de comandos.
- `cypress/support/commands/`: implementação dos comandos customizados comuns, de login e de transferência.
- `cypress.config.js`: configuração E2E, URL base e integração do reporter.
- `cypress/reports/`: relatórios HTML gerados pelo `cypress-mochawesome-reporter`.
- `cypress/screenshots/`: capturas de tela geradas durante a execução dos testes.
- `cypress/videos/`: diretório de vídeos do Cypress, quando a gravação estiver habilitada.

## Testes cobertos

### Login — `cypress/e2e/login.cy.js`

- **Login com dados válidos:** verifica que a autenticação permite acessar o fluxo de transferência, exibindo “Realizar Transferência”.
- **Login com dados inválidos:** verifica a mensagem “Erro no login. Tente novamente.”.
- Antes de cada caso, acessa a página inicial e captura uma screenshot chamada `apos-visitar-pagina`.

### Transferências — `cypress/e2e/transferencia.cy.js`

- **Transferência válida:** transfere o valor `11` da conta Maria para a conta João e verifica “Transferência realizada!”.
- **Valor acima de R$ 5.000 sem token:** tenta transferir `6000` da conta Maria para a conta João e verifica a mensagem de que é necessária autenticação adicional.
- Antes de cada caso, acessa a página inicial e realiza login com credenciais válidas.

## Custom Commands

Os comandos são carregados por `cypress/support/commands.js`, por meio do arquivo de suporte `cypress/support/e2e.js`.

| Comando | Parâmetros | Comportamento |
| --- | --- | --- |
| `cy.verificarMensagemNoToast(mensagem)` | `mensagem`: texto esperado | Verifica se o elemento `.toast` contém exatamente o texto informado. |
| `cy.selecionarOpcaoNaComboBox(labelDoCampo, opcao)` | `labelDoCampo`: identificador do campo; `opcao`: opção a selecionar | Localiza a combo box pelo `label[for="..."]` e seleciona a opção indicada. |
| `cy.fazerLoginComCredenciaisValidas()` | Nenhum | Lê os dados `valida` da fixture `credenciais` e envia o formulário de login. |
| `cy.fazerLoginComCredenciaisInvalidas()` | Nenhum | Lê os dados `invalida` da fixture `credenciais` e envia o formulário de login. |
| `cy.realizarTransferencia(contaOrigem, contaDestino, valor)` | Conta de origem, conta de destino e valor | Seleciona as contas, preenche o valor e aciona “Transferir”. |

## Relatórios e evidências

O projeto usa `cypress-mochawesome-reporter` para gerar relatórios HTML. Após executar os testes, consulte `cypress/reports/html/index.html`, se o relatório tiver sido gerado. As screenshots ficam em `cypress/screenshots/`; a geração de vídeos depende da configuração de gravação do Cypress.
