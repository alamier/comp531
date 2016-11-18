const webdriver = require('selenium-webdriver')

const url = 'http://localhost:8080'

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()

exports.driver = driver
exports.By = webdriver.By
exports.findId = id => driver.findElement(webdriver.By.id(id))
exports.findClassName = name => driver.findElement(webdriver.By.className(name))
exports.findAllCSS = css => driver.findElements(webdriver.By.css(css))
exports.findCSS = css => driver.findElement(webdriver.By.css(css))
exports.go = _ => driver.navigate().to(url)
exports.sleep = millis => driver.sleep(millis)