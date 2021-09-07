import renderBoardElem from '../components/renderBoardElem';

function apiOnItemsUpdate(aItems) { // get rand elements
	renderBoardElem(aItems);
};

export default function init() {
  window.apiOnItemsUpdate = apiOnItemsUpdate;
};