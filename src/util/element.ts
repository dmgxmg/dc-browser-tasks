export function toHtmlElement(target: string) {
  return isXpath(target) ? xpath2element(target) : selector2element(target);
}

export function elementText(target: string) {
  const element = toHtmlElement(target);
  return element ? element.textContent : "";
}

export function exists(target: string) {
  return Boolean(toHtmlElement(target));
}

export function touchClick(element: HTMLElement) {
  const options = {
    bubbles: true,
  };

  const touchStartEvent = new TouchEvent("touchstart", options);
  element.dispatchEvent(touchStartEvent);

  const touchEndEvent = new TouchEvent("touchend", options);
  element.dispatchEvent(touchEndEvent);
}

function selector2element(selector: string) {
  return document.querySelector<HTMLElement>(selector);
}

function xpath2element(xpath: string) {
  return document.evaluate(
    xpath,
    document,
    null,
    XPathResult.FIRST_ORDERED_NODE_TYPE,
    null
  ).singleNodeValue as HTMLElement;
}

function isXpath(value: string) {
  return value.startsWith("//");
}
