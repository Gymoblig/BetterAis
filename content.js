chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.theme) {
        // Apply dark or light theme
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(message.theme === 'dark' ? 'dark-mode' : 'light-mode');
    }

    if (message.linkColor) {
        // Update link color
        document.documentElement.style.setProperty('--link-color', message.linkColor);
    }
});

// Apply saved preferences when the page loads
chrome.storage.sync.get(['theme', 'linkColor'], (data) => {
    const theme = data.theme || 'dark';
    const linkColor = data.linkColor || '#4a90e2';

    // Set theme
    document.body.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode');

    // Set link color
    document.documentElement.style.setProperty('--link-color', linkColor);
});
