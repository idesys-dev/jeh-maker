
module.exports = {
    src_folders: ['tests/e2e/specs'],
  output_folder: 'tests/e2e/reports',
  page_objects_path: 'tests/e2e/page-objects',
  custom_assertions_path: 'tests/e2e/custom-assertions',
  custom_commands_path: 'tests/e2e/custom-commands',
    test_settings: {
        default: {
            launch_url: '${VUE_DEV_SERVER_URL}',
            
        },
        selenium: {
          selenium: {
            start_process: true,
            port: 4444,
            server_path: require('selenium-server').path,
            cli_args: {
              'webdriver.gecko.driver': require('geckodriver').path,
              'webdriver.chrome.driver': require('chromedriver').path
            }
          },
          webdriver: {
            start_process: false
          }
          },
          'selenium.chrome': {
            extends: 'selenium',
            desiredCapabilities: {
              browserName: 'chrome',
              chromeOptions : {
                w3c: false
              }
            }
          },
      
          'selenium.firefox': {
            extends: 'selenium',
            desiredCapabilities: {
              browserName: 'firefox'
            }
          }
    }
}