// Элементы
const main = document.querySelector('.page__content');
let settingsComponent = null; // компонент настроек
let gameComponent = null; // компонент игры
let resultComponent = null; // компонент результатов
let notDevComponent =  null;
let settingsForm = null; // форма настроек
let selectAllBtn = null;
let multiplicators = null;

// Экран игры
let exitBtn = null;
let nextBtn = null;
let gameForm = null;
let multiplicator_1 = null;
let multiplicator_2 = null;
let mult_result = null;
let expressionBlock = null;
let progressBar = null;
let respInput = null;
let countersBlock = null;

// Экран результатов
let exitAgainBtn = null;
let exitResultBtn = null;

// Служебные сообщения
const messages = {
  'DEV': 'Не сейчас! Давай выберем что-нибудь другое!',
  'ERROR': 'Этот режим ещё не реализован, давай выберем другой.'
};

// СТЕЙТ игры
let state = {};

const cleanState = {
  stage: null,
  settings: null,
  expressions: null,
  errorGameMessage: '',
  currExprIndex: 0,
  results: {
    message: '',
    amount: '',
    sets: null
  }
};

// Объект примера
const expression = {
  mult_1: null,
  mult_2: null,
  response: null
};

// Объект результата игры
// let results = {};

// Генерация случайного числа от min до max включительно
const getRandomNumber = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

// Запись в стейт
const setState = (key, val) => {
  state[key] = val;
};

