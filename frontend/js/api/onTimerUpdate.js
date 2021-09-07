import g from '../state';
import getEl from '../helpers/getEl';

function setClockPos (aSec) {		
	if (aSec === 0) {
    g.set('deg', g.get('currentDeg'));
    return;
  }
	g.set('deg', g.get('deg') - 6);
	getEl('clock').style.transform = `rotate(${g.get('deg')}deg)`;
};

export default function init() {
  window.apiOnTimerUpdate = setClockPos;
};