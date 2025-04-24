const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;


document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.body.classList.toggle('dark-theme', savedTheme === 'dark');
    document.getElementById('theme-toggle').textContent = savedTheme === 'dark' ? '🌙' : '🌞';
  });
  
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const isDark = document.body.classList.toggle('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.getElementById('theme-toggle').textContent = isDark ? '🌙' : '🌞';
  });


const sections = document.querySelectorAll('.section-block');
sections.forEach(section => {
  section.addEventListener('click', () => {
    const content = section.querySelector('.section-content');
    content.style.display = content.style.display === 'block' ? 'none' : 'block';
  });
});


const startButton = document.querySelector('.start-btn');
if (startButton) {
    startButton.addEventListener('click', () => {
        window.location.href = 'ciphers.html'; 
    });
}


function showNotification(message, duration = 3000) {
  
  let container = document.getElementById('notification-container');
  if (!container) {
    container = document.createElement('div');
    container.id = "notification-container";
    document.body.appendChild(container);
  }

  
  const notification = document.createElement('div');
  notification.className = "notification";
  notification.textContent = message;
  container.appendChild(notification);

  
  setTimeout(() => {
    notification.classList.add("fade-out");
    notification.addEventListener("transitionend", () => {
      notification.remove();
    });
  }, duration);
}

window.alert = showNotification; 


document.addEventListener('DOMContentLoaded', function() {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  
  hamburgerMenu.addEventListener('click', function(event) {
    event.stopPropagation(); // Предотвращаем всплытие события
    hamburgerMenu.classList.toggle('open');
    dropdownMenu.classList.toggle('open');
  });
  
  // Предотвращаем закрытие меню при клике по самому меню
  dropdownMenu.addEventListener('click', function(event) {
    event.stopPropagation();
  });
  
  // Закрывать меню при клике вне его
  document.addEventListener('click', function() {
    hamburgerMenu.classList.remove('open');
    dropdownMenu.classList.remove('open');
  });
});