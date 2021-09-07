import g from '../state';
import $ from '../helpers/domHelpers';
import onResultPage from './onResultPage';
import getEl from '../helpers/getEl';
import sound from '../components/sound';
import {amounTrueProd, resultPopUpTimeout} from '../constants';

function calcWeight (array) {
  const trueProducts = array.length;
	let result = '';
  const newArr = [];  
  const resulGameType = DB.getFoodForLanchbag(g.get('gameType')).length//amounTrueProd[g.get('gameType')];
	const coefficient = 5000 / resulGameType;
	let resultStr = String(Math.round(coefficient * trueProducts));

	if (resultStr.length < 4) {
		resultStr = '0' + resultStr;
	};

	for (var i = 0; i < resultStr.length; i++) {
		newArr.push(resultStr[i]);
	};

	newArr.splice(1, 0, '.');

	for (var i = 0; i < newArr.length; i++) {
		result =  result + newArr[i];
  };
  
  if (g.get('gameType') == 1 && result == 0.625) {
    result = 5;
  }

	result = Number(result).toFixed(3);

	return result;
}

export default function setResult (rightAnswersCount, wrongAnswersCount, array, notDisplayPopUp) {

  $('.board__elements').classList.add('pointer__none');
  $('.close__main').classList.add('pointer__none');
  if (!notDisplayPopUp) {
    getEl('resultPopUp').classList.add("show");
    sound.play('sec10');
  }
  else{
    sound.play('timeout');
  }
  console.log('setResult')

  
  
  setTimeout(() => sound.stopAll(true), resultPopUpTimeout)
  
	setTimeout(() => {
    getEl('resultPopUp').classList.remove("show");
		onResultPage(rightAnswersCount, wrongAnswersCount, calcWeight(array));
  }, resultPopUpTimeout + 200)

};