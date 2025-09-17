chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.theme) {
        // Nastavenie témy (dark alebo light)
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(message.theme === 'dark' ? 'dark-mode' : 'light-mode');
    }

    if (message.linkColor) {
        // Aktualizácia farby odkazov
        document.documentElement.style.setProperty('--link', message.linkColor);
    }
});

// Po načítaní stránky aplikuj uložené preferencie
chrome.storage.sync.get(['theme', 'linkColor'], (data) => {
    const theme = data.theme || 'dark';
    const linkColor = data.linkColor || '#4a90e2';
    // Nastavenie témy
    document.body.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode')

    // Nastavenie farby odkazov
    document.documentElement.style.setProperty('--link', linkColor);
});