// Читаем из стейта
const getStateKey = (key) => {
  return state[key] ? state[key] : null;
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

// Функция по генерации набора примероа
const generateNumbers = (arr, mixed = false) => {
  const numArr = [];
  const amount = 10;
  arr.forEach((num) => {
    for (let i = 1; i <= amount; i++) {
      const expr = Object.assign({}, expression);
      let num_list = [num, i];
      if (mixed) {
        num_list = shuffleArray(num_list.slice());
      }
      expr.mult_1 = Number(num_list[0]);
      expr.mult_2 = Number(num_list[1]);
      expr.response = num * i;
      numArr.push(expr);
    }
  });
  return numArr;
};

// Сброс обраб-в с экрана настроек
const removeSettingsListeners = () => {
  settingsForm.removeEventListener('submit', settingsFormSubmitHandler);
  selectAllBtn.removeEventListener('click', selectAllBtnClickHandler);
};

// Сброс обраб-в с элементов экрана игры
const removeGameScreenListeners = () => {
  exitBtn.removeEventListener('click', exitBtnClickHandler);
  nextBtn.removeEventListener('click', nextBtnClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
  gameForm.removeEventListener('submit', gameFormSubmitHandler);
};

// Сброс обраб-в с элементов экрана игры
const removeNotDevScreenListeners = () => {
  exitNotDevBtn.removeEventListener('click', exitNotDevBtnClickHandler);
  document.removeEventListener('keydown', documentKeydownHandler);
};

// Обнуление стейта
const resetState = () => {
  state = Object.assign({}, cleanState);
};

// Обработчик клика по кнопке "Выйти"
const exitBtnClickHandler = (evt) => {
  evt.preventDefault();
  renderSettingsScreen();
  resetState();
  removeGameScreenListeners();
};

// Обработчик выхода
const exitNotDevBtnClickHandler = (evt) => {
  // evt.preventDefault();
  renderSettingsScreen();
  resetState();
  removeNotDevScreenListeners();
};

// Изменение ширины прогресс-бара
const changeProgressWidth = (index, amount) => {
  progressBar.style.width = `${100 * (index + 1) / amount}%`;
};

// Проверка правильности ответа
const checkUserResponse = () => {
  const currentExpression = state.expressions[state.currExprIndex];
  const inputField = document.querySelector('.expr__res-field');
  const userResponse = inputField.value;
  // console.log(userResponse);
  toastr.options = {
    "newestOnTop": false,
    "positionClass": "toast-bottom-center",
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  };
  if (userResponse.length === 0) {
    respInput.classList.add('error');
    toastr.warning(`Поле пустое,  проверить нечего :(`);
  } else {
    // Проверяем ответ: если правильный, то разблокируем кнопку "Следующий"
    if (currentExpression.response === Number(userResponse)) {
      respInput.classList.add('true');
      toastr.success('Правильно! Идём дальше');
      if (respInput.classList.contains('error')) {
        respInput.classList.remove('error');
      }
    } else {
      respInput.classList.add('error');
      toastr.error('Ответ неверный. Попробуй ещё раз.');
    }
  }
};

// Обработка ввода в поле ответа
const gameFormSubmitHandler = (evt) => {
  evt.preventDefault();
  checkUserResponse();
};

// Рендерим след. элемент с примером
const renderExpression = () => {
   const newExpressEl = renderElement(makeExpressionEl(state.expressions[state.currExprIndex], state.settings.regime));
   expressionBlock.innerHTML = '';
   expressionBlock.appendChild(newExpressEl);
   if (state.settings.regime === 'exam') {
     nextBtn.remove();
   }
   respInput = document.querySelector('.expr__res-field');
   if (respInput) {
     respInput.focus();
   }
   multiplicator_1 = document.querySelector('.expr__mult-1');
   multiplicator_2 = document.querySelector('.expr__mult-2');
   changeProgressWidth(state.currExprIndex, state.expressions.length);
};

// Смена примера
const showNextSlide =() => {
  state.currExprIndex += 1;

  if (state.currExprIndex <= state.expressions.length - 1) {
    renderExpression(); // показываем след. пример
  } else {
    renderResultScreen(); // экран результатов
  }
};

// Обработчик клика по кнопке "Следующий"
const nextBtnClickHandler = (evt) => {
  evt.preventDefault();
  showNextSlide();
};

// Обработчик нажатий на клавиши
const documentKeydownHandler = (evt) => {

  if (state.stage === 'settings') {
    // если экран настроек
  } else if (state.stage === 'notdev') { // если экран "В разработке"
    if (evt.keyCode === 27) {
      exitNotDevBtnClickHandler(); // Возвращаемся на экран настроек
    }
  } else if (state.stage === 'game') {
    if (state.settings.regime === 'exam') {
      if (evt.keyCode === 39) {
        checkUserResponse();
      }
    } else {
      showNextSlide(); // следующий пример
    }
  } else if (state.stage === 'result') {
    console.log(state.stage, evt.keyCode);
  } else {
    console.log('Что-то пошло не так');
  }
};

// Элементы экрана игры + обработчики
const initGameScreen = () => {
  gameComponent = document.querySelector('.game-screen');
  progressBar = gameComponent.querySelector('.game__progress-bar');
  expressionBlock = document.querySelector('.game__expr');
  exitBtn = gameComponent.querySelector('.game-screen__exit-btn');
  nextBtn = gameComponent.querySelector('.game-screen__next-btn');
  gameForm = gameComponent.querySelector('.game__form');

  if (state.settings.regime === 'exam') {
    gameComponent.querySelector('.game__counters').classList.remove('v-hidden');
  }

  // Обработчики
  exitBtn.addEventListener('click', exitBtnClickHandler);
  nextBtn.addEventListener('click', nextBtnClickHandler);
  gameForm.addEventListener('submit', gameFormSubmitHandler);
  // Вешаем обработчик нажатий на клавиатуру
  document.addEventListener('keydown', documentKeydownHandler);
};

// Рендерим экран игры
const renderGameScreen = () => {
  main.innerHTML = '';
  const gameElement = renderElement(makeGameScreen());
  render(main, gameElement);
  initGameScreen();
  renderExpression();
};

// Обработчики на экран игры "Режим не реализован"
const initNotDevScreen = () => {
  notDevComponent = document.querySelector('.not-dev-screen');
  exitNotDevBtn = notDevComponent.querySelector('.not-dev__exit-btn');
  exitNotDevBtn.addEventListener('click', exitNotDevBtnClickHandler);
  document.addEventListener('keydown', documentKeydownHandler);
};

// Функция "Начать заново"
const restartGame = () => {
  setState('stage', 'game');
  setState('currExprIndex', 0);
  renderGameScreen();
};

// Обработчик клика по кнопке "Ещё раз"
const exitAgainBtnClickHandler = (evt) => {
  evt.preventDefault();
  // Сброс обработчиков с окна рез-в
  removeResultScreenListeners();
  // Запуск той же игры с теми же настройками
  restartGame();
};

// Сброс обраб-в в окна результатов
const removeResultScreenListeners =() => {
  exitAgainBtn.removeEventListener('click', exitAgainBtnClickHandler);
  exitResultBtn.removeEventListener('click', exitResultBtnClickHandler);
};

// Обработчик клика по кнопке "Новая игра"
const exitResultBtnClickHandler = (evt) => {
  evt.preventDefault();
  renderSettingsScreen();
  resetState();
  removeResultScreenListeners(); // Сброс обработчиков с окна рез-в
};

// Обработчики на экран Результатов
const initResultScreen = () => {
  resultComponent = document.querySelector('.result');
  exitAgainBtn = resultComponent.querySelector('.result__again-btn');
  exitResultBtn = resultComponent.querySelector('.result__exit-btn');

  exitAgainBtn.addEventListener('click', exitAgainBtnClickHandler);
  exitResultBtn.addEventListener('click', exitResultBtnClickHandler);
  // document.addEventListener('keydown', documentKeydownHandler); // дописать на ESC
};

// Рендерим экран "Режим не разработан"
const renderNotDevScreen = () => {
  main.innerHTML = '';
  const notDevElement = renderElement(makeNotDevScreen(state.errorGameMessage));
  render(main, notDevElement);
  setState('stage', 'notdev');
  initNotDevScreen();
};

// Рендерим экран результатов
const renderResultScreen = () => {
  main.innerHTML = '';
  // Собрать результаты и передать ниже
  state.results.amount = state.expressions.length;
  state.results.message = compliments[[getRandomNumber(0, compliments.length - 1)]];
  state.results.sets = state.settings.multipliers;
  const resultEl = renderElement(makeResultScreen(state.results));
  render(main, resultEl);
  setState('stage', 'result');
  initResultScreen();
};

// Старт игры
const startGame = () => {
  // Меняем состояние игры
  setState('stage', 'game');
  // Получаем настройки
  const currSet = getStateKey('settings');
  // Генерируем набор примеров в соотв-вии с настройками
  if (currSet.infinite === 'on') {
    setState('errorGameMessage', messages['DEV']);
    renderNotDevScreen();
  } else if (currSet.regime === 'lesson' || currSet.regime === 'exam') {
    // Готовим примеры для отобр-ния
    const rand = currSet.present === 'random';
    const rand_hard = currSet.present === 'random-hard';
    let expressions = generateNumbers(currSet.multipliers, rand_hard);
    if (rand || rand_hard) {
      expressions = shuffleArray(expressions.slice());
    }
    setState('expressions', expressions);
    // Включаем экран игры
    renderGameScreen();
  } else {
    setState('errorGameMessage', 'Что-то пошло не так...');
    renderNotDevScreen();
  }
};

// Перебираем все настройки из formData в объект
const parseSettings = (formData) => {
  const settObj = {
    multipliers: []
  };
  for(let [name, value] of formData) {
    if (!settObj[name]) {
      settObj[name] = value;
    } else {
      settObj.multipliers.push(value);
    }
  }
  return settObj;
};

// Обработчик сабмита формы настроек
const settingsFormSubmitHandler = (evt) => {
  evt.preventDefault();
  // Собираем настройки и записываем в объект
  const data = new FormData(settingsForm);
  // Проверка на выбор хотя бы 1 множителя
  if (data.getAll('multipliers').length === 0) {
    toastr.options = {
      "newestOnTop": false,
      "positionClass": "toast-bottom-center",
      "preventDuplicates": true,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
    toastr.warning('Нужно выбрать хотя бы один множитель');
  } else {
    state.settings = parseSettings(data);
    removeSettingsListeners();
    startGame();
  }
};

// Обработчик клика по кнопке "Выбрать все (множители)"
const selectAllBtnClickHandler = (evt) => {
  evt.preventDefault();
  // Отмечаем все чекбоксы
  multiplicators.forEach((it) => {
    if (!it.checked) {
      it.checked = true;
    }
  });
};

// Вешаем обработчики на элементы экрана настроек
const initSettingsScreen = () => {
  settingsComponent = document.querySelector('.settings');
  settingsForm = settingsComponent.querySelector('.settings__form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', settingsFormSubmitHandler);
    // Кнопка Выбрать все и мультипликаторы
    selectAllBtn = settingsComponent.querySelector('.multiplier__all');
    selectAllBtn.addEventListener('click', selectAllBtnClickHandler);
    multiplicators = settingsComponent.querySelectorAll('.multiplier__check');
  }
};

// Рендеринг элементов в контейнер
const render = (container, element) => {
  container.appendChild(element);
};

// Рендерим экран настроек
const renderSettingsScreen = () => {
  main.innerHTML = '';
  const settingsEl = renderElement(makeSettingsScreen());
  render(main, settingsEl);
  resetState();
  setState('stage', 'settings');
  initSettingsScreen();
};

// Запуск игры
const start = () => {
  renderSettingsScreen();
};

start();
