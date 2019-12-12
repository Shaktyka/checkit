// Разметка блока выражения
const makeExpressionEl = (data) => {
  return `<div class="game__expr-wrap">
    <span class="mult-1">${data.mult_1}</span>
    <span class="symbol-mult">x</span>
    <span class="mult-2">${data.mult_2}</span>
    <span class="symbol-result">=</span>
    <span class="mult-result">${data.response}</span>
  </div>`.trim();
};
