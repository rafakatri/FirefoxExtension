let currentTabUrl = null;

function getCurrentTabUrl(callback) {
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    currentTabUrl = new URL(tabs[0].url);
    callback(currentTabUrl);
  });
}

// Use the function to get the current tab URL
getCurrentTabUrl(function(url) {
  console.log(url);
});

// Listen for tab changes and update the currentTabUrl
browser.tabs.onActivated.addListener(function(activeInfo) {
  getCurrentTabUrl(function(url) {
    console.log(url);
  });
});

function logCookies(url, callback) {
  browser.cookies.getAll({}, function(cookies) {
    const cookieDetails = {
      total: cookies.length,
      firstParty: 0,
      thirdParty: 0,
      sessionCookies: 0,
      persistentCookies: 0
    };

    cookies.forEach(cookie => {
      if (cookie.domain === url) {
        cookieDetails.firstParty++;
      } else {
        cookieDetails.thirdParty++;
      }

      if ("session" in cookie && cookie.session) {
        cookieDetails.sessionCookies++;
      } else {
        cookieDetails.persistentCookies++;
      }
    });

    callback(cookieDetails);
  });
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "logCookies") {
    logCookies(currentTabUrl.hostname, function(cookieDetails) {
      sendResponse({cookies: cookieDetails});
    });
    return true;
  }
});
