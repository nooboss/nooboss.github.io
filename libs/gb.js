window.timerOW = 7000;

window.includeJS_GD = function() {
  // console.log('KKK >> AAA');
        setTimeout(function () {
          (function(d, s, id) {
                // console.log('KKK >> ZZZ');
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = '../main.js';
                fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'gamedistribution-jssdk'));
        }, window.timerOW);
};