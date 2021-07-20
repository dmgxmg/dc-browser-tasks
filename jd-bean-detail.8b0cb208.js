(()=>{"use strict";var t={419:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.clickWhileVisibleStep=e.clickIfVisibleStep=e.waitClickStep=e.viewVisible=e.clickWhileVisible=e.waitClick=e.flowClick=e.useTouchClick=void 0;const o=n(737),s=n(393),i=n(947);let a=t=>o.toElement(t).click();async function r(t){const e=o.toElement(t);return!!o.elementVisible(e)&&(c(e),a(e),i.notifyTaskMessage("Click Element"),await s.flowDelay(),!0)}function c(t){o.toElement(t).scrollIntoView({block:"center"})}async function u(t){const e=await async function(t){return await s.flowWait((()=>o.elementVisible(t))),o.toElement(t)}(t);await r(e)}async function l(t){for(;;){const e=o.toElement(t);if(!o.elementVisible(e))break;await r(e)}}e.useTouchClick=function(){a=o.touchClick},e.flowClick=r,e.waitClick=u,e.clickWhileVisible=l,e.viewVisible=function(t){const e=o.toElement(t);return!!o.elementVisible(e)&&(c(e),!0)},e.waitClickStep=async function(t,e){await s.flowStep((()=>u(t)),e)},e.clickIfVisibleStep=async function(t,e){return!!o.elementVisible(t)&&await s.flowStep((()=>r(t)),e)},e.clickWhileVisibleStep=async function(t,e){return!!o.elementVisible(t)&&(await s.flowStep((()=>l(t)),e),!0)}},393:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.flowWait=e.flowDelay=e.flowStep=e.flowReturnResult=e.flowReturnSuccess=e.flowReturn=e.flowThrow=e.flow=e.flowConfigure=void 0;const o=n(947),s=n(206);let i,a={waitTimeout:5e3,defaultDelayTime:500,successWhen:()=>!1};function r(t){a={...a,...t}}async function c(t=a.defaultDelayTime){o.notifyTaskDelay(t),await s.sleep(t)}e.flowConfigure=r,e.flow=async function(t,e){try{let n;if(o.notifyTaskStart(),r(e),i=t(),a.successWhen())return o.notifyTaskSuccess();for(;;){const t=await i.next(n);if(n=t.value,t.done){a.successWhen()?o.notifyTaskSuccess():t.value?o.notify(t.value):o.notifyTaskEnd();break}}}catch(t){o.notifyTaskError(t)}},e.flowThrow=function(t){return i.throw(t)},e.flowReturn=function(t){return i.return(t)},e.flowReturnSuccess=function(){return i.return(o.taskSuccessAction())},e.flowReturnResult=function(t){return i.return(o.taskResultAction(t))},e.flowStep=async function(t,e){o.notifyTaskStepStart(e);const n=await t();return o.notifyTaskStepEnd(e),n},e.flowDelay=c,e.flowWait=async function(t){const e=Date.now();for(;!t();){if(Date.now()-e>a.waitTimeout){await i.throw("Wait Timeout");break}await c()}}},260:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.pageFlow=void 0;const o=n(683),s=n(393),i=n(947),a=n(419);e.pageFlow=function(t,e){const{touchClick:n,urls:r,successElement:c,...u}=e;if(r&&!function(t){const e=window.location.href;return(o.isString(t)?[t]:t).some((t=>e.startsWith(t)))}(r))return i.notifyTaskError("Page Invalid");n&&a.useTouchClick();const l=u;c&&(l.successWhen=()=>a.viewVisible(c)),s.flow(t,l).then()}},190:(t,e,n)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.DateTime=void 0;const o=n(683);class s{static of(t=Date.now()){return new this(t instanceof s?t.toDate():t)}static now(){return this.of()}value;constructor(t){this.value=o.isString(t)?t.replace(/-/g,"/"):t instanceof s?t.toDate():t}toDate(){return new Date(this.value)}startOfDay(){return s.of(this.toDate().setHours(0,0,0,0))}endOfDay(){return s.of(this.toDate().setHours(23,59,59,999))}subtractDays(t){return this.addDays(-t)}addDays(t){const e=this.toDate();return s.of(e.setDate(e.getDate()+t))}isBefore(t){return this.compare(t)<0}isAfter(t){return this.compare(t)>0}isSame(t){return 0===this.compare(t)}compare(t){return this.toDate().getTime()-s.of(t).toDate().getTime()}format(t){const e=this.toDate(),n={Y:e.getFullYear(),M:e.getMonth()+1,D:e.getDate(),H:e.getHours(),m:e.getMinutes(),s:e.getSeconds(),S:e.getMilliseconds()};return t.replace(/(Y+|M+|D+|H+|m+|s+|S+)/g,(t=>{const e=t.slice(-1);return String(n[e]).padStart(t.length,"0")}))}dateFormat(t="YYYY-MM-DD"){return this.format(t)}dateTimeFormat(t="YYYY-MM-DD HH:mm:ss"){return this.format(t)}}e.DateTime=s},737:(t,e)=>{function n(t){return t?t instanceof HTMLElement?t:t.startsWith("//")?(n=t,document.evaluate(n,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue):(e=t,document.querySelector(e)):null;var e,n}function o(t){const e=n(t);return Boolean(e&&e.offsetParent)}Object.defineProperty(e,"__esModule",{value:!0}),e.touchClick=e.elementVisibleText=e.elementVisible=e.elementExists=e.elementText=e.toElement=void 0,e.toElement=n,e.elementText=function(t){const e=n(t);return e?e.textContent:""},e.elementExists=function(t){return Boolean(n(t))},e.elementVisible=o,e.elementVisibleText=function(t){const e=n(t);return o(e)?e.textContent:""},e.touchClick=function(t){const e={bubbles:!0},o=n(t),s=new TouchEvent("touchstart",e);o.dispatchEvent(s);const i=new TouchEvent("touchend",e);o.dispatchEvent(i)}},829:(t,e)=>{function n(t,e){return fetch(t,{credentials:"same-origin",...e}).then((t=>t.json()))}Object.defineProperty(e,"__esModule",{value:!0}),e.postJson=e.fetchJson=void 0,e.fetchJson=n,e.postJson=function(t,e){return n(t,{method:"POST",...e})}},947:(t,e)=>{function n(t){switch(t.type){case"TaskResult":case"TaskError":alert(t.payload)}}function o(t,e){return e?{type:t,payload:e}:{type:t}}function s(t){return e=>o(t,e)}function i(t){return n=>e.notify(o(t,n))}Object.defineProperty(e,"__esModule",{value:!0}),e.notifyTaskMessage=e.notifyTaskDelay=e.notifyTaskStepEnd=e.notifyTaskStepStart=e.notifyTaskResult=e.notifyTaskError=e.notifyTaskSuccess=e.notifyTaskEnd=e.notifyTaskStart=e.taskMessageAction=e.taskDelayAction=e.taskStepEndAction=e.taskStepStartAction=e.taskResultAction=e.taskErrorAction=e.taskSuccessAction=e.taskEndAction=e.taskStartAction=e.notify=void 0,e.notify=Boolean(window.ReactNativeWebView&&window.ReactNativeWebView.postMessage)?function(t){window.ReactNativeWebView.postMessage(JSON.stringify(t))}:Boolean(window.PuppeteerLog)?function(t){window.PuppeteerLog(JSON.stringify(t)).then(),n(t)}:n,e.taskStartAction=s("TaskStart"),e.taskEndAction=s("TaskEnd"),e.taskSuccessAction=s("TaskSuccess"),e.taskErrorAction=s("TaskError"),e.taskResultAction=s("TaskResult"),e.taskStepStartAction=s("TaskStepStart"),e.taskStepEndAction=s("TaskStepEnd"),e.taskDelayAction=s("TaskDelay"),e.taskMessageAction=s("TaskMessage"),e.notifyTaskStart=i("TaskStart"),e.notifyTaskEnd=i("TaskEnd"),e.notifyTaskSuccess=i("TaskSuccess"),e.notifyTaskError=i("TaskError"),e.notifyTaskResult=i("TaskResult"),e.notifyTaskStepStart=i("TaskStepStart"),e.notifyTaskStepEnd=i("TaskStepEnd"),e.notifyTaskDelay=i("TaskDelay"),e.notifyTaskMessage=i("TaskMessage")},683:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.isString=void 0,e.isString=function(t){return"string"==typeof t}},206:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.sleep=void 0,e.sleep=function(t){return new Promise((e=>setTimeout(e,t)))}},618:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.toUrlString=void 0,e.toUrlString=function(t,e){const n=new URL(t);return n.search=new URLSearchParams(e).toString(),n.toString()}}},e={};function n(o){var s=e[o];if(void 0!==s)return s.exports;var i=e[o]={exports:{}};return t[o](i,i.exports,n),i.exports}(()=>{const t=n(829),e=n(190),o=n(618),s=n(260),i=n(947),a=n(393);function r(t){return{date:t,inAmount:0,outAmount:0}}s.pageFlow((async function*(){const n=(yield a.flowStep((()=>async function(n){const s=e.DateTime.of(),i=s.subtractDays(n-1).startOfDay();let a=1;const c=[];t:for(;;){const n=o.toUrlString("https://bean.m.jd.com/beanDetail/detail.json",{page:a++}),s=(await t.fetchJson(n)).jingDetailList;for(const{amount:t,date:n,eventMassage:o}of s){const s=e.DateTime.of(n);if(s.isBefore(i))break t;c.push({amount:Number(t),date:s.dateFormat(),eventMassage:o})}}const u=c.reduce(((t,{date:e,amount:n})=>{let o=t[e];return o||(t[e]=o=r(e)),n>0?o.inAmount+=n:o.outAmount+=n,t}),{});return Array.from({length:n},((t,e)=>{const n=s.subtractDays(e).dateFormat();return u[n]||r(n)}))}(2)),"Main")).map((({date:t,inAmount:e,outAmount:n})=>`[${t}] 加: ${e} 减: ${-n} 净: ${e+n}`)).join("\n");return i.taskResultAction(n)}),{urls:"https://bean.m.jd.com/beanDetail/index.action"})})()})();