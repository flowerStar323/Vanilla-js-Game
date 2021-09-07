function pickProduct(prod_id) {
	window.GAME_API.pickProduct(prod_id);
};

export default function init() {
  window.pickProduct = pickProduct;
};