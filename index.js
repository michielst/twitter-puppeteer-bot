const puppeteer = require('puppeteer');
const user = require('./credentials.json');
const { login, tweet } = require('./twitter');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await login(page, user.email, user.password);
  await tweet(page, 'test');
  await browser.close();
})();
