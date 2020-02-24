const puppeteer = require('puppeteer');
const user = require('./credentials.json');
const { login, tweet } = require('./twitter');

(async () => {
  const text = process.argv[2];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await login(page, user.email, user.password);
  await tweet(page, text);
  await browser.close();
})();
