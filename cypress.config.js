const { defineConfig } = require("cypress");

module.exports = defineConfig({
  screenshotsFolder: "tmp/cypress_screenshots",
  videosFolder: "tmp/cypress_videos",
  trashAssetsBeforeRuns: false,
  reporter: "mocha-multi-reporters",
  reporterOptions: {
    configFile: "cypress-multi-reporters.json",
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
