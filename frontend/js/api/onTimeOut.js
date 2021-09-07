import $ from '../helpers/domHelpers';
import setResult from '../components/setResult';

function apiOnTimeOut(aResult, aWrongRes, answers) {
	setResult(aResult, aWrongRes, answers, true);
};

export default function init() {
  window.apiOnTimeOut = apiOnTimeOut;
};