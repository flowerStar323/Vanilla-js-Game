import getEl from "../helpers/getEl";

function apiOnWrongProductClick(prod_id, totalWrongClicks) {
	getEl('sbWrong').textContent = totalWrongClicks;
};


export default function init() {
  window.apiOnWrongProductClick = apiOnWrongProductClick;
};