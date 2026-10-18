describe('Transferencias', () => {
    beforeEach(() => {
        cy.visit(('/'))
        cy.fazerLoginComCredenciaisValidas()
    })
    it('Deve transferir quando informo dados e valor validos', () => {
        // Act
        cy.realizarTransferencia('Maria', 'João', '11')

        // Assert
        cy.verificarMensagemNoToast('Transferência realizada!')
    })

    it('Deve apresentar erro quando tentar transferrir mais que 5 mil sem o token', () => {
        // Act
        cy.realizarTransferencia('Maria', 'João', '6000')

        // Assert
        cy.verificarMensagemNoToast('Autenticação necessária para transferências acima de R$5.000,00.')
    })

})