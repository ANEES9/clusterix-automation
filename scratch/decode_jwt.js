const fs = require('fs');
const path = require('path');

const sessionPath = path.join(__dirname, '../sessions/storageState.testing.en.json');
const data = JSON.parse(fs.readFileSync(sessionPath, 'utf8'));

const userItem = data.origins[0].localStorage.find(item => item.name === 'user');
const userObj = JSON.parse(userItem.value);
const jwt = userObj.access_token;

console.log('JWT:', jwt);

const parts = jwt.split('.');
console.log('Number of parts:', parts.length);
if (parts.length === 3) {
  try {
    const payloadStr = Buffer.from(parts[1], 'base64').toString('utf8');
    console.log('Payload decoded length:', payloadStr.length);
    console.log('Payload JSON:', JSON.parse(payloadStr));
  } catch (e) {
    console.error('Failed to parse payload:', e);
  }
}
