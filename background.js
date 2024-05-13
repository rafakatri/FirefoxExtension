let currentTabUrl = null;
let thirdPartyConnections = new Set();

function getCurrentTabUrl(callback) {
  browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
    currentTabUrl = new URL(tabs[0].url);
    callback(currentTabUrl);
  });
}

getCurrentTabUrl(function(url) {
  console.log(url);
});

browser.tabs.onActivated.addListener(function(activeInfo) {
  thirdPartyConnections.clear();
  getCurrentTabUrl(function(url) {
    console.log(url);
  });
});

browser.webRequest.onBeforeRequest.addListener(
  (details) => {
    const requestUrl = new URL(details.url);
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const tabUrl = new URL(tabs[0].url);
      if (!requestUrl.hostname.endsWith(tabUrl.hostname)) {
        thirdPartyConnections.add(requestUrl.hostname);
      }
    });
  },
  {urls: ["<all_urls>"]}
);

function logCookies(url, callback) {
  url = url.replace(/^www\./, '');
  browser.cookies.getAll({}, function(cookies) {
    const cookieDetails = {
      total: cookies.length,
      firstParty: 0,
      thirdParty: 0,
      sessionCookies: 0,
      persistentCookies: 0,
    };

    cookies.forEach(cookie => {
      if (cookie.domain === url || cookie.domain === `.${url}`) {
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

function getLocalStorageItems(callback) {
  const code = 'localStorage.length;';

  browser.tabs.executeScript({
    code: code
  }, function(results) {
    callback(results[0]);
  });
}

browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "logCookies") {
    logCookies(currentTabUrl.hostname, function(cookieDetails) {
      sendResponse({cookies: cookieDetails});
    });
    return true;
  }
  else if (message.action === "getLocalStorage") {
    getLocalStorageItems(function(items) {
      sendResponse({localStorageItems: items});
    });
    return true;
  }
  else if (message.action === "getThirdParty") {
    browser.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const thirdPartyConnectionsString = Array.from(thirdPartyConnections).join('\n');
      sendResponse({thirdPartyConnections: thirdPartyConnectionsString});
    });
    return true;
  }
});
