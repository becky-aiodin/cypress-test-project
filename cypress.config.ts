import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://ibc22.porsche68.com', // Or your target site
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    projectId: "eynnyd",
    chromeWebSecurity: false,
    viewportWidth: 1280,
    viewportHeight: 800,
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-web-security');
        }
        return launchOptions;
      });
    },
  }
  
});
