// Разметка блока выражения
const makeExpressionEl = (expr, gameMode) => {
  return `<div class="game__expr-wrap expr">
    <span class="mult-1 expr__mult-1">${expr.mult_1}</span>
    <span class="symbol-mult">x</span>
    <span class="mult-2 expr__mult-2">${expr.mult_2}</span>
    <span class="symbol-result">=</span>
    ${
      gameMode === `exam` ?
        `<label class="expr__res" for="result">
           <input class="expr__res-field" type="text" name="result" id="result" value="" />
        </label>`
        :
        `<span class="mult-result">${ expr.response || ''}</span>`
    }
  </div>`.trim();
};
