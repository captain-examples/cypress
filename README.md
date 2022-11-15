# Getting Captain working with Cypress

## 1. 🧪 Ensure Cypress produces JUnit output

By default, Cypress does not support multiple reporters. To maintain your existing reporter behavior, you'll need to install [`mocha-multi-reporters`](https://github.com/stanleyhlng/mocha-multi-reporters). This package acts as a single reporter for Cypress (which behind the scenes runs Mocha) and delegates to any number of other reporters configured with it: `npm install --save-dev mocha-multi-reporters`.

Additionally, you'll need to install [`mocha-junit-reporter`](https://github.com/michaelleeallen/mocha-junit-reporter) to produce JUnit output. We'll configure `mocha-multi-reporters` to produce the standard built-in Cypress output (`spec`) and JUnit output: `npm install --save-dev mocha-junit-reporter`.

Once both packages are installed, adapt your own [Cypress configuration][cypress-configuration] and [Cypress multi-reporters configuration][cypress-multi-reporters-configuration] to configure Cypress to use the reporters as we have in this example.

## 2. 🔐 Create an Access Token

Create an Access Token for your organization within [Captain][captain-access-tokens] ([more documentation here][create-access-token-docs]).

Add the new token as an action secret to your repository. Conventionally, we call this secret `RWX_ACCESS_TOKEN`.

## 3. 💌 Install the CLI and call it when running tests

See the [full documentation on test suite integration][test-suite-integration].

```yaml
- uses: rwx-research/setup-captain@v1
- name: Run Cypress
  uses: cypress-io/github-action@v4
  with:
    browser: chrome
    config: "video=false"
    command-prefix: "captain run --suite-id captain-examples-cypress --test-results \"tmp/junit/*.xml\" --"
  env:
    RWX_ACCESS_TOKEN: ${{ secrets.RWX_ACCESS_TOKEN }}
```

## 4. 🎉 See your test results in Captain!

Take a look at the [final workflow][workflow-with-captain], [Cypress configuration][cypress-configuration], and [Cypress multi-reporters configuration][cypress-multi-reporters-configuration]!

[captain-access-tokens]: https://account.rwx.com/deep_link/manage/access_tokens
[create-access-token-docs]: https://www.rwx.com/docs/access-tokens
[workflow-with-captain]: https://github.com/captain-examples/cypress/blob/main/.github/workflows/ci.yml
[cypress-configuration]: https://github.com/captain-examples/cypress/blob/main/cypress.config.js
[cypress-multi-reporters-configuration]: https://github.com/captain-examples/cypress/blob/main/cypress-multi-reporters.json
[test-suite-integration]: https://www.rwx.com/captain/docs/test-suite-integration
