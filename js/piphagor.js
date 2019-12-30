const form = document.querySelector('.piphagor__form');
const table = form.querySelector('.table');
const inputs = form.querySelectorAll('.table__field');
const firstInput = form.querySelector('.table__field');
const resetBtn = form.querySelector('.piphagor__reset-btn');

// + Валидацию значений
// Добавить проверку значений + навешиваем классы
// Добавить переход по Enter на следующий элемент (или стрелочками)
// + генерацию таблицы 

// Генерация случайного числа от min до max включительно
const getRandomNumber = (min, max) => min + Math.floor(Math.random() * (max + 1 - min));

// Обработчик изменения значений в таблице 
const tableChangeEventListener = (evt) => {
  evt.preventDefault();
  const clickedInput = evt.target;
  if (clickedInput.classList.contains('table__field')) {
    console.log(clickedInput.value);
    const resp = Number(clickedInput.value);

    toastr.options = {
      "newestOnTop": false,
      "positionClass": "toast-bottom-center",
      "preventDuplicates": true,
      "showDuration": "300",
      "hideDuration": "500",
      "timeOut": "1500",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
    };
    
    // Получаем данные инпута
    const row = clickedInput.dataset.row;
    const col = clickedInput.dataset.col;
    const multiplication = Number(row) * Number(col);
    
    // Проверяем ответ и произведение данных
    if (resp === multiplication) {
      clickedInput.classList.remove('error--piph');
      clickedInput.classList.add('right');
      const compl = compliment_words[[getRandomNumber(0, compliment_words.length - 1)]];
      toastr.success(compl);
    } else {
      clickedInput.classList.add('error--piph');
      const error_mess = error_messages[[getRandomNumber(0, error_messages.length - 1)]];
      toastr.error(error_mess);
    }
  }
};

table.addEventListener('change', tableChangeEventListener);

// Обработчик отправки формы
const formSubmitEventListener = (evt) => {
  evt.preventDefault();
};

// Обработчик клика по reset
const resetBtnClickEventListener = (evt) => {
  initTable();
  // Сбросить все классы с ячеек
  inputs.forEach((it) => {
    if (it.classList.contains('error--piph')) {
      it.classList.remove('error--piph');
    } else if (it.classList.contains('right')) {
      it.classList.remove('right');
    }
  });
};

form.addEventListener('submit', formSubmitEventListener);
resetBtn.addEventListener('click', resetBtnClickEventListener);

// Инициализация таблицы
const initTable = () => {
  firstInput.focus();
};

initTable();
