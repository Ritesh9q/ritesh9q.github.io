(function(t){function n(n){for(var r,u,i=n[0],c=n[1],l=n[2],s=0,f=[];s<i.length;s++)u=i[s],Object.prototype.hasOwnProperty.call(o,u)&&o[u]&&f.push(o[u][0]),o[u]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);p&&p(n);while(f.length)f.shift()();return a.push.apply(a,l||[]),e()}function e(){for(var t,n=0;n<a.length;n++){for(var e=a[n],r=!0,u=1;u<e.length;u++){var c=e[u];0!==o[c]&&(r=!1)}r&&(a.splice(n--,1),t=i(i.s=e[0]))}return t}var r={},o={app:0},a=[];function u(t){return i.p+"js/"+({}[t]||t)+"."+{"chunk-2d0c0c24":"9ee22a92","chunk-2d2138f6":"038dd00d","chunk-2d22d746":"d17fca66","chunk-47109aaf":"18642029"}[t]+".js"}function i(n){if(r[n])return r[n].exports;var e=r[n]={i:n,l:!1,exports:{}};return t[n].call(e.exports,e,e.exports,i),e.l=!0,e.exports}i.e=function(t){var n=[],e=o[t];if(0!==e)if(e)n.push(e[2]);else{var r=new Promise((function(n,r){e=o[t]=[n,r]}));n.push(e[2]=r);var a,c=document.createElement("script");c.charset="utf-8",c.timeout=120,i.nc&&c.setAttribute("nonce",i.nc),c.src=u(t);var l=new Error;a=function(n){c.onerror=c.onload=null,clearTimeout(s);var e=o[t];if(0!==e){if(e){var r=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;l.message="Loading chunk "+t+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,e[1](l)}o[t]=void 0}};var s=setTimeout((function(){a({type:"timeout",target:c})}),12e4);c.onerror=c.onload=a,document.head.appendChild(c)}return Promise.all(n)},i.m=t,i.c=r,i.d=function(t,n,e){i.o(t,n)||Object.defineProperty(t,n,{enumerable:!0,get:e})},i.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},i.t=function(t,n){if(1&n&&(t=i(t)),8&n)return t;if(4&n&&"object"===typeof t&&t&&t.__esModule)return t;var e=Object.create(null);if(i.r(e),Object.defineProperty(e,"default",{enumerable:!0,value:t}),2&n&&"string"!=typeof t)for(var r in t)i.d(e,r,function(n){return t[n]}.bind(null,r));return e},i.n=function(t){var n=t&&t.__esModule?function(){return t["default"]}:function(){return t};return i.d(n,"a",n),n},i.o=function(t,n){return Object.prototype.hasOwnProperty.call(t,n)},i.p="/portfolio/",i.oe=function(t){throw console.error(t),t};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],l=c.push.bind(c);c.push=n,c=c.slice();for(var s=0;s<c.length;s++)n(c[s]);var p=l;a.push([0,"chunk-vendors"]),e()})({0:function(t,n,e){t.exports=e("56d7")},"56d7":function(t,n,e){"use strict";e.r(n);e("e260"),e("e6cf"),e("cca6"),e("a79d");var r=e("2b0e"),o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticStyle:{"background-color":"#A9DFBF"},attrs:{id:"app"}},[e("Home")],1)},a=[],u=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",[e("nav",{staticClass:"navbar navbar-dark bg-dark"},[e("div",{staticClass:"container-fluid"},[e("a",{staticClass:"navbar-brand "},[t._v("Ritesh Kurve")]),e("form",{staticClass:"d-flex"},[e("router-link",{staticClass:"btn btn-outline-primary",attrs:{to:"/projects"}},[t._v("Projects")]),e("router-link",{staticClass:"btn btn-outline-primary ",attrs:{to:"/writings"}},[t._v("Writing")]),e("router-link",{staticClass:"btn btn-outline-primary",attrs:{to:"/about"}},[t._v("About")])],1)])]),e("div",{staticClass:"page-container"},[e("router-view")],1)])},i=[],c={name:"Home"},l=c,s=e("2877"),p=Object(s["a"])(l,u,i,!1,null,null,null),f=p.exports,d={name:"App",components:{Home:f}},b=d,h=Object(s["a"])(b,o,a,!1,null,null,null),v=h.exports,m=(e("d3b7"),e("8c4f"));r["a"].use(m["a"]);var g=[{path:"/",component:function(){return e.e("chunk-2d2138f6").then(e.bind(null,"acca"))}},{path:"/about",component:function(){return e.e("chunk-2d22d746").then(e.bind(null,"f820"))}},{path:"/projects",component:function(){return e.e("chunk-2d2138f6").then(e.bind(null,"acca"))}},{path:"/writings",component:function(){return e.e("chunk-2d0c0c24").then(e.bind(null,"42c3"))}},{path:"/writings/1",component:function(){return e.e("chunk-47109aaf").then(e.bind(null,"1630"))}}],y=new m["a"]({base:"/portfolio/",routes:g}),k=y;e("ab8b");r["a"].config.productionTip=!1,new r["a"]({router:k,render:function(t){return t(v)}}).$mount("#app")}});
//# sourceMappingURL=app.0fc72cd9.js.map