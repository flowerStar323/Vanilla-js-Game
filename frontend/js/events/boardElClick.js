import getEl from '../helpers/getEl';
import $ from '../helpers/domHelpers';
import randomInt from '../helpers/randomInt';
import {positMain} from '../constants';

export default function handler ($el, $domElem) {
  if ($el.clicked) {
    return;
  }
  $el.clicked = true;
  window.setTimeout(() => {
    $el.clicked = false;
  }, 200)
  const prodId = $el.id;
	const randPosit = randomInt(0, positMain.length - 1);
	const $imageLanchbox = $('.lunchbox-img');
	let { top, left, width, height } = $imageLanchbox.getBoundingClientRect();
	top = top + (height * (positMain[randPosit].top / 100) );
  left = left + (width * (positMain[randPosit].left / 100) );

	let $cloneElem;
  getEl('lunchbox', true);
  getEl('boardElemClon', true);

	const $cloneDomElem = $domElem.cloneNode(true);
	const resultProduct = window.GAME_API.isProductRight(prodId);
	const positionDomElem = $domElem.getBoundingClientRect();

	if (resultProduct) {
		$cloneDomElem.classList.remove('board__element');
    $cloneDomElem.classList.add('board__element-clon');
    $cloneDomElem.setAttribute('style',`top: ${positionDomElem.top}px; left:${positionDomElem.left}px;`);
		getEl('boardElemClon').appendChild($cloneDomElem);
	}

	window.setTimeout(() => {
    window.GAME_API.pickProduct(prodId);

		if (resultProduct) {
 			// song yes
      $domElem.setAttribute('style','display: none')
      $cloneElem = $cloneDomElem.cloneNode(true);
      $cloneDomElem.setAttribute('style',`top:${top}px;left:${left}px;`);
      $cloneElem.setAttribute('style',`top:${top}px;left:${left}px; z-index:0;`);
			$cloneElem.classList.remove('board__element-clon');
			window.setTimeout( ()=>{
        getEl('lunchbox').appendChild($cloneElem);
			},1200);
      return;
    }

    $domElem.classList.add('shake__elem');
    window.setTimeout( ()=>{
      $domElem.classList.remove('shake__elem');
    }, 300);
	}, 100)
};
