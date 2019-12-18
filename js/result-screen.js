// Генерация экрана
const makeResultScreen = (results) => {
  const setText = results.sets.length > 1 ? `наборов` : `набора`;
  const setsString = results.sets.map((it) => `x${it}`).join(', ');
  return `<section class="screen result">
    <!-- <h2 class="screen__title result__title">Отлично!</h2> -->
    <div class="result__wrap">
      <div class="result__block">
        <div class="result__text congratz">
          <h3 class="congratz__title">Отлично!</h3>
          <p class="congratz__esprns">Просмотрено ${results.amount} примеров
           из ${setText} ${setsString}.</p>
          <b class="congratz__slogan">${results.message}</b>
        </div>
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
