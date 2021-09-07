import g from '../state';
import $, {fadeOut, getData} from '../helpers/domHelpers';
import getEl from '../helpers/getEl';
import {startTypeButtonShake} from '../components/lunchBoxShake';
import getGameName from '../helpers/getGameName';
import sound from '../components/sound';


export default function handler ($gameTypeButton) {
  if (g.get('screensaverActive')) {
    return;
  }
  //wait for next click on gametype
  g.set('previousFood', null);
  startTypeButtonShake(false);
  sound.stopAll(true);
  getEl('pill').style.transform = 'rotate(0deg)';
  $('.board__elements').classList.remove('pointer__none');
  getEl('closeMain').classList.remove('pointer__none');
  fadeOut(getEl('resultPage'));
  getEl('mainPage').classList.toggle('main--hidden');
  // ! here we set current gametype
  const gameType = parseInt(getData($gameTypeButton, 'id'));
  g.set('gameType', gameType);
  getEl('mainPage').classList.add('gametype-' + gameType);

  getEl('game').classList.remove('gametype-1');
  getEl('game').classList.remove('gametype-2');
  getEl('game').classList.remove('gametype-3');
  getEl('game').classList.remove('gametype-4');
  getEl('game').classList.add('gametype-' + gameType);

  

  fadeOut(getEl('introScreen'));
  window.GAME_API.setLanchbagId(g.get('gameType'));
  window.GAME_API.startGame();
  getEl('lunchbox').innerHTML = '';
  getEl('boardElemClon').innerHTML = '';
  g.set('status', 'PLAYING');
  sound.play('game');
  getEl('sbGameName').textContent = getGameName();
  getEl('sbWrong').textContent = 0;
  getEl('sbCorrect').textContent = 0;
  

}