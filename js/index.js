const startBtn = document.querySelector('.btn__start');
const output = document.querySelector('.screen__output');
const controlsBlock = document.querySelector('.controls');
const randomControl = document.querySelector('.content__random-control');
const numbControl = document.querySelector('.content__numb-control');

// Массив примеров для режима Урок
const lesson2arr = [
  '2 x 1 = 2',
  '2 x 2 = 4',
  '2 x 3 = 6',
  '2 x 4 = 8',
  '2 x 5 = 10',
  '2 x 6 = 12',
  '2 x 7 = 14',
  '2 x 8 = 16',
  '2 x 9 = 18',
  '2 x 10 = 20'
];

// Массив примеров для умножени яна 2 без ответов
const lesson2arr_numb = [
  '2 x 1 = ',
  '2 x 2 = ',
  '2 x 3 = ',
  '2 x 4 = ',
  '2 x 5 = ',
  '2 x 6 = ',
  '2 x 7 = ',
  '2 x 8 = ',
  '2 x 9 = ',
  '2 x 10 = '
];

// Состояние приложения
const state = {
  multiplicators: [2],
  isExam: false,
  isRandom: false,
  currExpressIndex: 0,
  mathset: lesson2arr,
  started: false
};

randomControl.addEventListener('change', (evt) => {
  if (randomControl.checked) {
    console.log(1);
  } else {
    console.log(0);
  }
});
// numbControl.addEventListener('', );

// Инициализирует начальное состояние
const setStart = () => {
  state.multiplicators = [];
  state.isExam = false;
  state.isRandom = false;
  state.currExpressIndex = 0;
  state.mathset = lesson2arr;
  state.started = false;

  output.innerHTML = '';
  controlsBlock.classList.add('v-hidden');
  randomControl.checked = false;
  numbControl.checked = false;
};

// Перемешиваем массив примеров
const shuffleArray = (array) => {
  const copiedArray = array;
  for (let i = copiedArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copiedArray[i], copiedArray[j]] = [copiedArray[j], copiedArray[i]];
  }
  return copiedArray;
};

// Обработчик клика по кнопке Играть
startBtn.addEventListener('click', (evt) => {
  evt.preventDefault();
  controlsBlock.classList.remove('v-hidden');
  state.isRandom = randomControl.checked;
  state.isExam = numbControl.checked;

  if (!state.isExam) {
    if (state.isRandom) {
      state.mathset = shuffleArray(lesson2arr.slice());
    }
  } else {
    state.mathset = lesson2arr_numb;
    if (state.isRandom) {
      state.mathset = shuffleArray(lesson2arr_numb.slice());
    }
  }

  if (state.currExpressIndex === 0) {
    state.started = true;
    startBtn.innerHTML = 'Заново';
  } else {
    setStart();
    startBtn.innerHTML = 'Играть';
  }

  output.innerHTML = state.mathset[state.currExpressIndex];
});

// Меняет интерфейс на стартовый
const showEnd = () => {
  output.innerHTML = 'Всё :)';
  state.currExpressIndex = 0;
  controlsBlock.classList.add('v-hidden');
};

// Обработчик кликов по блоку с контролами
controlsBlock.addEventListener('click', (evt) => {
  evt.preventDefault();
  const clickedEl = evt.target;
  if (clickedEl.classList.contains('btn__control--next')) {
    state.currExpressIndex += 1;
    if (state.currExpressIndex <= state.mathset.length - 1) {
      output.innerHTML = state.mathset[state.currExpressIndex];
    } else {
      showEnd();
    }
  } else if (clickedEl.classList.contains('btn__control--prev')) {
    state.currExpressIndex -= 1;
    if (state.currExpressIndex >= 0) {
      output.innerHTML = state.mathset[state.currExpressIndex];
    } else {
      showEnd();
    }
  }
});
