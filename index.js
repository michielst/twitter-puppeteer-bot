const puppeteer = require('puppeteer');
const user = require('./credentials.json');
const { login, tweet } = require('./twitter');

(async () => {
  process.argv.shift(); // skip node.exe
  process.argv.shift(); // skip name of js file
  const text = process.argv.join(' ');

  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  await login(page, user.email, user.username, user.password);
  await page.screenshot({ path: 'screenshots/login.png' });
  await tweet(page, text);
  await page.screenshot({ path: 'screenshots/tweet.png' });
  await browser.close();
})();
