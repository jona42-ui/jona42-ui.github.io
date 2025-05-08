// Theme management
const THEME_KEY = 'site-theme';
const DARK_THEME = 'dark';
const LIGHT_THEME = 'light';

class ThemeManager {
    constructor() {
        this.themeToggleBtn = document.getElementById('theme-toggle');
        this.themeIcon = this.themeToggleBtn?.querySelector('i');
        this.initialize();
    }

    initialize() {
        // Set initial theme
        const savedTheme = localStorage.getItem(THEME_KEY) || 
            (window.matchMedia('(prefers-color-scheme: dark)').matches ? DARK_THEME : LIGHT_THEME);
        this.setTheme(savedTheme);

        // Add event listeners
        this.themeToggleBtn?.addEventListener('click', () => this.toggleTheme());
        
        // Listen for system theme changes
        window.matchMedia('(prefers-color-scheme: dark)')
            .addEventListener('change', e => this.handleSystemThemeChange(e));
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        document.body.classList.remove(LIGHT_THEME, DARK_THEME);
        document.body.classList.add(theme);
        localStorage.setItem(THEME_KEY, theme);
        this.updateToggleButton(theme);
    }

    toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === DARK_THEME ? LIGHT_THEME : DARK_THEME;
        this.setTheme(newTheme);
    }

    handleSystemThemeChange(e) {
        // Only update theme if user hasn't manually set it
        if (!localStorage.getItem(THEME_KEY)) {
            this.setTheme(e.matches ? DARK_THEME : LIGHT_THEME);
        }
    }

    updateToggleButton(theme) {
        if (this.themeToggleBtn && this.themeIcon) {
            this.themeIcon.className = theme === DARK_THEME ? 'fas fa-sun' : 'fas fa-moon';
            this.themeToggleBtn.setAttribute('aria-label', 
                `Switch to ${theme === DARK_THEME ? 'light' : 'dark'} theme`);
        }
    }
}

// Initialize theme manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.themeManager = new ThemeManager();
});
