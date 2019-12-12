// Генерация экрана
const makeGameScreen = (firstExpression, errorMessage = false) => {
  console.log(firstExpression);
  return `<section class="screen game-screen">
    <h2 class="screen__title game-screen__title">Помоги Эльзе запомнить пример:</h2>
    <div class="game">
      <div class="game__block">
        <form class="game__form" name="game-form" action="https://echo.htmlacademy.ru" method="post" autocomplete="off">
          <div class="game__expr">
          <span class="mult-1">${firstExpression.mult_1}</span>
            <span class="symbol-mult">x</span>
            <span class="mult-2">${firstExpression.mult_2}</span>
            <span class="symbol-result">=</span>
            <span class="mult-result">${firstExpression.response}</span>
          </div>
          <p class="game__expr-text v-hidden">Пять на пять — двадцать пять</p>
        </form>
      </div>
      <div class="game-screen__btns">
        <button class="btn btn__act game__btn game-screen__exit-btn" type="button">
          Выйти
        </button>
        <button class="btn btn__act game__btn game-screen__next-btn" type="button">
          Следующий
        </button>
      </div>
    <div>
  </section>`.trim();
};
