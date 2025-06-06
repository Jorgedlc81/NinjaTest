const { Builder, By, until } = require('selenium-webdriver');
const assert = require('assert');
const testData = require('../testData/testData');
const performLogin = require('../utils/loginHelper');

describe('Login Tests', function () {
  let driver;
  this.timeout(20000);

  beforeEach(async () => {
    driver = await new Builder().forBrowser('chrome').build();
    await driver.get('https://app.ninjarmm.com/auth/#/login');
  });

  afterEach(async () => {
    await driver.quit();
  });

  it('TC_LOGIN_001 - Valid login', async () => {
    await performLogin(driver, testData.validCredentials.username, testData.validCredentials.password);

    await driver.wait(until.urlContains('mfa'), 10000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('mfa'), `Login failed or not redirected: current URL is ${currentUrl}`);
  });

  it('TC_LOGIN_002 - Invalid Password', async () => {
    await performLogin(driver, testData.validCredentials.username, testData.invalidCredentials.password);

    const alert = await driver.wait(until.elementLocated(By.css('.alert.alert-danger')));
    const message = await alert.getText();
    assert.ok(message.length > 0, 'Expected error message not found');
  });

  it('TC_LOGIN_003 - Invalid UserName', async () => {
    await performLogin(driver, testData.invalidCredentials.username, testData.validCredentials.password);

    const alert = await driver.wait(until.elementLocated(By.css('.alert.alert-danger')));
    const message = await alert.getText();
    assert.ok(message.length > 0, 'Expected error message not found');
  });

  it('TC_LOGIN_004 - Blank fields', async () => {
    await performLogin(driver, testData.invalidCredentials.username, testData.validCredentials.password);

    const errorGroup = await driver.wait(until.elementLocated(By.css('.form-group.has-error')));
    assert.ok(await errorGroup.isDisplayed(), 'Email field is not marked with an error');
  });

  it('TC_LOGIN_005 - Forgot Password Navigation', async () => {
    const forgotLink = await driver.wait(until.elementLocated(By.css('a[href="#/resetPassword"]')), 5000);
    await forgotLink.click();
    await driver.wait(until.urlIs('https://app.ninjarmm.com/auth/#/resetPassword'), 5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('resetPassword'), `Login failed or not redirected: current URL is ${currentUrl}`);

  });

  it('TC_LOGIN_006 - Registration Navigation', async () => {
    const signUpLink = await driver.wait(until.elementLocated(By.css('a[href="#/register"]')), 5000);
    await signUpLink.click();
    await driver.wait(until.urlContains('https://app.ninjarmm.com/auth/#/register'),5000);
    const currentUrl = await driver.getCurrentUrl();
    assert.ok(currentUrl.includes('register'), `Failed to navigate to registration page. Current URL: ${currentUrl}`);

  });

});