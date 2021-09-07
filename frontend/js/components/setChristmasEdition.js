import $ from '../helpers/domHelpers';
import getEl from '../helpers/getEl';

function createDiv(className, html) {
  const div = document.createElement('div');
  div.className = className;
  if (html) {
    div.innerHTML = html;
  }
  return div;
}

//christmas variation
export default function setChristmasEdition(isChristmasEdition) {
	if (!isChristmasEdition) {
    const $button4 = $('#game-type-button-4');
    $button4.parentElement.remove();
    return;
  }
  getEl('introScreen').appendChild(createDiv('christmas-elm top'));
  getEl('introScreen').appendChild(createDiv('christmas-elm nisse1'));
  getEl('introScreen').appendChild(createDiv('christmas-elm nisse2'));
  getEl('introScreen').appendChild(createDiv('christmas-elm christmas-table'));




  const candleInnerHtml = `
    <div class="flame">
      <div class="shadows"></div>
      <div class="top"></div>
      <div class="middle"></div>
      <div class="bottom"></div>
    </div>
    <div class="wick"></div>
    <div class="wax"></div>
  `;
  getEl('introScreen').appendChild(createDiv('christmas-elm candle', candleInnerHtml));
  for (const num of [1, 2, 3, 4]) {
    getEl('introScreen').appendChild(createDiv(`christmas-elm candle candle${num}`, candleInnerHtml));
  }
  getEl('introScreen').appendChild(createDiv(`christmas-elm candle candlebig`, candleInnerHtml));

  $('#intro-screen .butcher').classList.add('christmas');
  $('#intro-screen .game-type-buttons').classList.add('christmas');



}


// export default function init() {
//   window.apiGetIsChristmasEditionJSON = apiGetIsChristmasEditionJSON;
// };