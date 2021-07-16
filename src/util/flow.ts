import { toHtmlElement, touchClick } from "./element";

let click = (element: HTMLElement) => {
  element.click();
};

function viewClick(element: HTMLElement) {
  element.scrollIntoView({ block: "center" });
  click(element);
}

export function viewExists(target: string) {
  const element = toHtmlElement(target);
  if (!element) {
    return false;
  }
  element.scrollIntoView({ block: "center" });
  return true;
}

export function useTouchClick() {
  click = touchClick;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function waitFor(target: string) {
  let retryTimes = 100;

  while (true) {
    const element = toHtmlElement(target);

    if (element) {
      return element;
    }

    if (--retryTimes <= 0) {
      return Promise.reject(`Wait for element timeout! Target: [${target}]`);
    }

    await delay(100);
  }
}

export async function waitClick(target: string) {
  click(await waitFor(target));
}

export async function waitViewClick(target: string) {
  viewClick(await waitFor(target));
}

export async function clickEvery(target: string) {
  while (true) {
    const element = toHtmlElement(target);
    if (!element) {
      return;
    }
    click(element);
    await delay(500);
  }
}
