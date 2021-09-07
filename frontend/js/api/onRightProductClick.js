import getEl from "../helpers/getEl";

function apiOnRightProductClick(prod_id, totalRightClicks) {
	getEl('sbCorrect').textContent = totalRightClicks;
};


export default function init() {
  window.apiOnRightProductClick = apiOnRightProductClick;
};