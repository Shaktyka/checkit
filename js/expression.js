// Разметка блока выражения
const makeExpressionEl = (expr, gameRegime) => {
  return `<div class="game__expr-wrap">
    <span class="mult-1">${expr.mult_1}</span>
    <span class="symbol-mult">x</span>
    <span class="mult-2">${expr.mult_2}</span>
    <span class="symbol-result">=</span>
    <span class="mult-result">${gameRegime === 'lesson' ? expr.response : ''}</span>
  </div>`.trim();
};
