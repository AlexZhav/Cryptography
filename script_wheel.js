function rollDice() {
    const cube = document.getElementById('cube');
  
  
    const stopX = Math.floor(Math.random() * 4) * 90;
    const stopY = Math.floor(Math.random() * 4) * 90;
  
  
    const initialSpeedX = 720; 
    const initialSpeedY = 360;
  
    const duration = Math.random() * (2) + 2; 
  
  
    const finalX = initialSpeedX + stopX;
    const finalY = initialSpeedY + stopY;
  
  
    cube.style.transition = 'none';
    cube.style.transform = `rotateX(0deg) rotateY(0deg)`; 
  
  
    setTimeout(() => {
      cube.style.transition = `transform ${duration}s cubic-bezier(0.2, 0.3, 0.3, 1)`; 
      cube.style.transform = `rotateX(${finalX}deg) rotateY(${finalY}deg)`;
    }, 50); 
  }
  
  
  
  
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.tab, .content').forEach(el => el.classList.remove('active'));
        tab.classList.add('active');
        document.getElementById(tab.dataset.target).classList.add('active');
    });
  });
  

  
 
  
  const canvas = document.getElementById('wheel');
  const ctx = canvas.getContext('2d');
  const spinWheelButton = document.getElementById('spin-wheel');
  const sectorCountInput = document.getElementById('sector-count');
  const increaseSectorsButton = document.getElementById('increase-sectors');
  const decreaseSectorsButton = document.getElementById('decrease-sectors');
  const sectorInfo = document.getElementById('sector-info');
  
  let sectors = JSON.parse(localStorage.getItem('sectors')) || Array.from({ length: 4 }, (_, i) => `${i + 1}`);
  let angle = 0;
  let spinning = false;
  canvas.width = canvas.height = 300;

  
  function drawWheel() {
      const sectorAngle = 2 * Math.PI / sectors.length;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      sectors.forEach((sector, index) => {
          const startAngle = index * sectorAngle;
          const endAngle = startAngle + sectorAngle;
  
          ctx.beginPath();
          ctx.moveTo(150, 150);
          ctx.arc(150, 150, 150, startAngle, endAngle);
          ctx.fillStyle = index % 2 === 0 ? '#f0a' : '#0af';
          ctx.fill();
          ctx.stroke();
  
          ctx.save();
          ctx.translate(150, 150);
          ctx.rotate(startAngle + sectorAngle / 2);
          ctx.textAlign = 'right';
          ctx.fillStyle = '#fff';
          ctx.font = '14px Arial';
          ctx.fillText(sector, 140, 5);
          ctx.restore();
      });
  }
  
  function spinWheel() {
      if (spinning) return;
      spinning = true;
  
      const spinAngle = Math.floor(Math.random() * 360 + 720);
      angle += spinAngle;
      canvas.style.transform = `rotate(${angle}deg)`;
  
      setTimeout(() => {
          spinning = false;
          const sectorAngle = 360 / sectors.length;
          const normalizedAngle = (360 - (angle % 360)) % 360;
          const selectedIndex = Math.floor(normalizedAngle / sectorAngle) % sectors.length;
          showNotification(`Выпал: ${sectors[selectedIndex]}`);
      }, 3000);
  }
  
  function updateSectors() {
      const count = parseInt(sectorCountInput.value, 10);
      sectors = Array.from({ length: count }, (_, i) => sectors[i] || `${i + 1}`);
      saveToLocalStorage();
      drawWheel();
      updateSectorInfo();
  }
  
  function updateSectorInfo() {
      sectorInfo.innerHTML = '';
      sectors.forEach((text, index) => {
          const item = document.createElement('div');
          item.className = 'sector-item';
  
          const number = document.createElement('span');
          number.className = 'sector-number';
          number.textContent = index + 1;
  
          const input = document.createElement('input');
          input.className = 'sector-text';
          input.type = 'text';
          input.value = text;
          input.addEventListener('input', (e) => {
              sectors[index] = e.target.value;
              saveToLocalStorage();
              drawWheel();
          });
  
          item.appendChild(number);
          item.appendChild(input);
          sectorInfo.appendChild(item);
      });
  }
  
  function saveToLocalStorage() {
      localStorage.setItem('sectors', JSON.stringify(sectors));
  }
  
  spinWheelButton.addEventListener('click', spinWheel);
  increaseSectorsButton.addEventListener('click', () => {
      sectorCountInput.value = Math.min(parseInt(sectorCountInput.value, 10) + 1, 40);
      updateSectors();
  });
  decreaseSectorsButton.addEventListener('click', () => {
      sectorCountInput.value = Math.max(parseInt(sectorCountInput.value, 10) - 1, 2);
      updateSectors();
  });
  sectorCountInput.addEventListener('input', updateSectors);
  
  updateSectors();
  
  
  function flipCoin() {
    const coin = document.getElementById('coin');
    const isHeads = Math.random() > 0.5; 
    const randomRotations = Math.floor(Math.random() * 5) + 5; 
    const finalRotation = isHeads ? 0 : 180;
  
    coin.style.transform = `rotateY(${randomRotations * 360 + finalRotation}deg)`;
  
  
    setTimeout(() => {
        alert(`Результат: ${isHeads ? "Орел" : "Решка"}`);
    }, 2000); 
  }