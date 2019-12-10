const main = document.querySelector('.page__main');
let settingsComponent = null; // компонент настроек
let gameComponent = null; // компонент игры
let resultComponent = null; // компонент результатов
let settingsForm = null; // форма настроек
let settingsObj = {}; // объект для настроек игры
let selectAllBtn = null;
let multiplicators = null;

// Общий стейт игры
const state = {
  stage: 'settings'
};

// Объект примера
const expression = {
  mult_1: null,
  mult_2: null,
  response: null
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

// console.log(generateNumbers([8]));

// Обработчик сабмита формы настроек
const settingsFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const settings = new FormData(settingsForm);
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
  main.appendChild(renderSettingsEl());
  settingsComponent = document.querySelector('.settings');
  settingsForm = settingsComponent.querySelector('.settings__form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', settingsFormSubmitHandler);
    selectAllBtn = settingsComponent.querySelector('.multiplier__all');
    selectAllBtn.addEventListener('click', selectAllBtnClickHandler);
    multiplicators = settingsComponent.querySelectorAll('.multiplier__check');
  }
};

// Запуск игры
const start = () => {
   renderSettingsScreen(); // Рендерим экран настроек
  // renderGameScreen();
  // renderResultScreen();
  // Настраиваем стейт
};

start();
