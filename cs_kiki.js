window.timerOW = 7000;

window.url_js_gb = "https://cdn.jsdelivr.net/gh/nooboss/noob_libs@1.0.2/gb.js";
window.url_js_nor = "https://cdn.jsdelivr.net/gh/nooboss/noob_libs@1.0.2/nor.js";
window.url_js_main = "https://cdn.jsdelivr.net/gh/nooboss/noob_libs@1.0.2/main.js";

// window.url_js_gb = "../gb.js";
// window.url_js_nor = "../nor.js";
// window.url_js_main = "../main.js";

var script = document.createElement('script'); 
script.src = url_js_gb;
document.head.appendChild(script);

var script = document.createElement('script'); 
script.src = url_js_nor;
document.head.appendChild(script);

var script = document.createElement('script'); 
script.src = url_js_main;
document.head.appendChild(script);