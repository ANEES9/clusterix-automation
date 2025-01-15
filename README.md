# **Clusterix Automation**

Clusterix Automation is an **End-to-End (E2E)** testing framework built with **[Playwright](https://playwright.dev/)** to streamline and automate testing for the **Clusterix** platform.

---

## **Features**

- **Cross-Browser Testing:** Supports testing on Chromium, Firefox, and WebKit.
- **Environment Configurations:** Easily switch between environments (production, testing).
- **Allure Test Reporting:** Generate detailed, interactive HTML test reports for debugging and analysis.
- **Screenshots and Video Recording:** Automatically captures screenshots and videos for failed tests.
- **Retry Mechanism:** Automatically retries flaky tests to ensure reliability.
- **API Testing Support:** Includes support for API tests within the same framework.
- **Session Management:** Saves authentication sessions to avoid repeated logins.
- **CI/CD Pipeline Support:** Easily integrates with CI/CD systems like GitLab and GitHub Actions.

---

## **Requirements**

- **Node.js** (version 16 or higher)
- **npm** or **yarn**
- **Allure Command Line Tool** (for generating reports)

Verify your Node.js and npm installation:

```bash
node -v
npm -v
```

### **Install Allure CLI**

**MacOS:**

```bash
brew install allure
```

**Windows:**

1. Download Allure from the [official website](https://allurereport.org/docs/install-for-windows/).
2. Extract and add it to the **PATH** environment variable.
3. Verify installation:

```bash
allure --version
```

---

## **Setup**

### **1. Clone the Repository**

```bash
git clone <repository-url>
cd <repository-folder>
```

### **2. Install Dependencies**

```bash
npm install
```

### **3. Install Browsers**

```bash
npx playwright install
```

### **4. Setup Environment Variables**

Create `.env.production` and `.env.testing` files in the root directory.

**Example `.env.production`:**

```
CLUSTERIX_BASE_URL=https://production.clusterix.io
CLUSTERIX_EMAIL=production_user@example.com
CLUSTERIX_PASSWORD=productionPassword123
```

**Example `.env.testing`:**

```
CLUSTERIX_BASE_URL=https://testing.clusterix.io
CLUSTERIX_EMAIL=testing_user@example.com
CLUSTERIX_PASSWORD=testingPassword123
```

Ensure these files are added to `.gitignore` to keep sensitive data secure.

---

# **Running Tests**

## **MacOS**

### **1. Run Tests in Production Environment**

```bash
NODE_ENV=production npx playwright test
```

### **2. Run Tests in Testing Environment**

```bash
NODE_ENV=testing npx playwright test
```

---

## **Windows**

### **1. Run Tests in Production Environment**

```powershell
$env:NODE_ENV="production"; npx playwright test
```

### **2. Run Tests in Testing Environment**

```powershell
$env:NODE_ENV="testing"; npx playwright test
```

---

## **Simplified Commands Using npm Scripts**

### **MacOS and Windows**

### **Production:**

```bash
npm run test:prod
```

### **Testing:**

```bash
npm run test:testing
```

---

## **Additional Scenarios and Options**

### **1. Run a Specific Test File**

**MacOS:**

```bash
NODE_ENV=production npx playwright test tests/login.spec.ts
```

**Windows:**

```powershell
$env:NODE_ENV="production"; npx playwright test tests/login.spec.ts
```

---

### **2. Run Tests in Specific Browsers**

**MacOS:**

```bash
NODE_ENV=production npx playwright test --project=chromium
NODE_ENV=production npx playwright test --project=firefox
NODE_ENV=production npx playwright test --project=webkit
```

**Windows:**

```powershell
$env:NODE_ENV="production"; npx playwright test --project=chromium
$env:NODE_ENV="production"; npx playwright test --project=firefox
$env:NODE_ENV="production"; npx playwright test --project=webkit
```

---

### **3. Debug Tests**

**MacOS:**

```bash
NODE_ENV=production npx playwright test --debug
```

**Windows:**

```powershell
$env:NODE_ENV="production"; npx playwright test --debug
```

**Slow Motion Mode:**

```bash
NODE_ENV=testing npx playwright test --slow-mo=100
```

---

### **4. Run Tests in Headed Mode (Visible Browser)**

**MacOS and Windows:**  
Edit **playwright.config.ts**:

```typescript
headless: false
```

Or run directly:

```bash
NODE_ENV=production npx playwright test --headed
```

---

# **Session Management**

### **Save Login Session:**

Session management is automated using globalSetup.
When you run the tests for the first time, the session is saved automatically if it does not already exist.
To Save Session:

```bash
NODE_ENV=production npx playwright test
```

### **Verify Saved Session:**

Check the `/sessions` folder:

```
sessions/
  storageState.production.json
  storageState.testing.json
```

### **Reuse Session Automatically:**

Stored session states will be reused in tests to skip login steps.
If the session file is missing or needs to be recreated:

```bash
rm -rf sessions/storageState.production.json
NODE_ENV=production npx playwright test
```

---

# **Best Practices**

1. **Organize Tests:** Group related tests into separate `.spec.ts` files for better organization.
2. **Use Efficient Locators:** Prefer semantic locators (e.g., `getByRole`) over raw CSS or XPath for better maintainability.
3. **Enable Screenshots and Videos:** Configure options to capture media for debugging failed tests.
4. **Avoid Hardcoding:** Use environment variables for configurations like URLs, emails, and passwords.
5. **Retry Flaky Tests:** Use the `retries` option in Playwright configuration to handle flaky tests.
6. **Link Tests to Manual Cases:** Include comments with Testmo Case IDs to link your test code:

```typescript
// Test Case ID: TESTMO-1234
```

---

# **Contributing**

1. Fork the repository.
2. Create a new branch:

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

---

# **Allure Reporting and Metadata**

## **What is Allure Reporting?**

**Allure** is a flexible reporting framework for test automation that generates **interactive reports** with detailed insights into test executions.

### **Key Features:**

- **Step-by-Step Test Execution:** Tracks every step within a test for debugging.
- **Screenshots and Logs:** Attach logs, screenshots, and videos for each step.
- **Metadata:** Use tags, severity levels, and labels for better organization and filtering.
- **History and Trends:** Tracks trends for test stability over time.

---

## **Allure Setup**

1. **Install Dependencies:**

```bash
npm install allure-playwright
```

2. **Add Allure Results Folder in `.gitignore`:**

```
allure-results/
allure-report/
```

---

# **Using Allure Tags and Metadata**

Allure allows adding metadata to tests, which is useful for filtering and reporting.

### **1. Epic, Feature, and Story:**

- **`epic`:** Groups tests under a high-level module or component.
- **`feature`:** Marks related tests that cover a specific feature.
- **`story`:** Adds a more detailed breakdown for test scenarios.

**Example:**

```typescript
allure.epic('Dashboard') // Group tests under 'Dashboard'
allure.feature('Notifications') // Feature related to Notifications
allure.story('Open Notifications Panel') // Specific scenario for testing panel
```

---

### **2. Severity Levels:**

Define the criticality of tests for prioritization:

| Severity   | Description                                         |
| ---------- | --------------------------------------------------- |
| `blocker`  | Critical issue; blocks further testing or releases. |
| `critical` | High-priority feature failures.                     |
| `normal`   | Regular functionality checks.                       |
| `minor`    | Low-priority issues.                                |
| `trivial`  | Cosmetic or very minor issues.                      |

**Example:**

```typescript
allure.severity('critical') // Mark test as critical
```

---

### **3. Labels and Tags:**

- **`label`:** Adds custom metadata like team ownership.
- **`tag`:** Groups tests based on functionality, type, or category.

**Example:**

```typescript
allure.label('owner', 'QA Team') // Assign ownership to QA Team
allure.tag('smoke') // Mark test as a smoke test
allure.tag('regression') // Useful for regression test runs
```

---

### **4. Steps for Traceability:**

**Allure Steps** allow breaking tests into smaller, trackable actions.

**Example:**

```typescript
await allure.step('Locate the Notifications button', async () => {
  const notificationsButton = page.getByRole('button', {
    name: 'Notifications',
  })
  await expect(notificationsButton).toBeVisible()
})
```

---

### **5. Attachments (Logs, Screenshots, Videos):**

**Attach Debug Data** like screenshots, logs, or custom data to reports.

**Example:**

```typescript
const screenshot = await page.screenshot()
allure.attachment('Screenshot', screenshot, 'image/png') // Attach screenshot
allure.attachment('Response Logs', JSON.stringify(response), 'application/json') // Attach JSON logs
```

---

# **Generating Reports**

0. **Clear Old Allure Results if required:**
```bash
Remove-Item -Recurse -Force allure-results
```

1. **Run Tests:**

```bash
npx playwright test
```

2. **Generate Allure Reports:**

```bash
allure generate allure-results --clean
```

3. **View Reports:**

```bash
allure open allure-report
```

---

# **Troubleshooting**

### **1. Missing Dependencies**

```bash
npm install
```

### **2. Missing Browsers**

```bash
npx playwright install
```

### **3. Missing Environment Variables**

Ensure your **.env.production** or **.env.testing** file has the required variables.

### **4. Port Conflicts**

Find and kill processes using the port:

```bash
lsof -i :5050
kill -9 <pid>
```
