describe('Registration and Login', () => {
  const url = Cypress.config().baseUrl;
  const randomUsername = generateUsername();
  const phone = generateRandomPhoneNumber();
  const password = '123123';

  it('Registers a new user and logs in successfully', () => {
    // Debug API request
    cy.request({
      method: 'POST',
      url: '/api/member/register', // Adjust to actual endpoint
      headers: {
        'Origin': Cypress.config().baseUrl || 'https://ibc22.porsche68.com',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'application/json'
      },
      body: {
        username: randomUsername,
        phone_number: phone,
        password: password,
        confirm_password: password
      },
      failOnStatusCode: false
    }).then((response) => {
      cy.log('API Response Status:', response.status);
      cy.log('API Response Body:', response.body);
    });


    // // Intercept to modify the Origin header (optional)
    // cy.intercept('POST', '/register', (req) => {
    //     req.headers['Origin'] = Cypress.config().baseUrl || 'https://ibc22.porsche68.com/';
    // }).as('registerRequest');

    // Step 1: Visit registration page with custom user-agent
    cy.visit('/', {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Referer': 'https://ibc22.porsche68.com/',
        'Sec-Fetch-Mode': 'navigate' 
      }
    });
    cy.document().its('readyState').should('eq', 'complete');
    cy.window().should('have.property', 'location');
    cy.get('button:contains("REGISTER")').should('be.visible').click();

    // Step 2: Fill registration form
    cy.get('input[name="username"]').should('be.visible').type(randomUsername).blur();
    cy.wait(2000); // Replace with proper wait if possible
    cy.get('input[formcontrolname="phone_number"]').should('be.visible').type(phone).blur();
    cy.wait(2000); // Replace with proper wait if possible
    cy.get('input[formcontrolname="password"]').should('be.visible').type(password).blur();
    cy.wait(2000); // Replace with proper wait if possible
    cy.get('input[formcontrolname="confirm_password"]').should('be.visible').type(password).blur();
    cy.wait(5000); // Replace with proper wait if possible
    cy.get('div.col-12.form-group')
      .find('button.main-button-1.button-height')
      .should('be.visible')
      .click({ force: true });

    // Step 5: Wait for redirection
    cy.url({ timeout: 10000 }).should('include', '/member/profile');
  });
});

function generateUsername(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const minLength = 6;
  const maxLength = 16;
  const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength; // Random length between 6 and 16

  let username = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    username += chars.charAt(randomIndex);
  }
  return username;
}

function generateRandomPhoneNumber() {
  const prefixes = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
  const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const randomPostfix = Math.floor(Math.random() * 10000000).toString().padStart(7, '0'); // Ensure 7 digits
  return randomPrefix + randomPostfix;
}