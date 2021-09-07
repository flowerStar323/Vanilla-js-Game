import '../../scss/debug.scss';
import $ from '../helpers/domHelpers';
import {bsDebugEnabled} from '../constants';
import {version} from '../constants';

let $el;

const debug = {
  init: () => {
    $el = $('#debug');
    if (!bsDebugEnabled) return;
    $el.classList.add('show');
    debug.add('Version: ' + version)
  },
  add: (text) => {
    if (!bsDebugEnabled) return;
    const $node = document.createElement('div');
    $node.textContent = text;
    if ($el.firstChild) {
      $el.insertBefore($node, $el.firstChild);
    } else {
      $el.appendChild($node);
    }
    $el.scrollTop = 0;
  }
}


export default debug;