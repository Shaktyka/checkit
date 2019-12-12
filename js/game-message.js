// Разметка блока выражения
const gameMessageString = `<p class="game__expr-text v-hidden">Пять на пять — двадцать пять</p>`;

// Рендерим элемент
const renderGameMessageEl = () => {
  return renderElement(gameMessageString);
};