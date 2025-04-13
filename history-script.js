// Темы
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

// Тему в локал
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    document.getElementById('theme-toggle').textContent = savedTheme === 'dark' ? '🌙' : '🌞';
});

themeToggleButton.addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    themeToggleButton.textContent = isDark ? '🌙' : '🌞';
});

const historyBlocks = document.querySelectorAll('.history-block');

historyBlocks.forEach(block => {
    block.addEventListener('click', () => {
        const content = block.querySelector('.history-content');
        
        // Класс .open
        if (block.classList.contains('open')) {
            content.style.maxHeight = '0';
            block.classList.remove('open');
        } else {
            content.style.maxHeight = content.scrollHeight + 'px'; 
            block.classList.add('open');
        }
    });
});