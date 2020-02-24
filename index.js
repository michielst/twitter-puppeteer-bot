const puppeteer = require('puppeteer');
const user = require('./credentials.json');
const { login, tweet } = require('./twitter');

(async () => {
  const tweet = process.argv[2];
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await login(page, user.email, user.password);
  await tweet(page, tweet);
  await browser.close();
})();
