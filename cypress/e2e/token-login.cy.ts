function generateRandomUsername(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let suffix = '';
  for (let i = 0; i < 5; i++) {
    suffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return 'test' + suffix; // total: 9 characters
}

function generateRandomPhone(): string {
  const prefix = '601'; // Malaysia
  const digits = Math.floor(10000000 + Math.random() * 90000000); // 8 digits
  return prefix + digits;
}

describe('Register New User (Bypass reCAPTCHA)', () => {
  const username = generateRandomUsername();
  const password = '123123';
  const phone = generateRandomPhone();

  it('should register a user after full page load', () => {
    cy.visit('http://landing3-ibc22.porsche68.com');

    cy.document().its('readyState').should('eq', 'complete');

    // ⌛ Wait for all fields
    cy.get('#username', { timeout: 10000 }).should('be.visible');
    cy.get('#password').should('be.visible');
    cy.get('#password_confirmation').should('be.visible');
    cy.get('#mobile_number').should('be.visible');

    // ✍️ Fill form
    cy.get('#username').type(username).blur();
    cy.wait(3000);
    cy.get('#password').type(password).blur();
    cy.get('#password_confirmation').type(password).blur();
    cy.get('#mobile_number').type(phone).blur();
    
    cy.intercept('POST', '**/recaptcha/verify', {
      statusCode: 200,
      body: { success: true },
    });

    cy.get('button#register').click();
    // ✅ Verify success alert
    /*cy.get('.swal2-popup.swal2-modal.swal2-icon-success', { timeout: 10000 })
      .should('be.visible')
      .within(() => {
        cy.get('#swal2-title').should('contain.text', 'Successfully registered!');
        cy.get('#swal2-content').should('contain.text', 'You are now logged in and will be redirected.');
        cy.get('button.swal2-confirm').should('be.visible').click();
    });*/

    cy.origin('https://ibc22.porsche68.com', () => {
      // Wait until redirected URL is fully loaded
        cy.location('hostname', { timeout: 10000 }).should('eq', 'ibc22.porsche68.com');
        // 🔑 Check JWT from localStorage
        cy.window().then((win) => {
        const jwt = win.localStorage.getItem('jwt');
        cy.log('JWT:', jwt);
        expect(jwt).to.not.be.null;
      });
    })

  });
});
