const main = document.querySelector('.page__main');
let settingsComponent = null; // компонент настроек
let gameComponent = null; // компонент игры
let resultComponent = null; // компонент результатов
let settingsForm = null; // форма настроек
const settings = { // объект для настроек игры
  regime: null,
  multipliers: null,
  present: null,
  infinite: null
};
let selectAllBtn = null;
let multiplicators = null;

// Общий стейт игры
const state = {
  stage: null,
  settings: null
};

// Объект примера
const expression = {
  mult_1: null,
  mult_2: null,
  response: null
};

// Запись в стейт
const setState = (key, val) => {
  state[key] = val;
};

// Читаем из стейта
const getStateKey = (key) => {
  return state[key] ? state[key] : null;
};

// Старт игры
const startGame = () => {
  // Меняем состояние игры
  setState('stage', 'game');
  // Получаем настройки
  const currSet = getStateKey('settings');
  // console.log(currSet);
  // Генерируем набор примеров в соотв-вии с настройками
  // Генерируем и меняем экран
  // Вешаем обработчики на элементы экрана игры
  // + обработчики на стрелку вправо клавиатуры
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
  // В стейт записывается тоже из места вызова
  // А если рандомное расположение чисел, то можно будет случайно генерировать: в mult_1 или mult_2
  const numArr = [];
  const amount = 10;
  arr.forEach((num) => {
    for (let i = 1; i <= amount; i++) {
      const expr = Object.assign({}, expression);
      let num_list = [num, i];
      if (mixed) {
        num_list = shuffleArray(num_list.slice());
      }
      expr.mult_1 = num_list[0];
      expr.mult_2 = num_list[1];
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

// Обработчик сабмита формы настроек
const settingsFormSubmitHandler = (evt) => {
  evt.preventDefault();
  // Собираем настройки и записываем в объект
  const data = new FormData(settingsForm);
  const settingsObj = Object.assign({}, settings);
  settingsObj.regime = data.get('regime');
  settingsObj.multipliers = data.getAll('multipliers');
  settingsObj.present = data.get('present');
  settingsObj.infinite = data.get('infinite');
  state.settings = settingsObj;
  // Сброс обработчиков с экрана настроек
  removeSettingsListeners();
  // Запускаем игру
  startGame();
};

// Рендерим экран результатов
const renderResultScreen = () => {
  main.appendChild(renderResultScreesEl());
  resultComponent = document.querySelector('.results');
  // Обработчики эл-тов в компоненте
};

// Рендерим экран игры
const renderGameScreen = () => {
  main.appendChild(renderGameScreenEl());
  gameComponent = document.querySelector('.game-screen');
  // Обработчики эл-тов в компоненте
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

// Рендерим экран настроек
const renderSettingsScreen = () => {
  // Добавляем компонент
  main.appendChild(renderSettingsEl());
  state.stage = 'settings';
  //Ввешаем обработчики на элементы
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

// Запуск игры
const start = () => {
  // toastr.info('Тест');
  // renderSettingsScreen(); // Рендерим экран настроек
  renderGameScreen();
  // renderResultScreen();
  // Настраиваем стейт
};

start();
