import g from '../state';

//get Time
function apiGetTimeForClock (time) {
	g.set('currentDeg', (time / 1000) * 6);
	g.set('deg', g.get('currentDeg'));
}

export default function init() {
  window.apiGetTimeForClock = apiGetTimeForClock;
};