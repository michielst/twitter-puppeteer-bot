const login = async (page, email, password) => {
  await open(page, 'https://twitter.com/login');
  await typeText(page, 'input[name=session\\5busername_or_email\\5d]', email);
  await typeText(page, 'input[name=session\\5bpassword\\5d]', password);
  const [loginButton] = await page.$x(
    '//*[@id="react-root"]/div/div/div[2]/main/div/div/form/div/div[3]/div'
  );
  loginButton.click();
  await waitForPageChange(page);
  console.log(`Logged in successfully to: ${email}`);
};

const tweet = async (page, tweet) => {
  await open(page, 'https://twitter.com/compose/tweet');
  await focus(page, '.public-DraftEditor-content');
  await page.keyboard.type(tweet);
  await click(page, 'div[data-testid=tweetButton]');
  await waitForPageChange(page);
  console.log(`Tweeted successfully`);
};

const waitForPageChange = async page => {
  await page.waitForNavigation({ timeout: 120000 });
};

const click = async (page, selector) => {
  await page.waitForSelector(selector);
  await page.click(selector);
};

const open = async (page, url) => {
  await page.goto(url);
};

const typeText = async (page, selector, text) => {
  await page.waitForSelector(selector);
  await page.type(selector, text);
};

const focus = async (page, selector) => {
  await page.waitForSelector(selector);
  await page.focus(selector);
};

module.exports = {
  login,
  tweet
};
