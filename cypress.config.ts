import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://ibc22bo.porsche68.com/login/auth', // Or your target site
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    projectId: "eynnyd"
  }
  
});
