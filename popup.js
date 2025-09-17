document.addEventListener('DOMContentLoaded', function () {
    const themeSwitch = document.getElementById('themeSwitch');
    const reloadButton = document.getElementById('reload-button');
    const colorOptions = document.querySelectorAll('.color-option');

    // Load saved preferences
    chrome.storage.sync.get(['theme', 'linkColor'], function (data) {
        const theme = data.theme || 'dark';
        const linkColor = data.linkColor || '#4a90e2';

        // Update popup UI
        themeSwitch.checked = theme === 'light';
        document.body.classList.toggle('dark-mode', theme === 'dark');
        document.body.classList.toggle('light-mode', theme === 'light');
        document.documentElement.style.setProperty('--link', linkColor);

        // Highlight the selected color option
        colorOptions.forEach(option => {
            if (option.dataset.color === linkColor) {
                option.classList.add('selected');
            } else {
                option.classList.remove('selected');
            }
        });

        // Notify the content script about the current preferences
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { theme, linkColor });
        });
    });

    // Handle theme toggle
    themeSwitch.addEventListener('change', function () {
        const theme = this.checked ? 'light' : 'dark';

        // Save theme in storage
        chrome.storage.sync.set({ theme });

        // Update popup UI
        document.body.classList.toggle('dark-mode', theme === 'dark');
        document.body.classList.toggle('light-mode', theme === 'light');

        // Notify the content script about theme change
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, { theme });
        });
    });

    // Handle color selection
    colorOptions.forEach(option => {
        option.addEventListener('click', function () {
            const linkColor = this.dataset.color;

            // Save selected color
            chrome.storage.sync.set({ linkColor });

            // Update popup UI
            document.documentElement.style.setProperty('--link', linkColor);
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');

            // Notify the content script about color change
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, { linkColor });
            });
        });
    });

    // Reload extension and current tab
    reloadButton.addEventListener('click', function () {
        chrome.runtime.reload();
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            chrome.tabs.reload(tabs[0].id);
        });
    });
});
