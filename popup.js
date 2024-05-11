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
  