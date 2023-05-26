## Testing

### Unit testing

Unit tests are run with Jest ([ts-jest](https://kulshekhar.github.io/ts-jest/)):

```bash
yarn jest
```

### Unit Testing

To perform unit testing in your Next.js project using `ts-jest`, follow the instructions below:

#### Prerequisites

Before running the unit tests, ensure that you have the following prerequisites installed:

- [Node.js](https://nodejs.org) (version 12 or higher)
- [Yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com) package manager

#### Running Unit Tests

Unit tests can be executed using the `jest` command. Make sure you are in the root directory of your Next.js project and run the following command:

```bash
yarn jest
```

This will run all the unit tests present in your project.

#### Writing Unit Tests

To write unit tests, create test files with the `.test.ts` or `.spec.ts` extension. Place these files alongside the source files they are testing. For example, if you have a file named `example.ts`, create a corresponding test file named `example.test.ts` in a colocated `__tests__` directory.

In your test files, use the Jest testing framework to write your unit tests. You can import the necessary modules and write assertions to verify the expected behavior of your code.

Here is an example unit test using Jest:

```typescript
// __tests__/example.spec.ts

import { sum } from "./example";

describe("sum", () => {
  it("sum function adds two numbers correctly", () => {
    expect(sum(2, 3)).toBe(5);
    expect(sum(0, 0)).toBe(0);
    expect(sum(-5, 5)).toBe(0);
  });
});
```

In this example, we are testing a `sum` function to ensure it adds two numbers correctly.

#### Additional Resources

For more information on writing unit tests using Jest and `ts-jest`, refer to the following resources:

- [Jest Documentation](https://jestjs.io/docs/en/getting-started)
- [ts-jest Documentation](https://kulshekhar.github.io/ts-jest/)
- Install of your dev dependencies: `yarn install`

These resources provide detailed documentation and examples to help you write effective unit tests for your Next.js project.

### E2E Testing

To perform end-to-end (E2E) testing in your Next.js project using Cypress, follow the instructions below:

#### Prerequisites

Before running E2E tests, ensure that you have the following prerequisites installed:

- [Node.js](https://nodejs.org) (version 12 or higher)
- [Yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com) package manager
- Install of your dev dependencies: `yarn install`

#### Running E2E Tests

E2E tests can be executed using the Cypress CLI. Make sure you are in the root directory of your Next.js project and run the following command:

```bash
yarn cypress
```

This will launch the Cypress Test Runner, where you can select and run your E2E tests interactively.

#### Writing E2E Tests

To write E2E tests for your Next.js project, create test files with the `.spec.ts` or `.spec.js` extension. Place these files inside the `cypress/e2e` directory.

In your E2E test files, use the Cypress testing framework to write your tests. Cypress provides a fluent API to interact with your application and make assertions on its behavior.

Here is an example E2E test using Cypress:

```typescript
// cypress/integration/example.spec.ts

describe("Example E2E Test", () => {
  it("should navigate to the about page", () => {
    cy.visit("/"); // Visit the homepage
    cy.contains("About").click(); // Click on the "About" link
    cy.url().should("include", "/about"); // Assert that the URL includes "/about"
  });

  it("should display a list of items", () => {
    cy.visit("/items"); // Visit the items page
    cy.get(".item").should("have.length", 5); // Assert that there are 5 items on the page
  });
});
```

In this example, we have two E2E tests: one to navigate to the about page and another to verify the presence of a list of items.

#### Additional Resources

For more information on writing E2E tests using Cypress, refer to the following resources:

- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Real World App Examples](https://github.com/cypress-io/cypress-realworld-app)

These resources provide detailed documentation, guides, and examples to help you write effective E2E tests for your Next.js project using Cypress.
