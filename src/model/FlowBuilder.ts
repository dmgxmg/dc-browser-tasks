import { delay, waitClick, waitViewClick } from "../util/flow";
import {
  notifyTaskDelay,
  notifyTaskStepEnd,
  notifyTaskStepStart,
} from "../util/notification";

type Step = {
  stepName: string;
  fn: Function;
};
export type FlowBuilderOptions = {
  delayTimeAfterEachStep: number;
};
export type ConditionFunction = () => boolean;

export class FlowBuilder {
  static of() {
    return new this();
  }
  static defaultFlowBuilderOptions(): FlowBuilderOptions {
    return {
      delayTimeAfterEachStep: 500,
    };
  }
  static async delayAndNotify(ms: number) {
    notifyTaskDelay({ delayTime: ms });
    await delay(ms);
  }

  protected steps: Step[] = [];
  protected flowBuilderOptions = FlowBuilder.defaultFlowBuilderOptions();
  protected constructor() {}

  setFlowBuilderOptions(options: Partial<FlowBuilderOptions>) {
    this.flowBuilderOptions = {
      ...this.flowBuilderOptions,
      ...options,
    };
    return this;
  }

  step(fn: Function, stepName: string) {
    this.steps.push({
      stepName,
      fn,
    });
    return this;
  }

  delayStep(ms = 500, stepName = "DelayStep") {
    return this.step(() => FlowBuilder.delayAndNotify(ms), stepName);
  }

  loopStep(
    conditionFn: ConditionFunction,
    fn: Function,
    stepName = "LoopStep"
  ) {
    return this.step(async () => {
      while (conditionFn()) {
        await fn();
      }
    }, stepName);
  }

  waitClickStep(target: string, stepName: string) {
    return this.step(() => waitClick(target), stepName);
  }

  waitViewClickStep(target: string, stepName: string) {
    return this.step(() => waitViewClick(target), stepName);
  }

  build() {
    return async () => {
      const { delayTimeAfterEachStep } = this.flowBuilderOptions;

      for (const [index, { stepName, fn }] of this.steps.entries()) {
        const payload = { stepName, index };
        notifyTaskStepStart(payload);
        await fn();
        notifyTaskStepEnd(payload);
        await FlowBuilder.delayAndNotify(delayTimeAfterEachStep);
      }
    };
  }
}
