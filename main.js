'use strict';

let Ease = {
  easeInOut: t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1
}

let duration = 1000;

window.addEventListener('DOMContentLoaded', () => {

  let smoothScrollTriggers = document.querySelectorAll('a[href^="#"]');
  smoothScrollTriggers.forEach(function (smoothScrollTrigger) {

    smoothScrollTrigger.addEventListener('click', function (s) {

      let href = smoothScrollTrigger.getAttribute('href');
      let currentPosition = document.documentElement.scrollTop || document.body.scrollTop;
      let targetElement = document.getElementById(href.replace('#', ''));

      if (targetElement) {

        s.preventDefault();
        s.stopPropagation();

        let targetPosition = window.pageYOffset + targetElement.getBoundingClientRect().top - 0;

        let startTime = performance.now();
        let loop = function (nowTime) {
          let time = nowTime - startTime;
          let normalizedTime = time / duration;

          if (normalizedTime < 1) {
            window.scrollTo(0, currentPosition + ((targetPosition - currentPosition) * Ease.easeInOut(normalizedTime)));
            requestAnimationFrame(loop);
          } else {
            window.scrollTo(0, targetPosition);
          }
        }
        requestAnimationFrame(loop);
      }
    });

  });

})