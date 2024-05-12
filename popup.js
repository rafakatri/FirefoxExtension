document.addEventListener('DOMContentLoaded', function() {
    browser.runtime.sendMessage({action: "logCookies"}, function(response) {
      const infoElement = document.getElementById('info');
      infoElement.textContent = "Cookies:\n";
      infoElement.textContent += `Total de cookies: ${response.cookies.total}\n`;
      infoElement.textContent += `Mesmo dominio: ${response.cookies.firstParty}\n`;
      infoElement.textContent += `Terceiros: ${response.cookies.thirdParty}\n`;
      infoElement.textContent += `Cookies de sessao: ${response.cookies.sessionCookies}\n`;
      infoElement.textContent += `Cookies persistentes : ${response.cookies.persistentCookies}\n`;
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    browser.runtime.sendMessage({action: "getLocalStorage"}, function(response) {
      const cacheElement = document.getElementById('cache');
      cacheElement.textContent = "Local Storage:\n";
      cacheElement.textContent += `Total de dados: ${response.localStorageItems}\n`;
    });
  });


  document.addEventListener('DOMContentLoaded', function() {
    browser.runtime.sendMessage({action: "getThirdParty"}, function(response) {
      const thirdElement = document.getElementById('third');
      thirdElement.textContent = "Conexoes Third party: (recarregue a pagina para atualizar)\n";
      thirdElement.textContent += `${response.thirdPartyConnections}\n`;
    });
  });
  
  document.addEventListener('DOMContentLoaded', function() {
    const fingerprintElement = document.getElementById('fingerprint');
    const canvasElements = document.getElementsByTagName('canvas');
    fingerprintElement.textContent = canvasElements.length > 0 ? "Canvas detectado:\n" : "Canvas nao detectado\n";

    browser.runtime.onMessage.addListener((message) => {
        if (message.action === "fingerprintDetected") {
            const fingerprintElement = document.getElementById('fingerprint');
            fingerprintElement.textContent = "Fingerprint detectada:\n";
            const img = document.createElement('img');
            img.src = message.dataUrl;
            fingerprintElement.appendChild(img);
        }
    });
});
  