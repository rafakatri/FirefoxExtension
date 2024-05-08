// popup.js
document.addEventListener('DOMContentLoaded', () => {
    const infoElement = document.getElementById('info');
    browser.cookies.getAll({}).then(cookies => {
        cookies.forEach(cookie => {
          infoElement.textContent += `Domain: ${cookie.domain}, Name: ${cookie.name}, Value: ${cookie.value}\n`;
        });
      });
  });
  