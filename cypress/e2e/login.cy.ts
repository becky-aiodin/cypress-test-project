describe.only('Login', () => {
    const baseUrl2 = 'https://ibc22.porsche68.com';
    const username = 'testcheck01'
    const password = '123123'
    
    it('Existing user login successfully', () => {
        cy.visit(`${baseUrl2}`);
        cy.document().its('readyState').should('eq', 'complete');
        cy.window().should('have.property', 'location');

        cy.get('button.main-button-2').contains('LOGIN').click();
        cy.wait(1000);
        cy.get('input[formcontrolname="username"]').type(username);
        cy.wait(1000);
        cy.get('input[formcontrolname="password"]').type(password);
        cy.wait(1000);
        cy.get('button.main-button-1.button-height').contains('LOGIN').click();
        cy.wait(5000);

        cy.get('a[href="/member/profile"]', { timeout: 10000 }).should('be.visible').and('contain', 'MY PROFILE');
        cy.contains('a', 'LOGOUT', { timeout: 10000 }).should('be.visible');
    });
});
        
  