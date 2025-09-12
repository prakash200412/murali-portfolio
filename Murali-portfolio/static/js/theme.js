// Theme Toggle Functionality
const themeToggle = document.querySelector('.theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');

// Set initial theme
document.documentElement.setAttribute('data-theme', currentTheme);
if (currentTheme === 'dark') {
    document.documentElement.classList.add('dark-mode');
}

// Toggle theme function
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Update data-theme attribute and save to localStorage
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Toggle dark-mode class for smooth transitions
    if (newTheme === 'dark') {
        document.documentElement.classList.add('dark-mode');
    } else {
        document.documentElement.classList.remove('dark-mode');
    }
    
    // Dispatch custom event for any other scripts that might need to know about theme changes
    document.dispatchEvent(new CustomEvent('themeChange', { detail: { theme: newTheme } }));
}

// Add event listener to theme toggle button
if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
}

// Listen for system theme changes
prefersDarkScheme.addListener((e) => {
    const newTheme = e.matches ? 'dark' : 'light';
    // Only update if user hasn't explicitly set a preference
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', newTheme);
        if (newTheme === 'dark') {
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
        }
    }
});

// Add smooth transitions after page load
window.addEventListener('load', () => {
    document.body.classList.add('transition-colors');
});
