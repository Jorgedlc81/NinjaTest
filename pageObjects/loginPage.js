const { By } = require('selenium-webdriver');
module.exports = {
  selectors: {
    username: By.id('email'),
    password: By.id('password'),
    submitButton: By.xpath('//*[@id="root"]/div/div/div/form/button'),
    alertError: By.css('.alert.alert-danger'),
    fieldError: By.css('.form-group.has-error'),
  },
};
