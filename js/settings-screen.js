// Рендеринг экрана настроек
const makeSettingsScreen = () => {
  return `<section class="screen settings">
      <h2 class="screen__title settings__title">Выбери, как ты хочешь играть:</h2>
      <form class="settings__form" name="settings-form" action="https://echo.htmlacademy.ru" method="post" autocomplete="off">
        <div class="settings__wrap">
        <!-- Выбор режима -->
        <div class="settings__group regime">
          <h3 class="settings__subtitle">Режим:</h3>
          <p class="regime__wrap">
            <label for="lesson" title="Тренировочный режим: показываются примеры с ответами">
              <input class="lesson__radio" type="radio" name="regime" id="lesson" value="lesson">
              урок
            </label>
            <label for="exam" title="Режим проверки: нужно правильно решить пример">
              <input class="exam__radio" type="radio" name="regime" id="exam" value="exam" checked>
              угадайка
            </label>
          </p>
        </div>
        <!-- Выбор множителя -->
        <div class="settings__group multiplier">
          <h3 class="settings__subtitle multiplier__title">
            <span class="multiplier__text">Множители:</span>
            <button class="btn btn__act multiplier__all" type="button" title="Нажмите, чтобы выбрать сразу все множители">
              Выбрать все
            </button>
          </h3>
          <p class="multiplier__group">
            <label class="multiplier__lbl" for="mult-1">
              <input class="multiplier__check" type="checkbox" id="mult-1" name="multipliers" value="1">
              x1
            </label>
            <label class="multiplier__lbl" for="mult-2">
              <input class="multiplier__check" type="checkbox" id="mult-2" name="multipliers" value="2">
              x2
            </label>
            <label class="multiplier__lbl" for="mult-3">
              <input class="multiplier__check" type="checkbox" id="mult-3" name="multipliers" value="3" checked>
              x3
            </label>
            <label class="multiplier__lbl" for="mult-4">
              <input class="multiplier__check" type="checkbox" id="mult-4" name="multipliers" value="4">
              x4
            </label>
            <label class="multiplier__lbl" for="mult-5">
              <input class="multiplier__check" type="checkbox" id="mult-5" name="multipliers" value="5">
              x5
            </label>
            <label class="multiplier__lbl" for="mult-6">
              <input class="multiplier__check" type="checkbox" id="mult-6" name="multipliers" value="6">
              x6
            </label>
            <label class="multiplier__lbl" for="mult-7">
              <input class="multiplier__check" type="checkbox" id="mult-7" name="multipliers" value="7">
              x7
            </label>
            <label class="multiplier__lbl" for="mult-8">
              <input class="multiplier__check" type="checkbox" id="mult-8" name="multipliers" value="8">
              x8
            </label>
            <label class="multiplier__lbl" for="mult-9">
              <input class="multiplier__check" type="checkbox" id="mult-9" name="multipliers" value="9">
              x9
            </label>
            <label class="multiplier__lbl" for="mult-10">
              <input class="multiplier__check" type="checkbox" id="mult-10" name="multipliers" value="10">
              x10
            </label>
          </p>
          <!-- <div class="multiplier__all-wrap">
          </div> -->
        </div>
        </div>
        <div class="settings__wrap">
        <!-- Выбор как показывать -->
        <div class="settings__group present">
          <h3 class="settings__subtitle">Показывать примеры:</h3>
          <div class="present__group" title="Примеры выводятся по-порядку">
            <label for="order">
              <input class="present__radio" type="radio" name="present" id="order" value="order" checked>
              по-порядку
            </label>
            <label for="random" title="Примеры показываются в случайном порядке">
              <input class="present__radio" type="radio" name="present" id="random" value="random">
              случайно
            </label>
            <label for="random-hard" title="Случайно выводятся и примеры и цифры">
              <input class="present__radio" type="radio" name="present" id="random-hard" value="random-hard">
              случайно+
            </label>
          </div>
        </div>
        <!-- Бесконечная игра -->
        <div class="settings__group infinite">
          <h3 class="settings__subtitle">Для выносливых:</h3>
          <label for="infinite" title="Тренируйтесь сколько угодно :)">
            <input class="infinite__check" type="checkbox" name="infinite" id="infinite">
            Бесконечная игра
          </label>
        </div>
        <!-- Для взрослых -->
        <div class="settings__group adult">
          <h3 class="settings__subtitle">Для умных:</h3>
          <label for="adult">
            <input class="adult__check" type="checkbox" name="adult" id="adult">
            Очень сложно
          </label>
        </div>
        </div>
        <!-- Кнопка Начать -->
        <div class="settings__submit-wrap">
          <!-- <button class="btn btn__act game__btn settings__reset-btn" type="reset">
            Сбросить
          </button> -->
          <button class="btn btn__act game__btn settings__submit-btn" type="submit">
            Играть
          </button>
        </div>
      </form>
    </section>`.trim();
};
