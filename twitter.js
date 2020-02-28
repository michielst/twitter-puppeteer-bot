const login = async (page, email, username, password) => {
  await open(page, 'https://twitter.com/login');
  await typeText(
    page,
    'input[name=session\\5busername_or_email\\5d]',
    username
  );
  await typeText(page, 'input[name=session\\5bpassword\\5d]', password);

  await click(
    page,
    '#react-root > div > div > div.css-1dbjc4n.r-1pi2tsx.r-13qz1uu.r-417010 > main > div > div > form > div > div:nth-child(8) > div'
  );

  if ((await page.$('#challenge_response')) !== null) {
    await typeText(page, '#challenge_response', email);
    await click(page, '#email_challenge_submit');
  }

  await waitForPageChange(page);

  console.log(`Logged in successfully to: ${username}`);
};

const tweet = async (page, tweet) => {
  await page.goto('https://twitter.com/compose/tweet');
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
