chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.theme) {
        // Apply theme (dark or light mode)
        document.body.classList.toggle('dark-mode', message.theme === 'dark');
        document.body.classList.toggle('light-mode', message.theme === 'light');
    }

    if (message.linkColor) {
        // Update link color
        document.documentElement.style.setProperty('--link-color', message.linkColor);
    }
});

// On page load, apply saved preferences
chrome.storage.sync.get(['theme', 'linkColor'], function (data) {
    const theme = data.theme || 'dark';
    const linkColor = data.linkColor || '#4a90e2';

    // Apply theme
    document.body.classList.toggle('dark-mode', theme === 'dark');
    document.body.classList.toggle('light-mode', theme === 'light');

    // Apply link color
    document.documentElement.style.setProperty('--link-color', linkColor);
});
