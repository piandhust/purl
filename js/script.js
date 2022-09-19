import { TIME_OUT, DELAY_TIME, TIME_OUT_SKIP } from './constants.js';
import { getRndInteger } from './utils.js';

const redirectLinks = [
  'https://google.com',
  'https://facebook.com',
  'https://stackoverflow.com',
];

const selectedRedirectLink =
  redirectLinks[getRndInteger(0, redirectLinks.length)];

// main
const txtMinuteOut = document.querySelector('.minute-text');
const txtSecondOut = document.querySelector('.second-text');
const txtStaticElms = document.querySelectorAll('.static-text');
const btnRedirect = document.querySelector('#redirect-button');
const loadingSpinner = document.querySelector('.loading-spinner');

let timeOut = TIME_OUT;

btnRedirect.addEventListener('click', () => {
  window.location.href = selectedRedirectLink;
});

window.onload = (event) => {
  const countDownRedirect = setInterval(() => {
    txtStaticElms.forEach((elm) => {
      elm.classList.remove('invisible');
    });

    if (timeOut >= 0) {
      if (timeOut === TIME_OUT - TIME_OUT_SKIP) {
        loadingSpinner.classList.remove('d-none');
        setTimeout(() => {
          loadingSpinner.classList.add('d-none');
          btnRedirect.classList.remove('d-none');
        }, DELAY_TIME * 1000);
      }
      const minutes = Math.floor(timeOut / 60);
      const seconds = timeOut - minutes * 60;

      txtMinuteOut.innerHTML = `${minutes.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`;

      txtSecondOut.innerHTML = `${seconds.toLocaleString('en-US', {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`;

      timeOut -= 1;
    } else {
      clearInterval(countDownRedirect);
      window.location.href = selectedRedirectLink;
    }
  }, 1000);
};
