let state = {
  $clock: null,
  isChristmasEdition: null,
  deg: null,
  currentDeg: null,
  prevNum: null,
  gameType: null,
  previousFood: null,
  landDynamicElements: {},
  status: 'NOTPLAYED', // NOTPLAYED, STANDBY, PLAYING, FINISHED, STATS
  json: {},
  language: 'da',
  mouthTimeouts: []
}

const g = {
  set: function (name, value) {
    state[name] = value;
  },
  get: function (name) {
    return state[name];
  }
}

export default g;
