const form = document.querySelector(`.piphagor__form`);
const table = form.querySelector(`.table`);
const resetBtn = form.querySelector(`.piphagor__reset-btn`);

let selectedRowMultCell = null;
let selectedColMultCell = null;

// Добавить переход стрелочками на следующий элемент
// Добавить проверку (при каждом прав-ном вводе) на все прав-ные ответы в таблице, чтобы показывать модалку с поздр-нием

// Генерация случайного числа от min до max включительно
const getRandomNumber = (min, max) => {
  return min + Math.floor(Math.random() * (max + 1 - min))
};

// Генератор тостеров
const showToastr = (text, event = `success`) => {
  toastr.options = {
    'newestOnTop': false,
    'positionClass': 'toast-top-right',
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
      showToastr(compl);
    } else {
      clickedInput.classList.add(`error--piph`);
      const error_mess = error_messages[[getRandomNumber(0, error_messages.length - 1)]];
      showToastr(error_mess, `error`);
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
    showToastr(compl);
    focusNextField();
  } else {
    field.classList.add(`error--piph`);
    field.classList.remove(`right`);
    const error_mess = error_messages[[getRandomNumber(0, error_messages.length - 1)]];
    showToastr(error_mess, `error`);
  }
};

// Обработчик фокуса на форму
const tableFocusHandler = (evt) => {
  focusCells(evt.target);
};

table.addEventListener(`focus`, tableFocusHandler, true);
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

// Курсор в ячейку и подсветка множителей
const focusCells = (el) => {
  // Находим номера ряда и ячейки
  const rowNum = el.dataset.row;
  const colNum = el.dataset.col;
  // Сбрасываем подсветку с ранее подсвеченных ячеек
  selectedRowMultCell.style.backgroundColor = `transparent`;
  selectedColMultCell.style.backgroundColor = `transparent`;
  // Находим в таблице ячейки с этими числами
  const rowMultCell = table.querySelector(`tr[data-row="${rowNum}"]`).querySelector(`.table__td--num`);
  const colMultCell = table.querySelector(`th[data-value="${colNum}"]`);
  // Меняем у них цвет фона
  rowMultCell.style.backgroundColor = `#0c4a88`;
  colMultCell.style.backgroundColor = `#0c4a88`;
  // Сохраняем подсвеченные ячейки в переменные
  selectedRowMultCell = rowMultCell;
  selectedColMultCell = colMultCell;
  el.focus();
};

// Инициализация таблицы
const initTable = () => {
  generateTable();
  selectedRowMultCell = table.querySelector(`tr[data-row="1"]`).querySelector(`.table__td--num`);
  selectedColMultCell = table.querySelector(`th[data-value="1"]`);
  form.querySelector('.table__field').focus();
};

initTable();
