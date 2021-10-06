// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {

  'open sidebar': browser => {
    browser
      .openHomepage()
      .assert.visible('#btn__sidebar--open')
      .assert.not.visible('#sidebar')
      .click('#btn__sidebar--open')
      .assert.visible('#sidebar')
      .assert.visible('#btn__sidebar--close')
      .click('#btn__sidebar--close')
      .assert.not.visible('#sidebar')
      .end()
  }
}
