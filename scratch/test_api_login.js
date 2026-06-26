const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.testing') });

async function run() {
  const email = process.env.CLUSTERIX_EMAIL;
  const password = process.env.CLUSTERIX_PASSWORD;

  console.log(`Attempting API login for ${email}...`);

  const response = await fetch('https://auth-api-testing.innoscripta.com/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  console.log('Status:', response.status);
  const text = await response.text();
  console.log('Response:', text.substring(0, 500));
}

run().catch(console.error);
