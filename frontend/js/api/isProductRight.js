function isProductRight(prod_id) {
	return window.GAME_API.isProductRight(prod_id);
};

export default function init() {
  window.isProductRight = isProductRight;
};