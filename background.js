// background.js
function logCookies() {
    browser.cookies.getAll({}).then(cookies => {
      console.log("Cookies:");
      cookies.forEach(cookie => {
        console.log(`Domain: ${cookie.domain}, Name: ${cookie.name}, Value: ${cookie.value}`);
      });
    });
  }
  
function logCache() {
    browser.storage.local.get(null).then(data => {
        console.log("Local Storage:");
        Object.entries(data).forEach(([key, value]) => {
        console.log(`${key}: ${value}`);
        });
    });
}

function logBrowserInfo() {
    console.log("Browser Information:");
    console.log(`Version: ${browser.runtime.getBrowserInfo().version}`);
    console.log(`Build ID: ${browser.runtime.getBrowserInfo().buildID}`);
    console.log(`Locale: ${browser.runtime.getBrowserInfo().locale}`);
}
  
browser.browserAction.onClicked.addListener(() => {
    logCookies();
    logCache();
    logBrowserInfo();
  });
  