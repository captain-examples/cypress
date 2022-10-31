# Getting Captain working with Cypress

1. 🧪 Ensure Cypress produces JUnit output

By default, Cypress does not support multiple reporters. To maintain your existing reporter behavior, you'll need to install [`mocha-multi-reporters`](https://github.com/stanleyhlng/mocha-multi-reporters). This package acts as a single reporter for Cypress (which behind the scenes runs Mocha) and delegates to any number of other reporters configured with it: `npm install --save-dev mocha-multi-reporters`.

Additionally, you'll need to install [`mocha-junit-reporter`](https://github.com/michaelleeallen/mocha-junit-reporter) to produce JUnit output. We'll configure `mocha-multi-reporters` to produce the standard built-in Cypress output (`spec`) and JUnit output: `npm install --save-dev mocha-junit-reporter`.

Once both packages are installed, adapt your own [Cypress configuration][cypress-configuration] and [Cypress multi-reporters configuration][cypress-multi-reporters-configuration] to configure Cypress to use the reporters as we have in this example.

2. 🔐 Create an API token

Create an API token for your organization within [captain][captain-access-tokens], ([more documentation here][create-api-token-docs]).
The token needs write access.

Add the new token as an action secret to your repository. Conventionally, we call this secret `CAPTAIN_API_TOKEN`.

3. 💌 Add a step to upload to captain

```yaml
- name: Upload test results to Captain # optional, shows in github action results
  uses: rwx-research/upload-captain-artifact@v1
  if: always() # run even if build fails
  continue-on-error: true # if upload to captain fails, don't fail the build
  with:
    artifacts: |
      [
        {
          "name": "Cypress",
          "path": "tmp/junit/*.xml",
          "kind": "test_results",
          "parser": "cypress_junit_xml"
        }
      ]
    captain-token: '${{ secrets.CAPTAIN_API_TOKEN }}'
```

4. 🎉 See your test results in Captain!

Take a look at the [final workflow][workflow-with-captain], [Cypress configuration][cypress-configuration], and [Cypress multi-reporters configuration][cypress-multi-reporters-configuration]!

For more information on the github action, see [its readme][action-readme].

[captain-access-tokens]: https://captain.build/deep_link/manage/access_tokens
[create-api-token-docs]: https://www.rwx.com/captain/docs/api-tokens#generating-an-api-token
[workflow-with-captain]: https://github.com/captain-examples/cypress/blob/main/.github/workflows/ci.yml
[cypress-configuration]: https://github.com/captain-examples/cypress/blob/main/cypress.config.js
[cypress-multi-reporters-configuration]: https://github.com/captain-examples/cypress/blob/main/cypress-multi-reporters.json
[action-readme]: https://github.com/rwx-research/upload-captain-artifact/#readme
