import globals from '../state';

function randomInt(min, max, prevNum = globals.prevNum, mathMethod = 'floor') {
  const getRandomInt = () => {
    const randomIntNotRounded =  min + Math.random() * (max + 1 - min);
    return Math[mathMethod](randomIntNotRounded);
  }
  let num = null;
  while (num == prevNum || num == null) {
    if (prevNum !== null) {
      globals.prevNum = prevNum;
    }
    num = getRandomInt();
  }
  return num;
}

export default randomInt