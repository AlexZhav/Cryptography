
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