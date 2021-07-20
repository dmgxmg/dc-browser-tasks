(()=>{"use strict";var t={419:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.clickWhileVisibleStep=e.clickIfVisibleStep=e.waitClickStep=e.viewVisible=e.clickWhileVisible=e.waitClick=e.flowClick=e.useTouchClick=void 0;const n=i(737),o=i(393),s=i(947);let a=t=>n.toElement(t).click();async function c(t){const e=n.toElement(t);return!!n.elementVisible(e)&&(l(e),a(e),s.notifyTaskMessage("Click Element"),await o.flowDelay(),!0)}function l(t){n.toElement(t).scrollIntoView({block:"center"})}async function r(t){const e=await async function(t){return await o.flowWait((()=>n.elementVisible(t))),n.toElement(t)}(t);await c(e)}async function u(t){for(;;){const e=n.toElement(t);if(!n.elementVisible(e))break;await c(e)}}e.useTouchClick=function(){a=n.touchClick},e.flowClick=c,e.waitClick=r,e.clickWhileVisible=u,e.viewVisible=function(t){const e=n.toElement(t);return!!n.elementVisible(e)&&(l(e),!0)},e.waitClickStep=async function(t,e){await o.flowStep((()=>r(t)),e)},e.clickIfVisibleStep=async function(t,e){return!!n.elementVisible(t)&&await o.flowStep((()=>c(t)),e)},e.clickWhileVisibleStep=async function(t,e){return!!n.elementVisible(t)&&(await o.flowStep((()=>u(t)),e),!0)}},393:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.flowWait=e.flowDelay=e.flowStep=e.flowReturnResult=e.flowReturnSuccess=e.flowReturn=e.flowThrow=e.flow=e.flowConfigure=void 0;const n=i(947),o=i(206);let s,a={waitTimeout:5e3,defaultDelayTime:500,successWhen:()=>!1};function c(t){a={...a,...t}}async function l(t=a.defaultDelayTime){n.notifyTaskDelay(t),await o.sleep(t)}e.flowConfigure=c,e.flow=async function(t,e){try{let i;if(n.notifyTaskStart(),c(e),s=t(),a.successWhen())return n.notifyTaskSuccess();for(;;){const t=await s.next(i);if(i=t.value,t.done){a.successWhen()?n.notifyTaskSuccess():t.value?n.notify(t.value):n.notifyTaskEnd();break}}}catch(t){n.notifyTaskError(t)}},e.flowThrow=function(t){return s.throw(t)},e.flowReturn=function(t){return s.return(t)},e.flowReturnSuccess=function(){return s.return(n.taskSuccessAction())},e.flowReturnResult=function(t){return s.return(n.taskResultAction(t))},e.flowStep=async function(t,e){n.notifyTaskStepStart(e);const i=await t();return n.notifyTaskStepEnd(e),i},e.flowDelay=l,e.flowWait=async function(t){const e=Date.now();for(;!t();){if(Date.now()-e>a.waitTimeout){await s.throw("Wait Timeout");break}await l()}}},260:(t,e,i)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.pageFlow=void 0;const n=i(683),o=i(393),s=i(947),a=i(419);e.pageFlow=function(t,e){const{touchClick:i,urls:c,successElement:l,...r}=e;if(c&&!function(t){const e=window.location.href;return(n.isString(t)?[t]:t).some((t=>e.startsWith(t)))}(c))return s.notifyTaskError("Page Invalid");i&&a.useTouchClick();const u=r;l&&(u.successWhen=()=>a.viewVisible(l)),o.flow(t,u).then()}},737:(t,e)=>{function i(t){return t?t instanceof HTMLElement?t:t.startsWith("//")?(i=t,document.evaluate(i,document,null,XPathResult.FIRST_ORDERED_NODE_TYPE,null).singleNodeValue):(e=t,document.querySelector(e)):null;var e,i}function n(t){const e=i(t);return Boolean(e&&e.offsetParent)}Object.defineProperty(e,"__esModule",{value:!0}),e.touchClick=e.elementVisibleText=e.elementVisible=e.elementExists=e.elementText=e.toElement=void 0,e.toElement=i,e.elementText=function(t){const e=i(t);return e?e.textContent:""},e.elementExists=function(t){return Boolean(i(t))},e.elementVisible=n,e.elementVisibleText=function(t){const e=i(t);return n(e)?e.textContent:""},e.touchClick=function(t){const e={bubbles:!0},n=i(t),o=new TouchEvent("touchstart",e);n.dispatchEvent(o);const s=new TouchEvent("touchend",e);n.dispatchEvent(s)}},947:(t,e)=>{function i(t){switch(t.type){case"TaskResult":case"TaskError":alert(t.payload)}}function n(t,e){return e?{type:t,payload:e}:{type:t}}function o(t){return e=>n(t,e)}function s(t){return i=>e.notify(n(t,i))}Object.defineProperty(e,"__esModule",{value:!0}),e.notifyTaskMessage=e.notifyTaskDelay=e.notifyTaskStepEnd=e.notifyTaskStepStart=e.notifyTaskResult=e.notifyTaskError=e.notifyTaskSuccess=e.notifyTaskEnd=e.notifyTaskStart=e.taskMessageAction=e.taskDelayAction=e.taskStepEndAction=e.taskStepStartAction=e.taskResultAction=e.taskErrorAction=e.taskSuccessAction=e.taskEndAction=e.taskStartAction=e.notify=void 0,e.notify=Boolean(window.ReactNativeWebView&&window.ReactNativeWebView.postMessage)?function(t){window.ReactNativeWebView.postMessage(JSON.stringify(t))}:Boolean(window.PuppeteerLog)?function(t){window.PuppeteerLog(JSON.stringify(t)).then(),i(t)}:i,e.taskStartAction=o("TaskStart"),e.taskEndAction=o("TaskEnd"),e.taskSuccessAction=o("TaskSuccess"),e.taskErrorAction=o("TaskError"),e.taskResultAction=o("TaskResult"),e.taskStepStartAction=o("TaskStepStart"),e.taskStepEndAction=o("TaskStepEnd"),e.taskDelayAction=o("TaskDelay"),e.taskMessageAction=o("TaskMessage"),e.notifyTaskStart=s("TaskStart"),e.notifyTaskEnd=s("TaskEnd"),e.notifyTaskSuccess=s("TaskSuccess"),e.notifyTaskError=s("TaskError"),e.notifyTaskResult=s("TaskResult"),e.notifyTaskStepStart=s("TaskStepStart"),e.notifyTaskStepEnd=s("TaskStepEnd"),e.notifyTaskDelay=s("TaskDelay"),e.notifyTaskMessage=s("TaskMessage")},683:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.isString=void 0,e.isString=function(t){return"string"==typeof t}},206:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.sleep=void 0,e.sleep=function(t){return new Promise((e=>setTimeout(e,t)))}}},e={};function i(n){var o=e[n];if(void 0!==o)return o.exports;var s=e[n]={exports:{}};return t[n](s,s.exports,i),s.exports}(()=>{const t=i(260),e=i(419),n=i(393),o=i(737),s=i(947);t.pageFlow((async function*(){if((yield e.clickIfVisibleStep('//*[@id="hello"]/div/div/div/div/div[2]/div[2]/div/div/div/div/img[1]',"周一瓜分京豆"))&&(yield e.waitClickStep('//*[@id="hello"]/div/div/div/div/div[2]/div[2]/div[3]/div[1]/div/div',"收下京豆")),yield e.clickWhileVisibleStep('//div[contains(@class, "NutrientsWorking")]//span[contains(text(), "x") and not(contains(text(), "x0"))]',"领取营养液"),yield e.waitClickStep('//*[@id="hello"]/div/div/div/div/div/div/div[2]/div[6]/div[2]/div[2]/div[5]/div',"更多任务"),yield n.flowDelay(),!(yield e.clickIfVisibleStep('//*[@id="hello"]/div/div/div/div/div[2]/div[2]/div[3]/div/div[not(contains(., "关注")) and not(contains(., "已完成"))]',"去逛逛")))return o.elementExists('//*[@id="hello"]/div/div/div/div/div[2]/div[2]/div[3]/div/div[contains(., "已完成")]')?s.taskSuccessAction():void 0}),{urls:"https://bean.m.jd.com/plantBean/index",touchClick:!0})})()})();