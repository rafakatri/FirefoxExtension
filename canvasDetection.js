// canvasDetection.js
function injectScript(scriptContent) {
    const script = document.createElement('script');
    script.textContent = scriptContent;
    (document.head || document.documentElement).appendChild(script);
    script.remove();
}

const scriptContent = `
    const originalToDataURL = HTMLCanvasElement.prototype.toDataURL;
    HTMLCanvasElement.prototype.toDataURL = function() {
        const dataUrl = originalToDataURL.apply(this, arguments);
        console.warn('Canvas data URL method called, possible fingerprinting attempt');
        window.postMessage({type: 'fingerprintDetected', dataUrl: dataUrl}, '*');
        return dataUrl;
    };
`;

window.addEventListener('message', (event) => {
    if (event.data.type === 'fingerprintDetected') {
        browser.runtime.sendMessage({action: "fingerprintDetected", dataUrl: event.data.dataUrl});
    }
});

injectScript(scriptContent);
