class ThemeService {
  constructor() {
    this.STORAGE_KEY = 'youtube-theme';
    this.THEMES = {
      LIGHT: 'light',
      DARK: 'dark'
    };
    
    this.currentTheme = this.getStoredTheme();
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.listeners = new Set();
    
    // Initialize theme
    this.applyTheme();
    
    // Listen for system theme changes only for initial detection
    this.mediaQuery.addEventListener('change', () => {
      // No auto mode, so we don't need to do anything
    });
  }
  
  getStoredTheme() {
    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored && Object.values(this.THEMES).includes(stored)) {
      return stored;
    }
    // Default to system preference on first visit
    return this.mediaQuery.matches ? this.THEMES.DARK : this.THEMES.LIGHT;
  }
  
  setTheme(theme) {
    if (!Object.values(this.THEMES).includes(theme)) {
      console.warn(`Invalid theme: ${theme}`);
      return;
    }
    
    this.currentTheme = theme;
    localStorage.setItem(this.STORAGE_KEY, theme);
    this.applyTheme();
    this.notifyListeners();
  }
  
  getTheme() {
    return this.currentTheme;
  }
  
  getEffectiveTheme() {
    return this.currentTheme;
  }
  
  applyTheme() {
    const effectiveTheme = this.getEffectiveTheme();
    const root = document.documentElement;
    
    if (effectiveTheme === this.THEMES.DARK) {
      root.setAttribute('data-theme', 'dark');
    } else {
      root.removeAttribute('data-theme');
    }
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === this.THEMES.LIGHT ? this.THEMES.DARK : this.THEMES.LIGHT;
    this.setTheme(newTheme);
  }
  
  isDark() {
    return this.getEffectiveTheme() === this.THEMES.DARK;
  }
  
  isLight() {
    return this.getEffectiveTheme() === this.THEMES.LIGHT;
  }
  
  // Event system
  addListener(callback) {
    this.listeners.add(callback);
    return () => this.listeners.delete(callback); // Return cleanup function
  }
  
  removeListener(callback) {
    this.listeners.delete(callback);
  }
  
  notifyListeners() {
    this.listeners.forEach(callback => {
      try {
        callback(this.currentTheme, this.getEffectiveTheme());
      } catch (error) {
        console.error('Theme listener error:', error);
      }
    });
  }
}

// Export singleton instance
export const themeService = new ThemeService();
export default themeService; 