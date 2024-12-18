# **Clusterix Automation**

This project is an E2E testing framework built using [Playwright](https://playwright.dev/) to streamline and automate
testing for the Clusterix platform.

## **Features**

- Cross-Browser Testing: Supports testing on Chromium, Firefox, and WebKit.
- Environment Configurations: Easily switch between environments (production, testing).
- Allure Test Reporting: Generate detailed, interactive HTML test reports for debugging and analysis.
- Screenshots and Video Recording: Automatically captures screenshots and videos for failed tests.
- Retry Mechanism: Automatically retries flaky tests to ensure reliability.
- API Testing Support: Includes support for API tests within the same framework.

---

## **Requirements**

- Node.js (version 16 or higher)
- npm or yarn

To verify your Node.js and npm installation:

```bash
node -v
npm -v
```

---

## **Setup**

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd <repository-folder>
```

### **2. Install Dependencies**

Install Playwright and other dependencies:

```bash
npm install
```

### **3. Install Browsers**

Install the required browsers for Playwright:

```bash
npx playwright install
```

---

## **Runnig Tests**

### **1. Run Tests**

#### **For Production Environment**

To run the tests on the **production environment (`clusterix.io`)**, use:

```bash
NODE_ENV=production npx playwright test
```

#### **For Testing Environment**

To run the tests on the **testing environment (`testing.clusterix.io`)**, use:

```bash
NODE_ENV=testing npx playwright test
```

---

### **2. Running Tests with npm Scripts**

You can simplify the commands using predefined npm scripts in `package.json`. The following scripts are already
configured:

#### **Run Tests on Production**

```bash
npm run test:prod
```

#### **Run Tests on Testing**

```bash
npm run test:testing
```

These scripts internally set the environment variable `NODE_ENV` and execute the tests.

---

### **3. Running Specific Tests**

#### **Run a Specific Test**

You can target a single test file, for example:

```bash
NODE_ENV=production npx playwright test tests/login.spec.ts
```

#### **Run Tests in a Specific Browser**

To run tests in a specific browser (e.g., Chromium, Firefox, or WebKit):

```bash
NODE_ENV=production npx playwright test --project=chromium
NODE_ENV=production npx playwright test --project=firefox
NODE_ENV=production npx playwright test --project=webkit
```

---

### **4. Debugging Tests**

To debug tests interactively:

```bash
NODE_ENV=production npx playwright test --debug
```

To slow down interactions for better observation:

```bash
NODE_ENV=testing npx playwright test --slow-mo=100
```

---

### **5. Headed Mode**

Set `headless: false` in `playwright.config.ts` to see the browser during test execution.

---

### **6. Allure Test Reports**

You can use it to view interactive test results with screenshots, logs, and trace information
with [Allure](https://allurereport.org/).

Generating Reports
After running tests, generate an Allure report:

```bash
allure generate allure-results --clean
```

Viewing Reports
Open the Allure report in your browser:

```bash
allure open allure-report
```

## **Best Practices**

1. **Organize Tests**:
   Group related tests into separate `.spec.ts` files for better organization.

2. **Use Locators Efficiently**:
   Prefer semantic locators (e.g., `getByRole`) over raw CSS or XPath for better maintainability.

3. **Enable Screenshots and Videos**:
   Configure `screenshot` and `video` options for better debugging of failed tests.

4. **Avoid Hardcoding**:
   Use environment variables for dynamic configurations like URLs, usernames, and passwords.

5. **Retry Flaky Tests**:
   Use the `retries` option in the Playwright configuration to automatically retry failing tests.
6. **Link Test Cases to Automation Code**:
   Include testmo Case IDs as comments in test scripts.
   Use the following comment format to link your test scripts:
   ```typescript
   // Test Case ID: TESTMO-1234
   ```

---

## **Contributing**

1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.
