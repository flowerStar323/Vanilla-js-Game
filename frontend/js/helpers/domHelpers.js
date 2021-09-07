import '../../scss/domHelpers.scss';

function $ (selector) {
  return document.querySelector(selector);
}

export function $$ (selector) {
  return document.querySelectorAll(selector);
}

export function fadeOut($el, now) {
  $el.classList.add('hide');
  $el.classList.remove('show');
  setTimeout(() => {
    $el.classList.add('hidden');
  }, now? 0: 400)
}

export function fadeIn($el) {
  $el.classList.remove('hidden');
  $el.classList.add('show');
  $el.classList.remove('hide');
}

export function setData($el, name, data) {
  $el.setAttribute('data-' + name, data);
}

export function getData($el, name) {
  return $el.getAttribute('data-' + name);
}

export default $;
