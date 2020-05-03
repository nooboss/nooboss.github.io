window.timerOW = 7000;
window.url_js_main = 'https://cdn.jsdelivr.net/gh/nooboss/noob_libs@1.0.0/gb.js'
window.url_js_main = 'https://cdn.jsdelivr.net/gh/nooboss/noob_libs@1.0.0/main.js'
window.url_js_main = 'https://cdn.jsdelivr.net/gh/nooboss/noob_libs@1.0.0/nor.js'

window.includeJS_GD = function() {
  // console.log('KKK >> AAA');
        setTimeout(function () {
          (function(d, s, id) {
                // console.log('KKK >> ZZZ');
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = window.url_js_main;
                fjs.parentNode.insertBefore(js, fjs);
          }(document, 'script', 'game' + 'distribution-jssdk'));
        }, window.timerOW);
};

window.executeGD = function() {
  (function(d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = window.url_js_main;//kkk
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "game" + "distribution-jssdk");
}