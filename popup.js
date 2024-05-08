document.addEventListener('DOMContentLoaded', () => {
    const infoElement = document.getElementById('info');

    // Function to update the cookies displayed in the popup
    function updateCookiesDisplay() {
        browser.cookies.getAll({}).then(cookies => {
            infoElement.textContent = `${cookies.length}\n`; // Clear the existing content
            cookies.forEach(cookie => {
                infoElement.textContent += `Domain: ${cookie.domain}, Name: ${cookie.name}, Value: ${cookie.value}\n`;
            });
        });
    }

    // Update the cookies display initially
    updateCookiesDisplay();

    // Listen for changes to cookies and update the display accordingly
    browser.cookies.onChanged.addListener((changeInfo) => {
        updateCookiesDisplay();
    });
});
