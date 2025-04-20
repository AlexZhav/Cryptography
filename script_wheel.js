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
  const wheelResultElement = document.querySelector('.wheel-result');
  
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
  
      if (wheelResultElement) {
          wheelResultElement.textContent = '';
          wheelResultElement.style.opacity = 0;
      }
  
      const spinAngle = Math.floor(Math.random() * 360 + 720);
      angle += spinAngle;
      canvas.style.transform = `rotate(${angle}deg)`;
  
      setTimeout(() => {
          spinning = false;
          const sectorAngle = 360 / sectors.length;
          const normalizedAngle = (360 - (angle % 360)) % 360;
          const selectedIndex = Math.floor(normalizedAngle / sectorAngle) % sectors.length;
          
          if (wheelResultElement) {
              wheelResultElement.textContent = `Выпал: ${sectors[selectedIndex]}`;
              wheelResultElement.style.opacity = 1;
          }
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
  
  
  const coinElement = document.getElementById('coin-graphic');
  const tossBtnElement = document.getElementById('toss-button-coin');
  const resultElement = document.querySelector('.coin-result');

  if (coinElement && tossBtnElement && resultElement) {
      coinElement.innerHTML = 
              `<img src="https://media.geeksforgeeks.org/wp-content/uploads/20231016151817/heads.png" alt="Орел">`;
      resultElement.textContent = '';
      resultElement.style.opacity = 0;

      tossBtnElement.addEventListener('click', () => {
          tossBtnElement.disabled = true;
          resultElement.textContent = '';
          resultElement.style.opacity = 0;
          tossCoinFunction();
      });

      function tossCoinFunction() {
          const randomVal = Math.random();
          const faceCoin = randomVal < 0.5 ? 'Орел' : 'Решка';
          const imageUrl = faceCoin === 'Орел' ?
          'https://media.geeksforgeeks.org/wp-content/uploads/20231016151817/heads.png' :
          'https://media.geeksforgeeks.org/wp-content/uploads/20231016151806/tails.png';

          coinElement.classList.add('flip');

          coinElement.innerHTML = '';

          setTimeout(() => {
              coinElement.innerHTML = 
                  `<img src="${imageUrl}" alt="${faceCoin}">`;
              coinElement.classList.remove('flip');

              setTimeout(() => {
                  resultElement.textContent = `Результат: ${faceCoin}`;
                  resultElement.style.opacity = 1;
                  tossBtnElement.disabled = false;
              }, 500);
          }, 1000);
      }
  } else {
      console.error('Не найдены элементы для новой анимации монетки.');
  }

  const quotes = [
    '"Ваше время ограничено, не тратьте его, живя чужой жизнью." (Джобс С.)',
    '"Победа — это еще не всё, всё — это постоянное желание побеждать." (Ломбарди В.)',
    '"Наука — это организованные знания, мудрость — это организованная жизнь." (Кант И.)',
    '"В моем словаре нет слова \'невозможно\'." (Бонапарт Н.)',
    '"Вы никогда не пересечете океан, если не наберётесь мужества потерять берег из виду." (Колумб Х.)',
    '"Свобода ничего не стоит, если она не включает в себя свободу ошибаться." (Ганди М.)',
    '"Либо вы управляете вашим днем, либо день управляет вами." (Рон Дж.)',
    '"Если вы думаете, что на что-то способны, вы правы; если думаете, что у вас ничего не получится — вы тоже правы." (Форд Г.)',
    '"Два самых важных дня в твоей жизни: день, когда ты появился на свет, и день, когда понял, зачем." (Твен М.)',
    '"Начинайте делать всё, что вы можете сделать — и даже то, о чём можете хотя бы мечтать. В смелости гений, сила и магия." (Гёте И.В.)',
    '"Лучшая месть — огромный успех." (Синатра Ф.)',
    '"Зачастую говорят, что мотивации хватает ненадолго. Но то же самое происходит и с освежающим душем, поэтому и рекомендуют его принимать ежедневно." (Зиглар З.)',
    '"Слабые люди всю жизнь стараются быть не хуже других. Сильным во что бы то ни стало нужно стать лучше всех." (Акунин Б.)',
    '"Все дело в мыслях. Мысль — начало всего. И мыслями можно управлять. И поэтому главное дело совершенствования: работать над мыслями." (Толстой Л.Н.)',
    '"Есть только один способ избежать критики: ничего не делайте, ничего не говорите, и будьте никем." (Аристотель)',
    '"Человек, которым вам суждено стать — это только тот человек, которым вы сами решите стать." (Эмерсон Р.У.)',
    '"Если вы идёте сквозь ад, не останавливайтесь." (Черчилль У.)',
    '"Как только вы выберете надежду, всё станет возможным." (Рив К.)',
    '"Учитесь у вчера, живите сегодня, надейтесь на завтра. Главное — не прекращать задавать вопросы." (Эйнштейн А.)',
    '"Все наши мечты могут стать явью, если у нас будет достаточно смелости, чтобы им следовать." (Дисней У.)',
    '"Чтобы стать самим собой, требуется немало мужества." (Каммингс Э.)',
    '"Лучший способ не чувствовать себя безнадежным — это встать и что-то сделать. Если вы сделаете что-то хорошее, вы наполните мир надеждой, вы наполните надеждой себя." (Обама Б.)',
    '"Ваш голос может изменить мир." (Обама Б.)',
    '"Ограничений не существует — чем больше ты стремишься к чему-то, тем дальше сумеешь продвинуться." (Фелпс М.)',
    '"Узнайте, кто вы есть, и станьте этим человеком. Вот зачем ваша душа была помещена на эту Землю. Найдите эту правду, живите этой правдой, и всё остальное придёт." (ДеДженерес Э.)',
    '"Ум есть предел. До тех пор, пока ум может воображать тот факт, что вы можете сделать что-то, вы можете сделать это; пока вы действительно верите на 100 процентов." (Шварценеггер А.)',
    '"Ключ к счастью состоит в том, чтобы мечтать, ключ к успеху — в том, чтобы превращать мечты в реальность." (Ален Дж.)',
    '"Быстрее всего учишься в трёх случаях — до 7 лет, на тренингах, и когда жизнь загнала тебя в угол." (Кови С.)',
    '"Если желаете построить корабль, то не созывайте барабанным боем людей собирать древесину, не распределяйте между ними работу и не отдавайте приказы. Вместо всего этого научите их тосковать по бескрайнему морскому простору." (Сент-Экзюпери А. де)',
    '"Если вы думаете, что вы слишком маленький, чтобы что-то изменить, попробуйте проспать ночь с москитом." (Далай-лама)',
    '"Самые большие лжецы в мире часто — наши собственные страхи." (Киплинг Р.)',
    '"Не думайте о том, как сделать что-то лучше. Думайте о том, как сделать это иначе." (Фолкнер У.)',
    '"Каждый хочет изменить человечество, но никто не задумывается о том, как изменить себя." (Толстой Л.Н.)',
    '"Все счастливые семьи похожи друг на друга, каждая несчастливая семья несчастлива по-своему." (Толстой Л.Н.)',
    '"Сильные люди всегда просты." (Толстой Л.Н.)',
    '"Всегда кажется, что нас любят за то, что мы так хороши. А не догадываемся, что любят нас оттого, что хороши те, кто нас любит." (Толстой Л.Н.)',
    '"У меня нет всего, что я люблю. Но я люблю всё, что у меня есть." (Толстой Л.Н.)',
    '"Мир движется вперёд благодаря тем, кто страдает." (Толстой Л.Н.)',
    '"Мера жизни не в её длительности, а в том, как вы её использовали." (Монтень М. де)',
    '"В молодости мы живём, чтобы любить; в зрелом возрасте мы любим, чтобы жить." (Сент-Эвремон)',
    '"Наша жизнь — следствие наших мыслей; она рождается в нашем сердце, она творится нашей мыслью. Если человек говорит и действует с доброй мыслью — радость следует за ним как тень, никогда не покидающая." (Дхаммапада)',
    '"Стремись не к тому, чтобы добиться успеха, а к тому, чтобы твоя жизнь имела смысл." (Эйнштейн А.)',
    '"Жизнь — это миг. Её нельзя прожить сначала на черновике, а потом переписать на беловик." (Чехов А.П.)',
    '"Жизнь — это риск. Только попадая в рискованные ситуации, мы продолжаем расти. И одна из самых рискованных ситуаций, на которые мы можем отважиться, — это риск полюбить, риск оказаться уязвимым, риск позволить себе открыться перед другим человеком, не боясь ни боли, ни обид." (Хаффингтон А.)'
];

function generateQuote() {
    const quoteDisplay = document.getElementById('quote-display');
    if (!quoteDisplay) {
        console.error('Элемент quote-display не найден');
        return;
    }
    
    console.log('Начинаем генерацию цитаты');
    quoteDisplay.textContent = ''; // Очищаем
    
    // Возвращаем логику со случайной цитатой и setTimeout
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        console.log('Выбрана цитата:', selectedQuote);
        quoteDisplay.textContent = selectedQuote;
    }, 300);
}
