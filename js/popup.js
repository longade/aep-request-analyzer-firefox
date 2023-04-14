var enabled = true; //enabled by default
const enableToggle = document.querySelector('#enable-toggle');
const enableToggleLabel = document.querySelector('.toggle-label');
const buttonDiv = document.querySelector('#button-div');
const permButton = document.querySelector('#perm-button');
const mainDiv = document.querySelector('#main-div');

browser.storage.local.get('enabled', data => {
    enabled = !!data.enabled;
    if (enabled) {
        enableToggle.setAttribute('checked', enabled);
    }
    enableToggleLabel.textContent = enabled ? 'ON' : 'OFF';
});

enableToggle.addEventListener('change', () => {
    enabled = !enabled;
    if (enabled) {
        enableToggle.setAttribute('checked', enabled);
    }
    else {
        enableToggle.removeAttribute('checked');
    }
    enableToggleLabel.textContent = enabled ? 'ON' : 'OFF';
    browser.storage.local.set({ enabled: enabled });
});

permButton.addEventListener('click', (event) => {
    browser.permissions.request({
        origins: ['*://*/*']
    }, (granted) => {
        if (granted) {
            browser.storage.local.set({ allSitesAccess: true, enabled: true });
            buttonDiv.classList.add('off');
            mainDiv.classList.remove('off');
        }
    });
});

browser.storage.local.get('allSitesAccess', data => {
    const allSitesAccess = !!data.allSitesAccess;
    if (allSitesAccess) {
        buttonDiv.classList.add('off');
        mainDiv.classList.remove('off');
    }
});