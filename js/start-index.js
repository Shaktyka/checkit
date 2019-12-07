const main = document.querySelector('.page__main');
let settingsComponent = null; // компонент настроек
let gameComponent = null; // компонент игры
let resultsComponent = null; // компонент результатов
let settingsForm = null; // форма настроек

// Общий стейт игры
const state = {
  stage: 'settings'
};

// Обработчик сабмита формы настроек
const settingsFormSubmitHandler = (evt) => {
  evt.preventDefault();
  console.log(1);
};

// Рендерим экран настроек
const renderSettingsScreen = () => {
  main.appendChild(renderSettingsEl());
  settingsComponent = document.querySelector('.settings');
  settingsForm = settingsComponent.querySelector('.settings__form');
  if (settingsForm) {
    settingsForm.addEventListener('submit', settingsFormSubmitHandler);
  }
};


// Запуск игры
const start = () => {
  renderSettingsScreen(); // Рендерим экран настроек
  // Настраиваем стейт
};

start();
