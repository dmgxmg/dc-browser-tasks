class DcElement {
  static of(target) {
    return new this(target);
  }
  static isXpath(value) {
    return value.startsWith("//");
  }
  static xpath2element(xpath) {
    return document.evaluate(
      xpath,
      document,
      null,
      XPathResult.FIRST_ORDERED_NODE_TYPE,
      null
    ).singleNodeValue;
  }
  static selector2element(selector) {
    return document.querySelector(selector);
  }

  constructor(target) {
    this.target = target;
  }

  get element() {
    const { target } = this;
    return !target || target instanceof HTMLElement
      ? target
      : DcElement.isXpath(target)
      ? DcElement.xpath2element(target)
      : DcElement.selector2element(target);
  }
  touchClick() {
    const options = {
      bubbles: true,
    };

    const { element } = this;
    const touchStartEvent = new TouchEvent("touchstart", options);
    element.dispatchEvent(touchStartEvent);

    const touchEndEvent = new TouchEvent("touchend", options);
    element.dispatchEvent(touchEndEvent);
  }
}
