const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const copyEmailButton = document.getElementById('copy-email');
const status = document.getElementById('status');
const email = 'ekhsanfitri123@email.com';

function readStoredTheme() {
    try {
        return localStorage.getItem('portfolio-theme');
    } catch {
        return null;
    }
}

function storeTheme(theme) {
    try {
        localStorage.setItem('portfolio-theme', theme);
    } catch {
        return;
    }
}

function setStatus(message) {
    if (status) {
        status.textContent = message;
    }
}

function applyTheme(theme) {
    body.dataset.theme = theme;
    if (themeToggle) {
        themeToggle.textContent = theme === 'dark' ? 'Light theme' : 'Dark theme';
    }
    storeTheme(theme);
}

const savedTheme = readStoredTheme();
const preferredTheme = savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
applyTheme(preferredTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = body.dataset.theme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);
        setStatus(`Switched to ${nextTheme} theme.`);
    });
}

if (copyEmailButton) {
    copyEmailButton.addEventListener('click', async () => {
        try {
            await navigator.clipboard.writeText(email);
            setStatus('Email copied to clipboard.');
        } catch {
            setStatus(`Copy failed. Use ${email} manually.`);
        }
    });
}

console.log('Portfolio Ekhsan ready.');
