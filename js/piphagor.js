const form = document.querySelector(`.piphagor__form`);
const table = form.querySelector(`.table`);
const resetBtn = form.querySelector(`.piphagor__reset-btn`);

// Добавить переход стрелочками на следующий элемент
// + генерацию таблицы
// Добавить переходы по неправильным ответам и пустым ячейкам
// Добавить проверку (при каждом прав-ном вводе) на все прав-ные ответы в таблице, чтобы показывать модалку с поздр-нием

// Генерация случайного числа от min до max включительно
const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min))
};

// Генератор тостеров
const showToastr = (text, event = `success`) => {
  toastr.options = {
    'newestOnTop': false,
    'positionClass': 'toast-bottom-center',
    'preventDuplicates': true,
    'showDuration': '300',
    'hideDuration': '500',
    'timeOut': '1500',
    'showEasing': 'swing',
    'hideEasing': 'linear',
    'showMethod': 'fadeIn',
    'hideMethod': 'fadeOut'
  };
  toastr[event](text);
};

// Обработчик изменения значений в таблице
const tableChangeEventListener = (evt) => {
  evt.preventDefault();
  const clickedInput = evt.target;
  if (clickedInput.classList.contains(`table__field`)) {
    const resp = Number(clickedInput.value);

    // Получаем данные инпута
    const row = clickedInput.dataset.row;
    const col = clickedInput.dataset.col;
    const multiplication = Number(row) * Number(col);

    // Проверяем ответ и произведение данных
    if (resp === multiplication) {
      clickedInput.classList.remove(`error--piph`);
      clickedInput.classList.add(`right`);
      const compl = compliment_words[[getRandomNumber(0, compliment_words.length - 1)]];
      // toastr.success(compl);
      showToastr(compl);
    } else {
      clickedInput.classList.add(`error--piph`);
      const error_mess = error_messages[[getRandomNumber(0, error_messages.length - 1)]];
      showToastr(error_mess, `error`);
      // toastr.error(error_mess);
    }
  }
};

// Переход к следующей ячейке
const focusNextField = () => {
  const emptyField = table.querySelector(`.table__field:not(.right)`);
  const redField = table.querySelector(`.error--piph`);
  if (emptyField) {
    emptyField.focus();
  } else if (redField) {
    redField.focus();
  } else {
    table.querySelector(`.right`).focus();
  }
};

// Обработчик нажатий клавиш
const tableKeydownEventListener = (evt) => {
  let field = null;
  let response = null;

  if (evt.code === `Enter`) {
    field = evt.target;
    response = Number(field.value);
    if (field.classList.contains(`right`)) {
      focusNextField();
      return;
    }
  } else {
    return;
  }

  // Получаем данные инпута
  const row = field.dataset.row;
  const col = field.dataset.col;
  const multiplication = Number(row) * Number(col);

  // Проверяем ответ и произведение данных
  if (response === multiplication) {
    field.classList.remove(`error--piph`);
    field.classList.add(`right`);
    const compl = compliment_words[[getRandomNumber(0, compliment_words.length - 1)]];
    // toastr.success(compl);
    showToastr(compl);
    focusNextField();
  } else {
    field.classList.add(`error--piph`);
    field.classList.remove(`right`);
    const error_mess = error_messages[[getRandomNumber(0, error_messages.length - 1)]];
    // toastr.error(error_mess);
    showToastr(error_mess, `error`);
  }
};

// table.addEventListener('change', tableChangeEventListener); // ненужный метод, убрать потом
table.addEventListener(`keydown`, tableKeydownEventListener);

// Обработчик отправки формы
const formSubmitEventListener = (evt) => {
  evt.preventDefault();
};

// Обработчик клика по reset
const resetBtnClickEventListener = (evt) => {
  initTable();
  const inputs = form.querySelectorAll(`.table__field`);
  // Сбросить все классы с ячеек
  inputs.forEach((it) => {
    if (it.classList.contains(`error--piph`)) {
      it.classList.remove(`error--piph`);
    } else if (it.classList.contains(`right`)) {
      it.classList.remove(`right`);
    }
  });
};

form.addEventListener(`submit`, formSubmitEventListener);
resetBtn.addEventListener(`click`, resetBtnClickEventListener);

// ---------------- Генерация таблицы ----------------------------

// Генерирует пустой ряд таблицы
const createRowEl = (rowNum) => {
  const row = document.createElement(`tr`);
  row.classList.add(`table__row`);
  if (rowNum !== 0) {
    row.setAttribute(`data-row`, rowNum);
  }
  return row;
};

// Генерация таблицы
const generateTable = (cols = 10, rows = 10) => {
  table.innerHTML = ``;
  for (let i = 0; i <= rows; i++) {
    const row = createRowEl(i);
    table.append(row);
  }
};

// Инициализация таблицы
const initTable = () => {
  generateTable();
  // const firstInput = form.querySelector('.table__field');
  // firstInput.focus();
};

initTable();