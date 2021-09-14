// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide


module.exports = {

  'exist homepage': browser => {
    browser
      .init()
      .waitForElementVisible('#app')
      .assert.elementPresent('#footer')
      .assert.containsText('div.home > h1', 'JEH Maker')
      .end()
  },

  'example e2e test using a custom command': browser => {
    browser
      .openHomepage()
      .assert.elementPresent('.home')
      .end()
  },

  'assign fee': browser => {
    browser
    .openHomepage()
    .assert.elementPresent('#frais-ht')
    .assert.elementPresent('#frais-ttc')
    .assert.elementPresent('#input-frais input')
    .setValue('#input-frais input', '6')
    browser.expect.element('#frais-ht').text.to.endWith('6,00 €') 
    browser.assert.containsText('#frais-ttc', '2 287,20 €')        
        .end()
     
  }
}
