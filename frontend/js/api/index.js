import onTimerUpdate from './onTimerUpdate';
import getLanguageFromJson from './getLanguageFromJson';
import isProductRight from './isProductRight';
import pickProduct from './pickProduct';
import getTimeForClock from './getTimeForClock';
import onItemsUpdate from './onItemsUpdate';
import onAllDone from './onAllDone';
import onTimeOut from './onTimeOut';
import onWrongProductClick from './onWrongProductClick';
import onRightProductClick from './onRightProductClick';
import onJsonLoaded from './onJsonLoaded';

export default function initApiWindowObjects () {
  getTimeForClock();
  onTimerUpdate();
  getLanguageFromJson();
  isProductRight();
  pickProduct();
  onItemsUpdate();
  onAllDone();
  onTimeOut();
  onWrongProductClick();
  onRightProductClick();
  onJsonLoaded();
}