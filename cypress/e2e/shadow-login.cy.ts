describe('Shadow Login', () => {
    const baseUrl = 'https://ibc22bo.porsche68.com/';
    const username = 'becky'
    const password = 'Aabbcc123@'
    
    it('Registers a new user and logs in successfully', () => {
        // Step 1: Visit registration page
        cy.visit(`${baseUrl}`);
+
        // Step 2: Fill registration form
        cy.get('input[formcontrolname="username"]').type(`${username}`);
        cy.get('input[formcontrolname="password"]').type(`${password}`);
        cy.get('button.btn.btn-brand.btn-block').click();
        
        cy.get('h5.xs-displaynone', { timeout: 10000 }).should('exist').and('contain.text', 'Dashboard');
        cy.get('.kt-header-mobile__toolbar > #kt_aside_toggler').click();
        cy.contains('div.card-header', '1. Members').click();
        cy.contains('a', '1.1 All Members').click();
        cy.url().should('include', '/general/members');
        cy.get('.kt-header-mobile__toolbar > #kt_aside_toggler').click();
        cy.get('button.btn.btn-success.btn-icon-sm').click();
            //     cy.get('table.table-sortable tbody tr').each(($row) => {
            //     cy.wrap($row).find('td').eq(0).invoke('text').then((text) => {
        
            // });
        cy.get('input[formcontrolname="username"]').type('winter01');
        cy.get('button.btn.btn-success.btn-icon-sm').click();
        cy.wait(5000);
        cy.get('table.table-sortable').parent().scrollTo('right');
        cy.get('[ng-reflect-message="Shadow Login"] > .fas').click();
        cy.get('body').then($body => {
            if ($body.find('.swal2-popup:visible').length > 0) {
                cy.window().then((win) => {
                    cy.stub(win, 'open').callsFake((url) => {
                    win.location.href = url;
                    });
                });
                cy.get('.swal2-confirm')
                .should('be.visible')
                .and('contain', 'Yes')
                .invoke('removeAttr', 'target') 
                .click();
            } else {
                cy.log('No SweetAlert2 popup appeared.');
            }
        });
        cy.wait(10000);
        // cy.origin('https://ibc22.porsche68.com', () => {
        //     cy.location('search', { timeout: 1000 }).should('include', 'access_token');
        // });
        cy.get('a[href="/member/profile"]')
        .should('be.visible')
        .and('contain', 'MY PROFILE');
    });

        // Interact with the Actions column in the first row
        //cy.get(':nth-child(1) > .actions-column', { timeout: 10000 }).should('be.visible').click(); // Example action; adjust as needed
});
        
  