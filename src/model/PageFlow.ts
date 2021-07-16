import { isEmpty } from "../util/collection";
import { FlowBuilder } from "./FlowBuilder";
import { useTouchClick, viewExists } from "../util/flow";
import {
  notifyTaskEnd,
  notifyTaskError,
  notifyTaskStart,
  notifyTaskSuccess,
} from "../util/notification";

type PageFlowOptions = {
  delayTimeBeforeTaskStart: number;
};

export class PageFlow extends FlowBuilder {
  static of(urls: string | string[] = []) {
    return new this(Array.isArray(urls) ? urls : [urls]);
  }
  static defaultPageFlowOptions(): PageFlowOptions {
    return {
      delayTimeBeforeTaskStart: 1000,
    };
  }

  private taskSuccessFn = () => false;
  private pageFlowOptions = PageFlow.defaultPageFlowOptions();
  private constructor(private urls: string[]) {
    super();
  }

  useTouchClick() {
    useTouchClick();
    return this;
  }

  setPageFlowOptions(options: Partial<PageFlowOptions>) {
    this.pageFlowOptions = { ...this.pageFlowOptions, ...options };
    return this;
  }

  successWhen(fn: () => boolean) {
    this.taskSuccessFn = fn;
    return this;
  }

  successViewExists(target: string) {
    return this.successWhen(() => viewExists(target));
  }

  async execute() {
    notifyTaskStart();

    if (!this.validatePageUrl()) {
      return notifyTaskError({ message: "PageInvalid" });
    }

    await PageFlow.delayAndNotify(
      this.pageFlowOptions.delayTimeBeforeTaskStart
    );

    if (this.taskSuccessFn()) {
      return notifyTaskSuccess();
    }

    try {
      await this.build()();

      if (this.taskSuccessFn()) {
        notifyTaskSuccess();
      } else {
        notifyTaskEnd();
      }
    } catch (e) {
      notifyTaskError({ message: (<Error>e).message });
    }
  }

  private validatePageUrl() {
    const urls = this.urls;
    const url = window.location.href;

    return isEmpty(urls) || urls.some((x) => url.startsWith(x));
  }
}
