import {
  ElementInput,
  elementVisible,
  toElement,
  touchClick,
} from "../util/element";
import { flowDelay, flowStep, flowWait } from "./flow";
import { notifyTaskMessage } from "../util/notification";

let click = (element: ElementInput) => toElement(element).click();

export function useTouchClick() {
  click = touchClick;
}

export async function flowClick(element: ElementInput) {
  const el = toElement(element);

  if (!elementVisible(el)) {
    return false;
  }

  scrollIntoView(el);
  click(el);
  notifyTaskMessage("Click Element");
  await flowDelay();
  return true;
}

function scrollIntoView(element: ElementInput) {
  toElement(element).scrollIntoView({ block: "center" });
}

async function waitFor(target: ElementInput) {
  await flowWait(() => elementVisible(target));
  return toElement(target);
}

export async function waitClick(target: ElementInput) {
  const element = await waitFor(target);
  await flowClick(element);
}

export async function clickWhileVisible(target: ElementInput) {
  while (true) {
    const element = toElement(target);
    if (!elementVisible(element)) break;

    await flowClick(element);
  }
}

export function viewVisible(target: ElementInput) {
  const element = toElement(target);

  if (elementVisible(element)) {
    scrollIntoView(element);
    return true;
  }

  return false;
}

export async function waitClickStep(target: ElementInput, name: string) {
  await flowStep(() => waitClick(target), name);
}

export async function clickIfVisibleStep(target: ElementInput, name: string) {
  if (!elementVisible(target)) {
    return false;
  }
  return await flowStep(() => flowClick(target), name);
}

export async function clickWhileVisibleStep(
  target: ElementInput,
  name: string
) {
  if (!elementVisible(target)) {
    return false;
  }
  await flowStep(() => clickWhileVisible(target), name);
  return true;
}
