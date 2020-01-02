// ---------------- Генерация таблицы ------------------------

// Генерирует пустой ряд таблицы
const createRowEl = (rowNum) => {
  const row = document.createElement(`tr`);
  row.classList.add(`table__row`);
  if (rowNum !== 0) {
    row.setAttribute(`data-row`, rowNum);
  }
  return row;
};

// Генерирует ОТДЕЛЬНУЮ ячейку TH
const createTH = (colNum) => {
  const th = document.createElement(`th`);
  th.classList.add(`table__th`);
  if (colNum !== 0) {
    th.setAttribute(`data-value`, colNum);
    th.innerHTML = colNum;
  }
  return th;
};

// Генерирует ОТДЕЛЬНУЮ ячейку TD
const createTD = (rowNum, colNum) => {
  const td = document.createElement(`td`);
  td.classList.add(`table__td`);
  if (colNum !== 0) {
    const input = document.createElement(`input`);
    input.classList.add(`table__field`);
    input.setAttribute(`type`, `number`);
    input.setAttribute(`name`, `result`);
    input.setAttribute(`data-row`, rowNum);
    input.setAttribute(`data-col`, colNum);
    td.append(input);
  } else {
    td.classList.add(`table__td--num`);
    td.innerHTML = rowNum;
  }
  return td;
};

// Генерация фрагмента ячеек TH
const generateTHs = (cols) => {
  const fragment = new DocumentFragment();
  for (let i = 0; i <= cols; i++) {
    const th = createTH(i);
    fragment.append(th);
  }
  return fragment;
};

// Генерация фрагмента ячеек TD
const generateTDs = (rowNum, cols) => {
  const fragment = new DocumentFragment();
  for (let i = 0; i <= cols; i++) {
    const td = createTD(rowNum, i);
    fragment.append(td);
  }
  return fragment;
};

// Генерация таблицы
const generateTable = (cols = 10, rows = 10) => {
  table.innerHTML = ``;
  for (let i = 0; i <= rows; i++) {
    const row = createRowEl(i);
    let tdFragment = null;
    if (i === 0) {
      tdFragment = generateTHs(cols);
    } else {
      tdFragment = generateTDs(i, cols);
    }
    row.append(tdFragment);
    table.append(row);
  }
};
