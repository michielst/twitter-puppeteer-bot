const puppeteer = require('puppeteer');
const user = require('./credentials.json');
const { login, tweet } = require('./twitter');

(async () => {
  const text = process.argv[2];
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();

  await login(page, user.email, user.username, user.password);
  await page.screenshot({ path: 'login.png' });
  await tweet(page, text);
  await page.screenshot({ path: 'tweet.png' });
  await browser.close();
})();
