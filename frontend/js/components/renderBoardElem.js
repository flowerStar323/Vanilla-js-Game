import $ from '../helpers/domHelpers';
import g from '../state';
import boardElClick from '../events/boardElClick';
import {isTouch} from '../constants';
// import randomInt from '../helpers/randomInt';

// function is_touch_device() {
//   if (('ontouchstart' in window) || window.TouchEvent || window.DocumentTouch && document instanceof DocumentTouch) {
//     return true;
//   }
// }

export default function renderBoardEl (aItems) {
  
	const boardElements = $('.board__elements');
  boardElements.textContent = '';
  let soundsCount = 0

	aItems.map(($el, index) => {
    if ($el === 'fake_element') {
      const boardElem = document.createElement('div');
      boardElem.classList.add('board__element');
      boardElements.appendChild(boardElem);
      return;
    }

		const boardElem = document.createElement('div');
		const boardElemImg = document.createElement('img');

    
    
    boardElem.classList.add('board__element');

   // boardElem.classList.add('board__element_gone');
  
    if (g.get('previousFood') && g.get('previousFood')[index] !== aItems[index]) {
      
      boardElemImg.setAttribute('src',`${g.get('previousFood')[index].img}`)
      
      
      boardElem.classList.add('board__element_gone');
      setTimeout(() =>boardElemImg.setAttribute('src',`${$el.img}`), 200);

      setTimeout(() => boardElem.classList.remove('board__element_gone'), 200);

      setTimeout(() => boardElem.classList.add('board__element_new'), 100);
      setTimeout(() => boardElem.classList.remove('board__element_new'), 900);
      soundsCount++;
    }
    else{
      boardElemImg.setAttribute('src',`${$el.img}`);
    }
    boardElem.appendChild(boardElemImg);
    

		//boardElem.addEventListener('touchend', () => boardElClick($el, boardElem));
    boardElem.addEventListener('touchstart', () => boardElClick($el, boardElem));
    boardElem.addEventListener('click', () => boardElClick($el, boardElem));

		boardElements.appendChild(boardElem);
  })

  g.set('previousFood', [...aItems]);

};
