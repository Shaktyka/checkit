// Генерация экрана
const makeNotDevScreen = (message = false) => {
  return `<section class="screen not-dev-screen">
    <div class="not-dev">
      <div class="not-dev__block">
        <p class="not-dev__text">${message}</p>
      </div>
      <div class="not-dev__btns">
        <button class="btn btn__act game__btn not-dev__exit-btn" type="button">
          Вернуться
        </button>
      </div>
    </div>
  </section>`.trim();
};
