(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{21:function(e,t,a){},36:function(e,t,a){"use strict";var n=a(21);a.n(n).a},39:function(e,t,a){},40:function(e,t,a){},42:function(e,t,a){"use strict";var n=a(2),i={props:{src:String,autoRun:Boolean,width:{type:Number,default:480},height:{type:Number,default:560}},data:()=>({active:!1,stats:null}),watch:{src:"setBarrage"},async mounted(){await n.loadImages({bullet1:"bullet/bullet1.png",bullet2:"bullet/bullet2.png",bullet3:"bullet/bullet3.png"}),n.buildFromImages("bullet1",n.touhou.v2_1),n.buildFromImages("bullet2",n.touhou.v2_2),n.buildFromImages("bullet3",n.touhou.v2_3),this.field=new n.Field(this.$el,{width:this.width,height:this.height,statsInterval:50,onPause:()=>{this.$emit("pause"),this.active=!1},onResume:()=>{this.$emit("resume"),this.active=!0},onStats:e=>{this.$emit("stats",e),this.stats=e}}),this.autoRun||await this.field.setPlayer({}),await this.setBarrage()},methods:{async setBarrage(){this.field&&(await this.field.setBarrage(this.$demo[this.src]),this.autoRun&&this.field.toggle())},toggle(){this.field&&this.field.toggle()}}},r=a(1),s=Object(r.a)(i,function(){var e=this.$createElement;return(this._self._c||e)("div")},[],!1,null,null,null);t.a=s.exports},65:function(e,t,a){var n="undefined"!=typeof window?window:"undefined"!=typeof WorkerGlobalScope&&self instanceof WorkerGlobalScope?self:{},i=function(){var e=/\blang(?:uage)?-([\w-]+)\b/i,t=0,a=n.Prism={manual:n.Prism&&n.Prism.manual,disableWorkerMessageHandler:n.Prism&&n.Prism.disableWorkerMessageHandler,util:{encode:function(e){return e instanceof i?new i(e.type,a.util.encode(e.content),e.alias):"Array"===a.util.type(e)?e.map(a.util.encode):e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/\u00a0/g," ")},type:function(e){return Object.prototype.toString.call(e).match(/\[object (\w+)\]/)[1]},objId:function(e){return e.__id||Object.defineProperty(e,"__id",{value:++t}),e.__id},clone:function(e,t){var n=a.util.type(e);switch(t=t||{},n){case"Object":if(t[a.util.objId(e)])return t[a.util.objId(e)];var i={};for(var r in t[a.util.objId(e)]=i,e)e.hasOwnProperty(r)&&(i[r]=a.util.clone(e[r],t));return i;case"Array":if(t[a.util.objId(e)])return t[a.util.objId(e)];i=[];return t[a.util.objId(e)]=i,e.forEach(function(e,n){i[n]=a.util.clone(e,t)}),i}return e}},languages:{extend:function(e,t){var n=a.util.clone(a.languages[e]);for(var i in t)n[i]=t[i];return n},insertBefore:function(e,t,n,i){var r=(i=i||a.languages)[e];if(2==arguments.length){for(var s in n=arguments[1])n.hasOwnProperty(s)&&(r[s]=n[s]);return r}var l={};for(var o in r)if(r.hasOwnProperty(o)){if(o==t)for(var s in n)n.hasOwnProperty(s)&&(l[s]=n[s]);l[o]=r[o]}return a.languages.DFS(a.languages,function(t,a){a===i[e]&&t!=e&&(this[t]=l)}),i[e]=l},DFS:function(e,t,n,i){for(var r in i=i||{},e)e.hasOwnProperty(r)&&(t.call(e,r,e[r],n||r),"Object"!==a.util.type(e[r])||i[a.util.objId(e[r])]?"Array"!==a.util.type(e[r])||i[a.util.objId(e[r])]||(i[a.util.objId(e[r])]=!0,a.languages.DFS(e[r],t,r,i)):(i[a.util.objId(e[r])]=!0,a.languages.DFS(e[r],t,null,i)))}},plugins:{},highlightAll:function(e,t){a.highlightAllUnder(document,e,t)},highlightAllUnder:function(e,t,n){var i={callback:n,selector:'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'};a.hooks.run("before-highlightall",i);for(var r,s=i.elements||e.querySelectorAll(i.selector),l=0;r=s[l++];)a.highlightElement(r,!0===t,i.callback)},highlightElement:function(t,i,r){for(var s,l,o=t;o&&!e.test(o.className);)o=o.parentNode;o&&(s=(o.className.match(e)||[,""])[1].toLowerCase(),l=a.languages[s]),t.className=t.className.replace(e,"").replace(/\s+/g," ")+" language-"+s,t.parentNode&&(o=t.parentNode,/pre/i.test(o.nodeName)&&(o.className=o.className.replace(e,"").replace(/\s+/g," ")+" language-"+s));var u={element:t,language:s,grammar:l,code:t.textContent};if(a.hooks.run("before-sanity-check",u),!u.code||!u.grammar)return u.code&&(a.hooks.run("before-highlight",u),u.element.textContent=u.code,a.hooks.run("after-highlight",u)),void a.hooks.run("complete",u);if(a.hooks.run("before-highlight",u),i&&n.Worker){var g=new Worker(a.filename);g.onmessage=function(e){u.highlightedCode=e.data,a.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(u.element),a.hooks.run("after-highlight",u),a.hooks.run("complete",u)},g.postMessage(JSON.stringify({language:u.language,code:u.code,immediateClose:!0}))}else u.highlightedCode=a.highlight(u.code,u.grammar,u.language),a.hooks.run("before-insert",u),u.element.innerHTML=u.highlightedCode,r&&r.call(t),a.hooks.run("after-highlight",u),a.hooks.run("complete",u)},highlight:function(e,t,n){var r={code:e,grammar:t,language:n};return a.hooks.run("before-tokenize",r),r.tokens=a.tokenize(r.code,r.grammar),a.hooks.run("after-tokenize",r),i.stringify(a.util.encode(r.tokens),r.language)},matchGrammar:function(e,t,n,i,r,s,l){var o=a.Token;for(var u in n)if(n.hasOwnProperty(u)&&n[u]){if(u==l)return;var g=n[u];g="Array"===a.util.type(g)?g:[g];for(var c=0;c<g.length;++c){var d=g[c],h=d.inside,p=!!d.lookbehind,f=!!d.greedy,m=0,b=d.alias;if(f&&!d.pattern.global){var y=d.pattern.toString().match(/[imuy]*$/)[0];d.pattern=RegExp(d.pattern.source,y+"g")}d=d.pattern||d;for(var v=i,w=r;v<t.length;w+=t[v].length,++v){var k=t[v];if(t.length>e.length)return;if(!(k instanceof o)){if(f&&v!=t.length-1){if(d.lastIndex=w,!($=d.exec(e)))break;for(var x=$.index+(p?$[1].length:0),F=$.index+$[0].length,A=v,S=w,j=t.length;A<j&&(S<F||!t[A].type&&!t[A-1].greedy);++A)x>=(S+=t[A].length)&&(++v,w=S);if(t[v]instanceof o)continue;C=A-v,k=e.slice(w,S),$.index-=w}else{d.lastIndex=0;var $=d.exec(k),C=1}if($){p&&(m=$[1]?$[1].length:0);F=(x=$.index+m)+($=$[0].slice(m)).length;var _=k.slice(0,x),N=k.slice(F),P=[v,C];_&&(++v,w+=_.length,P.push(_));var E=new o(u,h?a.tokenize($,h):$,b,$,f);if(P.push(E),N&&P.push(N),Array.prototype.splice.apply(t,P),1!=C&&a.matchGrammar(e,t,n,v,w,!0,u),s)break}else if(s)break}}}}},tokenize:function(e,t,n){var i=[e],r=t.rest;if(r){for(var s in r)t[s]=r[s];delete t.rest}return a.matchGrammar(e,i,t,0,0,!1),i},hooks:{all:{},add:function(e,t){var n=a.hooks.all;n[e]=n[e]||[],n[e].push(t)},run:function(e,t){var n=a.hooks.all[e];if(n&&n.length)for(var i,r=0;i=n[r++];)i(t)}}},i=a.Token=function(e,t,a,n,i){this.type=e,this.content=t,this.alias=a,this.length=0|(n||"").length,this.greedy=!!i};if(i.stringify=function(e,t,n){if("string"==typeof e)return e;if("Array"===a.util.type(e))return e.map(function(a){return i.stringify(a,t,e)}).join("");var r={type:e.type,content:i.stringify(e.content,t,n),tag:"span",classes:["token",e.type],attributes:{},language:t,parent:n};if(e.alias){var s="Array"===a.util.type(e.alias)?e.alias:[e.alias];Array.prototype.push.apply(r.classes,s)}a.hooks.run("wrap",r);var l=Object.keys(r.attributes).map(function(e){return e+'="'+(r.attributes[e]||"").replace(/"/g,"&quot;")+'"'}).join(" ");return"<"+r.tag+' class="'+r.classes.join(" ")+'"'+(l?" "+l:"")+">"+r.content+"</"+r.tag+">"},!n.document)return n.addEventListener?(a.disableWorkerMessageHandler||n.addEventListener("message",function(e){var t=JSON.parse(e.data),i=t.language,r=t.code,s=t.immediateClose;n.postMessage(a.highlight(r,a.languages[i],i)),s&&n.close()},!1),n.Prism):n.Prism;var r=document.currentScript||[].slice.call(document.getElementsByTagName("script")).pop();return r&&(a.filename=r.src,a.manual||r.hasAttribute("data-manual")||("loading"!==document.readyState?window.requestAnimationFrame?window.requestAnimationFrame(a.highlightAll):window.setTimeout(a.highlightAll,16):document.addEventListener("DOMContentLoaded",a.highlightAll))),n.Prism}();e.exports&&(e.exports=i),"undefined"!=typeof global&&(global.Prism=i),i.languages.markup={comment:/<!--[\s\S]*?-->/,prolog:/<\?[\s\S]+?\?>/,doctype:/<!DOCTYPE[\s\S]+?>/i,cdata:/<!\[CDATA\[[\s\S]*?]]>/i,tag:{pattern:/<\/?(?!\d)[^\s>\/=$<%]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,greedy:!0,inside:{tag:{pattern:/^<\/?[^\s>\/]+/i,inside:{punctuation:/^<\/?/,namespace:/^[^\s>\/:]+:/}},"attr-value":{pattern:/=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,inside:{punctuation:[/^=/,{pattern:/(^|[^\\])["']/,lookbehind:!0}]}},punctuation:/\/?>/,"attr-name":{pattern:/[^\s>\/]+/,inside:{namespace:/^[^\s>\/:]+:/}}}},entity:/&#?[\da-z]{1,8};/i},i.languages.markup.tag.inside["attr-value"].inside.entity=i.languages.markup.entity,i.hooks.add("wrap",function(e){"entity"===e.type&&(e.attributes.title=e.content.replace(/&amp;/,"&"))}),i.languages.xml=i.languages.markup,i.languages.html=i.languages.markup,i.languages.mathml=i.languages.markup,i.languages.svg=i.languages.markup,i.languages.css={comment:/\/\*[\s\S]*?\*\//,atrule:{pattern:/@[\w-]+?.*?(?:;|(?=\s*\{))/i,inside:{rule:/@[\w-]+/}},url:/url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,selector:/[^{}\s][^{};]*?(?=\s*\{)/,string:{pattern:/("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},property:/[-_a-z\xA0-\uFFFF][-\w\xA0-\uFFFF]*(?=\s*:)/i,important:/\B!important\b/i,function:/[-a-z0-9]+(?=\()/i,punctuation:/[(){};:]/},i.languages.css.atrule.inside.rest=i.languages.css,i.languages.markup&&(i.languages.insertBefore("markup","tag",{style:{pattern:/(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,lookbehind:!0,inside:i.languages.css,alias:"language-css",greedy:!0}}),i.languages.insertBefore("inside","attr-value",{"style-attr":{pattern:/\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,inside:{"attr-name":{pattern:/^\s*style/i,inside:i.languages.markup.tag.inside},punctuation:/^\s*=\s*['"]|['"]\s*$/,"attr-value":{pattern:/.+/i,inside:i.languages.css}},alias:"language-css"}},i.languages.markup.tag)),i.languages.clike={comment:[{pattern:/(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,lookbehind:!0},{pattern:/(^|[^\\:])\/\/.*/,lookbehind:!0,greedy:!0}],string:{pattern:/(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,greedy:!0},"class-name":{pattern:/((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,lookbehind:!0,inside:{punctuation:/[.\\]/}},keyword:/\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,boolean:/\b(?:true|false)\b/,function:/[a-z0-9_]+(?=\()/i,number:/\b0x[\da-f]+\b|(?:\b\d+\.?\d*|\B\.\d+)(?:e[+-]?\d+)?/i,operator:/--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,punctuation:/[{}[\];(),.:]/},i.languages.javascript=i.languages.extend("clike",{keyword:/\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,number:/\b(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|NaN|Infinity)\b|(?:\b\d+\.?\d*|\B\.\d+)(?:[Ee][+-]?\d+)?/,function:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*\()/i,operator:/-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/}),i.languages.insertBefore("javascript","keyword",{regex:{pattern:/((?:^|[^$\w\xA0-\uFFFF."'\])\s])\s*)\/(\[[^\]\r\n]+]|\\.|[^\/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})\]]))/,lookbehind:!0,greedy:!0},"function-variable":{pattern:/[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-z\xA0-\uFFFF][$\w\xA0-\uFFFF]*)\s*=>))/i,alias:"function"},constant:/\b[A-Z][A-Z\d_]*\b/}),i.languages.insertBefore("javascript","string",{"template-string":{pattern:/`(?:\\[\s\S]|\${[^}]+}|[^\\`])*`/,greedy:!0,inside:{interpolation:{pattern:/\${[^}]+}/,inside:{"interpolation-punctuation":{pattern:/^\${|}$/,alias:"punctuation"},rest:null}},string:/[\s\S]+/}}}),i.languages.javascript["template-string"].inside.interpolation.inside.rest=i.languages.javascript,i.languages.markup&&i.languages.insertBefore("markup","tag",{script:{pattern:/(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,lookbehind:!0,inside:i.languages.javascript,alias:"language-javascript",greedy:!0}}),i.languages.js=i.languages.javascript,"undefined"!=typeof self&&self.Prism&&self.document&&document.querySelector&&(self.Prism.fileHighlight=function(){var e={js:"javascript",py:"python",rb:"ruby",ps1:"powershell",psm1:"powershell",sh:"bash",bat:"batch",h:"c",tex:"latex"};Array.prototype.slice.call(document.querySelectorAll("pre[data-src]")).forEach(function(t){for(var a,n=t.getAttribute("data-src"),r=t,s=/\blang(?:uage)?-([\w-]+)\b/i;r&&!s.test(r.className);)r=r.parentNode;if(r&&(a=(t.className.match(s)||[,""])[1]),!a){var l=(n.match(/\.(\w+)$/)||[,""])[1];a=e[l]||l}var o=document.createElement("code");o.className="language-"+a,t.textContent="",o.textContent="Loading…",t.appendChild(o);var u=new XMLHttpRequest;u.open("GET",n,!0),u.onreadystatechange=function(){4==u.readyState&&(u.status<400&&u.responseText?(o.textContent=u.responseText,i.highlightElement(o)):u.status>=400?o.textContent="✖ Error "+u.status+" while fetching file: "+u.statusText:o.textContent="✖ Error: File does not exist or is empty")},u.send(null)}),i.plugins.toolbar&&i.plugins.toolbar.registerButton("download-file",function(e){var t=e.element.parentNode;if(t&&/pre/i.test(t.nodeName)&&t.hasAttribute("data-src")&&t.hasAttribute("data-download-link")){var a=t.getAttribute("data-src"),n=document.createElement("a");return n.textContent=t.getAttribute("data-download-link-label")||"Download",n.setAttribute("download",""),n.href=a,n}})},document.addEventListener("DOMContentLoaded",self.Prism.fileHighlight))},66:function(e,t,a){"use strict";var n=a(39);a.n(n).a},67:function(e,t,a){},68:function(e,t,a){"use strict";var n=a(40);a.n(n).a},70:function(e,t,a){"use strict";a.r(t);var n=a(65),i=a.n(n),r={props:{text:{type:String,default:""},lang:{type:String,default:"js"}},created(){this.html=i.a.highlight(this.text,i.a.languages[this.lang],this.lang)}},s=(a(36),a(66),a(1)),l=Object(s.a)(r,function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"code"},[t("pre",{staticClass:"language--",domProps:{innerHTML:this._s(this.html)}})])},[],!1,null,"15d39932",null).exports,o=a(42),u=(a(67),{components:{Field:o.a,Code:l},props:{width:{type:Number,default:480},height:{type:Number,default:560},autoRun:Boolean,src:String},data:()=>({leftWidth:null,rightWidth:null,stats:null,active:!1}),computed:{aspectRatio(){return this.width/this.height}},async mounted(){this.layout(),addEventListener("resize",()=>this.layout())},methods:{async layout(){await this.$nextTick();const e=this.$el?this.$el.offsetWidth:1/0;this.rightWidth=Math.min(e/2,(innerHeight-100)*this.aspectRatio),this.leftWidth=e-this.rightWidth}}}),g=(a(68),Object(s.a)(u,function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"stg-demo",style:{height:e.rightWidth/e.aspectRatio+"px"}},[a("Code",{staticClass:"left",style:{width:e.leftWidth+"px"},attrs:{text:(e.$demo[e.src]||{}).__raw__}}),e._v(" "),a("Field",{staticClass:"right",style:{width:e.rightWidth+"px"},attrs:{src:e.src,width:e.width,height:e.height,"auto-run":e.autoRun}})],1)},[],!1,null,null,null));t.default=g.exports}}]);