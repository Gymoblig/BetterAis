chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.theme) {
        // Nastavenie témy (dark alebo light)
        document.body.classList.remove('dark-mode', 'light-mode');
        document.body.classList.add(message.theme === 'dark' ? 'dark-mode' : 'light-mode');
    }

    if (message.gifs) {
        // Predpokladám, že message.gifs je pole objektov, z ktorých každý obsahuje gifName a svgSelector
        message.gifs.forEach(gifObj => {
            const gifUrl = chrome.runtime.getURL(`${gifObj.gifName}`);
            const targetSvg = document.querySelector(gifObj.svgSelector);

            if (targetSvg) {
                targetSvg.style.backgroundImage = `url('${gifUrl}')`;
                targetSvg.style.backgroundSize = 'cover';
                targetSvg.style.backgroundRepeat = 'no-repeat';
                targetSvg.style.width = '100px'; // Upraviť podľa potreby
                targetSvg.style.height = '100px'; // Upraviť podľa potreby
                targetSvg.style.display = 'block'; // Uisti sa, že SVG je viditeľné
            }
        });
    }

    if (message.linkColor) {
        // Aktualizácia farby odkazov
        document.documentElement.style.setProperty('--link-color', message.linkColor);
    }
});

// Po načítaní stránky aplikuj uložené preferencie
chrome.storage.sync.get(['theme', 'linkColor', 'gifs'], (data) => {
    const theme = data.theme || 'dark';
    const linkColor = data.linkColor || '#4a90e2';
    const gifs = data.gifs || [
        { gifName: 'icons/gifs/agenda.gif', svgSelector: 'svg[data-sysid="menu-eagenda"]' },
        { gifName: 'icons/gifs/dokumentacia.gif', svgSelector: 'svg[data-sysid="menu-dokumentace"]' },
        { gifName: 'icons/gifs/elearning.gif', svgSelector: 'svg[data-sysid="menu-elearning"]' },
        { gifName: 'icons/gifs/info.gif', svgSelector: 'svg[data-sysid="menu-info"]' },
        { gifName: 'icons/gifs/manazement.gif', svgSelector: 'svg[data-sysid="menu-os-management"]' },
        { gifName: 'icons/gifs/nast.gif', svgSelector: 'svg[data-sysid="menu-nastaveni"]' },
        { gifName: 'icons/gifs/prisp.gif', svgSelector: 'svg[data-sysid="menu-personalizace"]' },
        { gifName: 'icons/gifs/siet.gif', svgSelector: 'svg[data-sysid="menu-technologie"]' },
        { gifName: 'icons/gifs/studium.gif', svgSelector: 'svg[data-sysid="menu-moje-studium"]' },
        { gifName: 'icons/gifs/veda.gif', svgSelector: 'svg[data-sysid="menu-veda-vyzkum"]' },
        { gifName: 'icons/gifs/zabava.gif', svgSelector: 'svg[data-sysid="menu-herna"]' },
        { gifName: 'icons/gifs/ochrana.gif', svgSelector: 'svg[data-sysid="menu-osobni-udaje"]' }
    ];

    // Nastavenie témy
    document.body.classList.add(theme === 'dark' ? 'dark-mode' : 'light-mode');

    // Nastavenie GIFov pre SVG
    gifs.forEach(gifObj => {
        const gifUrl = chrome.runtime.getURL(`${gifObj.gifName}`);
        const targetSvg = document.querySelector(gifObj.svgSelector);

        if (targetSvg) {
            targetSvg.style.backgroundImage = `url('${gifUrl}')`;
            targetSvg.style.backgroundSize = 'cover';
            targetSvg.style.backgroundRepeat = 'no-repeat';
            targetSvg.style.width = '75px'; // Upraviť podľa potreby
            targetSvg.style.height = '75px'; // Upraviť podľa potreby
            targetSvg.style.display = 'block'; // Uisti sa, že SVG je viditeľné
            targetSvg.style.marginTop = '10px';
        }
    });

    // Nastavenie farby odkazov
    document.documentElement.style.setProperty('--link-color', linkColor);
});
