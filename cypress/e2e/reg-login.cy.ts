describe('Registration and Login', () => {
    const baseUrl = 'https://ibc22.porsche68.com';
    const randomUsername = generateRandomUsername();
    const phone = generateRandomPhoneNumber();
    const fullName = generateRandomFullName();
    const password = '123123';
    
    it('Registers a new user and logs in successfully', () => {
    // Step 1: Visit registration page
    cy.visit(`${baseUrl}`);
    cy.contains('button', 'REGISTER').click();
+
    // Step 2: Fill registration form
    cy.get('input[name="username"]').type(randomUsername);
    cy.get('input[formcontrolname="phone_number"]').type(phone);
    cy.get('input[formcontrolname="full_name"]').type(fullName);
    cy.get('input[formcontrolname="password"]').type(password);
    cy.get('input[formcontrolname="confirm_password"]').type(password);
    cy.wait(10000);
    cy.get('div.col-12.form-group').find('button.main-button-1.button-height').scrollIntoView().click({ force: true });

    // Step 5: Wait for redirection
      cy.wait(20000);
      cy.contains('a', 'LOGOUT', { timeout: 10000 }).should('be.visible');
            
    });
});

function generateRandomUsername(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const length = Math.floor(Math.random() * (16 - 6 + 1)) + 6; // random length between 6–16
  let username = '';
  for (let i = 0; i < length; i++) {
    username += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return username;
}

function generateRandomPhoneNumber() {
      const prefixes = ['10', '11', '12', '13', '14', '15', '16', '17', '18', '19'];
      const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
      const randomPostfix = Math.floor(Math.random() * 10000000); // Random 8 digits postfix
      return randomPrefix + randomPostfix;
}

function generateRandomFullName(): string {
  const firstNames = ['Alex', 'Jamie', 'Taylor', 'Jordan', 'Morgan', 'Casey', 'Riley'];
  const lastNames = ['Lee', 'Tan', 'Lim', 'Wong', 'Ng', 'Chong', 'Chan'];
  const first = firstNames[Math.floor(Math.random() * firstNames.length)];
  const last = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${first} ${last}`;
}