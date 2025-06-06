
const { By, until } = require('selenium-webdriver');

async function performLogin(driver, username, password) {
  const emailField = await driver.wait(until.elementLocated(By.id('email')), 5000);
  await emailField.clear();
  await emailField.sendKeys(username);

  const passwordField = await driver.findElement(By.id('password'));
  await passwordField.clear();
  await passwordField.sendKeys(password);

  const submitButton = await driver.findElement(By.xpath('//*[@id="root"]/div/div/div/form/button'));
  await submitButton.click();
}

module.exports = performLogin;
