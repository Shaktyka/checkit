// Генерация экрана
const makeResultScreen = (results, message = `Задание выполнено`) => {
  return `<section class="screen result">
    <h2 class="screen__title result__title">Отлично!</h2>
    <div class="result__wrap">
      <div class="result__block">
        <p class="result__text">${message}</p>
      </div>
      <div class="result__btns">
        <button class="btn btn__act game__btn result__again-btn" type="button">
          Переиграть
        </button>
        <button class="btn btn__act game__btn result__exit-btn" type="button">
          Новая игра
        </button>
      </div>
    </div>
  </section>`.trim();
};
