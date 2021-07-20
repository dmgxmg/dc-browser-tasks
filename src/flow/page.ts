import { isString } from "../util/string";
import { flow, FlowOptions, TaskGeneratorFunction } from "./flow";
import { notifyTaskError } from "../util/notification";
import { useTouchClick, viewVisible } from "./element";

type ValidUrls = string | string[];

type PageFlowOptions = FlowOptions & {
  touchClick: boolean;
  urls: ValidUrls;
  successElement: string;
};

function validatePageUrl(validUrls: ValidUrls) {
  const url = window.location.href;
  const urls = isString(validUrls) ? [validUrls] : validUrls;

  return urls.some((x) => url.startsWith(x));
}

export function pageFlow(
  gen: TaskGeneratorFunction,
  options?: Partial<PageFlowOptions>
) {
  const { touchClick, urls, successElement, ...rest } = options;

  if (urls && !validatePageUrl(urls)) {
    return notifyTaskError("Page Invalid");
  }

  if (touchClick) {
    useTouchClick();
  }

  const flowOptions = rest;

  if (successElement) {
    flowOptions.successWhen = () => viewVisible(successElement);
  }

  flow(gen, flowOptions).then();
}
