const form = document.querySelector('.piphagor__form');
const table = form.querySelector('.table');
const inputs = form.querySelectorAll('.table__field');
const firstInput = form.querySelector('.table__field');
const resetBtn = form.querySelector('.piphagor__reset-btn');

// + Валидацию значений
// Добавить проверку значений + навешиваем классы
// Добавить переход по Enter на следующий элемент (или стрелочками)
// + генерацию таблицы 

// Обработчик изменения значений в таблице 
const tableChangeEventListener = (evt) => {
  evt.preventDefault();
  const clickedInput = evt.target;
  if (clickedInput.classList.contains('table__field')) {
    const resp = Number(clickedInput.value);

    toastr.options = {
      "newestOnTop": false,
      "positionClass": "toast-bottom-center",
      "preventDuplicates": true,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
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
      // clickedInput.classList.add('true--piph');
      clickedInput.classList.remove('error--piph');
      toastr.success(`Умничка!`);
    } else {
      clickedInput.classList.add('error--piph');
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
