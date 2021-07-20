export type ElementInput = string | HTMLElement;

export function toElement(target: ElementInput) {
  return !target
    ? null
    : target instanceof HTMLElement
    ? target
    : isXpath(target)
    ? xpath2element(target)
    : selector2element(target);
}

export function elementText(target: ElementInput) {
  const el = toElement(target);
  return el ? el.textContent : "";
}

export function elementExists(target: ElementInput) {
  return Boolean(toElement(target));
}

export function elementVisible(target: ElementInput) {
  const element = toElement(target);
  return Boolean(element && element.offsetParent);
}

export function elementVisibleText(target: ElementInput) {
  const element = toElement(target);
  return elementVisible(element) ? element.textContent : "";
}

export function touchClick(target: ElementInput) {
  const options = {
    bubbles: true,
  };

  const element = toElement(target);
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
