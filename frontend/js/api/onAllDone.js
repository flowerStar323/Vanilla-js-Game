import $ from '../helpers/domHelpers';
import setResult from '../components/setResult';

function apiOnAllDone(aResult, aWrongRes, answers) {
  setResult(aResult, aWrongRes, answers);
};


export default function init() {
  window.apiOnAllDone = apiOnAllDone;
};